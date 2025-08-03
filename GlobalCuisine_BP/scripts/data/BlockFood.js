
export const BLOCK_FOOD = {
  "amp:baozi": { // 方块 id
    "state": "amp:eat_remain", // 属性名
    "effects": [ // 效果列表
      {
        "index": 'all', // 使用时state为这个值时，会施加以下效果，设为 all 代表每次都加
        "health": 1, // 血量 +1
      }
    ]
  }
}