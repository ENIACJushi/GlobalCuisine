import {BlockPermutation, system} from "@minecraft/server";
import {BlockCCDataHelper} from "./BlockCCDataHelper";

/**
 * 方块食物
 */
export class BlockFoodManager {
  static STATE_NAME = 'amp:eat_step';
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
        let old = block.permutation.getState(BlockFoodManager.STATE_NAME);
        if (old === undefined) {
          return;
        }
        // 吃完了 直接消除
        if (old === blockStateData['step']) {
          block.setPermutation(BlockPermutation.resolve('air'));
          player.dimension.playSound('amp.food_container_pop', block.location);
          return;
        }
        // 吃一点
        player.dimension.playSound(BlockFoodManager
          .getEatSound(blockStateData['eat_sounds'], old), player.location);
        block.setPermutation(block.permutation.withState(BlockFoodManager.STATE_NAME, old + 1));
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
    system.runTimeout(() => {
      // 补血
      if (effect.health) {
        let healthComponent = player.getComponent("health");
        healthComponent.setCurrentValue(Math.min(
          healthComponent.effectiveMax,
          healthComponent.currentValue + effect.health,
        ));
      }
      // 着火
      if (effect.fire) {
        player.setOnFire(effect.fire);
      }
      // 药水效果
      if (effect.effect) {
        let data = effect.effect;
        player.addEffect(data.type, data.duration, {
          amplifier: data.amplifier ?? 1,
          showParticles: data.showParticles ?? true,
        });
      }
    }, effect.timeout ?? 0);
  }

  /**
   * 获取食用音效
   * @param {string|string[]} eat_sounds
   * @param {number} state
   */
  static getEatSound(eat_sounds, state) {
    // 未定义时返回默认音效
    if (eat_sounds === undefined) {
      return 'random.eat';
    }
    // 为字符串代表所有食用阶段共用一个声音
    if (typeof eat_sounds === 'string') {
      return eat_sounds;
    }
    // 为数组则根据 state 确定
    if (eat_sounds.length <= state) {
      // 若声音数量比状态少，则后续的进度使用表中最后一个声音
      return eat_sounds[eat_sounds.length - 1];
    }
    return eat_sounds[state];
  }
}