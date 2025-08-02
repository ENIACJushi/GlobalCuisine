import {BlockCCDataHelper} from "./BlockCCDataHelper";

/**
 * 方块座位
 */
export class BlockSeatManager {
  static ENTITY_LOCATION_PROPERTY = 'amp:seat_location'; // 记录实体对应方块位置的动态属性
  static registerCC(e) {
    e.blockComponentRegistry.registerCustomComponent('amp:seat', {
      onPlayerInteract(e) {
        let block = e.block;
        let player = e.player;
        if (!block || !player) {
          return;
        }
        // 获取坐垫实体
        let seatEntity = BlockSeatManager.getBlockEntity(block.dimension, block.typeId, block.permutation,
          block.bottomCenter(), true);
        let rideComponent = seatEntity.getComponent("rideable");
        // 若已经有人在坐则忽略
        if (rideComponent.getRiders() > 0) {
          return;
        }
        // 坐上玩家
        rideComponent.addRider(player);
      },
      onPlayerBreak(e) {
        let seatEntity = BlockSeatManager.getBlockEntity(e.dimension, e.brokenBlockPermutation.type.id,
          e.brokenBlockPermutation, e.block.bottomCenter(), false);
        if (!seatEntity) {
          return;
        }
        seatEntity.triggerEvent('despawn');
      }
    })
  }

  /**
   * 获取方块实体
   * @param typeId 方块id
   * @param permutation 因为被破坏时只有 permutation，所以分开穿
   * @param _center 中心坐标
   * @param create 不存在时是否自动创建
   */
  static getBlockEntity(dimension, typeId, permutation, _center, create) {
    if (!typeId) {
      return undefined;
    }
    // 获取方块自定义数据
    let blockCCData = BlockCCDataHelper.getBlockData('amp:seat', typeId);
    if (!blockCCData) {
      return;
    }
    // 获取旋转
    let rotate = permutation.getState('minecraft:cardinal_direction');
    let xzSign = [1, 1];
    switch (rotate) {
      case 'west': xzSign = [-1, 1]; break; // 90°
      case 'south': xzSign = [-1, -1]; break; // 180°
      case 'east': xzSign = [1, -1]; break; // 270°
      default: case 'north': xzSign = [1, 1]; break; // 0°
    }
    // 计算坐垫位置
    let posDelta = blockCCData['pos'];
    let center = _center;
    center.x += (posDelta[0] * xzSign[0]) / 16;
    center.y += (posDelta[1] - 3) / 16; // 实体座位高度会向上偏移一些，需要偏移一点
    center.z += (posDelta[2] * xzSign[1]) / 16;
    // 获取已生成的坐垫实体
    let existedSeats = dimension.getEntities({
      type: blockCCData['type'],
      location: center,
      maxDistance: 0.5,
    });

    let seatEntity = existedSeats.find((seat) => {
      let location = seat.getDynamicProperty(BlockSeatManager.ENTITY_LOCATION_PROPERTY);
      if (location.x === center.x && location.y === center.y && location.z === center.z) {
        return true;
      }
    });
    // 若不存在且需要自动创建，则创建实体
    if (!seatEntity && create) {
      seatEntity = dimension.spawnEntity(blockCCData['type'], center);
      seatEntity.setDynamicProperty(BlockSeatManager.ENTITY_LOCATION_PROPERTY, center);
    }
    return seatEntity;
  }
}