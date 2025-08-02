import {BLOCK_CIRCULAR_STATES} from "../../data/BlockCircularStates";
import {BLOCK_SEAT} from "../../data/BlockSeat";
import {BLOCK_FOOD} from "../../data/BlockFood";

/**
 * 帮助获取自定义组件数据
 */
export class BlockCCDataHelper {
  static categoryData = {
    'amp:circular_states': BLOCK_CIRCULAR_STATES,
    'amp:seat': BLOCK_SEAT,
    'amp:food': BLOCK_FOOD,
  }
  /**
   * 获取指定类别的方块数据
   * @param category 类别，即自定义组件的标识符
   * @param identifier 方块标识符
   */
  static getBlockData(category, identifier) {
    // 获取类别数据
    let categoryData = BlockCCDataHelper.categoryData[category];
    if (!categoryData) {
      return;
    }
    // 获取方块数据
    return categoryData[identifier];
  }
}