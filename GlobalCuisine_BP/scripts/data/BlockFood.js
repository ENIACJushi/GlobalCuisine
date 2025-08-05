
export const BLOCK_FOOD = {
  "amp:baozi": { // 方块 id
    "step": 5, // 食用状态 amp:eat_step 的最大值
    "eat_sounds": "random.eat", // 食用时的声音列表，为字符串代表所有食用阶段共用一个声音；若声音数量比状态少，则后续的进度使用表中最后一个声音
    "effects": [ // 效果列表
      {
        "index": 'all', // 使用时state为这个值时，会施加以下效果，设为 all 代表每次都加
        "health": 1, // 血量 +1
      }
    ]
  },
  "amp:soup_tomyum": { // 冬阴功汤
    "step": 3,
    "eat_sounds": "random.drink",
    "effects": [
      { "index": 'all', "health": 2 }
    ]
  },
  "amp:mooncake": { // 月饼
    "step": 5,
    "eat_sounds": "random.eat",
    "effects": [
      { "index": 'all', "health": 1 }
    ]
  },
}