import {
  BlockPermutation,
  Dimension,
  Vector3,
} from "@minecraft/server";

const STEAMER_BLOCK_NAME = 'amp:steamer';
const STEAMER_LAYER_STATE = 'amp:steamer_layer';

export class SteamerManager {
  static registerCC(e) {
    e.blockComponentRegistry.registerCustomComponent('amp:steamer', {
      onPlayerInteract(e) {
        let item = getPlayerMainHand(e.player);
        switch (item.typeId) {
          case 'amp:steamer': {
            // 向上寻找空气进行叠加
            const bl = e.block;
            SteamerManager.stackUp(bl.dimension, bl.location, bl.permutation.getState('minecraft:cardinal_direction'));
            break;
          }
          default:
            break;
        }
      },
      onPlayerBreak(e) {
        let upBl = e.dimension.getBlockAbove(e.block.location);
        if (upBl?.typeId === STEAMER_BLOCK_NAME) {
          // 破坏上层蒸笼？不确定加不加
        }
      }
    })
  }

  /**
   * 由炼药锅放置
   */
  static placeByCauldron(e) {
    const player = e.player;
    if (getPlayerMainHand(player).typeId !== STEAMER_BLOCK_NAME) {
      return;
    }
    // 决定方向 xz
    let playerRot = player.getRotation().y;
    let rot;
    if (playerRot > -45) {
      if (playerRot < 45) {
        rot = 'south';
      } else if (playerRot < 135) {
        rot = 'west';
      } else {
        rot = 'north';
      }
    } else {
      if (playerRot > -135) {
        rot = 'east';
      } else {
        rot = 'north';
      }
    }
    // 叠放
    SteamerManager.stackUp(e.block.dimension, {
      x: e.block.location.x,
      y: e.block.location.y + 1,
      z: e.block.location.z,
    }, rot);
  }

  /**
   * 从指定位置（包含该位置）开始，叠放蒸笼
   * @param dim { Dimension } 维度
   * @param startPos { Vector3 } 指定位置
   * @param dir { string } 蒸笼方向 north east ...
   */
  static stackUp(dim, startPos, dir) {
    for (let y = startPos.y; y <= dim.heightRange.max; y++) {
      let pos = { x: startPos.x, y: y, z: startPos.z };
      let targetBlock = dim.getBlock(pos);
      if (targetBlock.isAir) {
        // 为空气，覆盖一个一层的蒸笼
        dim.setBlockPermutation(pos, BlockPermutation.resolve(STEAMER_BLOCK_NAME, {
          'amp:steamer_layer': 1,
          'minecraft:cardinal_direction': dir,
        }));
        SteamerManager.playPlaceSound(dim, startPos);
        return;
      } else if (targetBlock.typeId === STEAMER_BLOCK_NAME) {
        // 为蒸笼，若没满则加一层，满了则继续向上找
        let targetBlLayer = SteamerManager.getLayer(targetBlock);
        if (targetBlLayer < 5) {
          targetBlock.setPermutation(targetBlock.permutation.withState(
            STEAMER_LAYER_STATE,
            targetBlLayer + 1
          ));
          SteamerManager.playPlaceSound(dim, startPos);
          return;
        }
      } else {
        // 为其它方块，不能叠了
        return;
      }
    }
  }

  static getLayer(bl) {
    return bl.permutation.getState(STEAMER_LAYER_STATE);
  }

  static playPlaceSound(dimension, pos) {
    dimension.playSound('block.bamboo.place', pos);
  }
}

function getPlayerMainHand(player) {
  let container = player.getComponent("inventory").container;
  let slot = player.selectedSlotIndex;
  return container.getItem(slot);
}
