import {BlockPermutation} from "@minecraft/server";
import {BlockCCDataHelper} from "./BlockCCDataHelper";

/**
 *
 */
export class BlockFoodManager {
  static registerCC(e) {
    e.blockComponentRegistry.registerCustomComponent('amp:food', {
      onPlayerInteract(e) {
        // 获取方块自定义数据
        let block = e.block;
        let player = e.player;
        if (!block || !player) {
          return;
        }
        let blockStateData = BlockCCDataHelper.getBlockData('amp:food', block.typeId);
        if (!blockStateData) {
          return;
        }
        // 状态修改
        let stateName = blockStateData['state'];
        let old = block.permutation.getState(stateName);
        if (old === undefined) {
          return;
        }
        // 吃完了 直接消除
        if (old === 0) {
          block.setPermutation(BlockPermutation.resolve('air'));
          player.dimension.playSound('amp.food_container_pop', block.location);
          return;
        }
        // 吃一点
        player.dimension.playSound('random.eat', player.location);
        block.setPermutation(block.permutation.withState(stateName, old - 1));
        // 施加效果
        for(let effect of blockStateData['effects']) {
          if (effect['index'] === 'all' || effect['index'] === old) {
            BlockFoodManager.addEffect(player, effect);
          }
        }
      },
      onPlayerBreak(e) {

      }
    })
  }

  static addEffect(player, effect) {
    if (effect.health) {
      let healthComponent = player.getComponent("health");
      healthComponent.setCurrentValue(Math.min(
        healthComponent.effectiveMax,
        healthComponent.currentValue + effect.health,
      ));
    }
  }
}