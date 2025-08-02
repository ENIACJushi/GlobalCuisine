import {BlockCCDataHelper} from "./BlockCCDataHelper";

export class BlockCircularStatesManager {
  /**
   * 注册自定义事件
   */
  static registerCC(e) {
    e.blockComponentRegistry.registerCustomComponent('amp:circular_states', {
      onPlayerInteract(e) {
        // 获取方块自定义数据
        let block = e.block;
        let blockStateData = BlockCCDataHelper.getBlockData('amp:circular_states', block.typeId);
        if (!blockStateData) {
          return;
        }
        // 通常状态的状态修改
        for (let stateName in blockStateData.simple) {
          let stateList = blockStateData.simple[stateName]
          // 获取旧状态
          let old = block.permutation.getState(stateName);
          if (old !== undefined) {
            let index = stateList.indexOf(old);
            if (index === -1) {
              continue;
            }
            index++;
            if (index === stateList.length) {
              index = 0;
            }
            block.setPermutation(block.permutation.withState(stateName, stateList[index]));
          }
        }
      }
    })
  }
}