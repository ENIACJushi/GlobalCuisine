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
          return;
        }
        // 吃一点
        player
        old--;
        block.setPermutation(block.permutation.withState(stateName, old));
      },
      onPlayerBreak(e) {

      }
    })
  }
}