
export const BLOCK_FOOD = {
  "amp:baozi": { // 方块 id
    "step": 5, // 食用状态 amp:eat_step 的最大值
    "effects": [ // 效果列表
      {
        "index": 'all', // 使用时state为这个值时，会施加以下效果，设为 all 代表每次都加
        "health": 1, // 血量 +1
      }
    ]
  }
}