
export const BLOCK_FOOD = {
  "amp:baozi": { // 方块 id
    "step": 5, // 食用状态 amp:eat_step 的最大值
    "eat_sounds": "random.eat", // 食用时的声音列表，为字符串代表所有食用阶段共用一个声音；若声音数量比状态少，则后续的进度使用表中最后一个声音
    "effects": [ // 效果列表
      {
        "index": 'all', // 使用时state为这个值时，会施加以下效果，设为 all 代表每次都加
        "health": 2, // 血量 +1
      }
    ]
  },
  "amp:soup_tomyum": { // 冬阴功汤
    "step": 3,
    "eat_sounds": "random.drink",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:mooncake": { // 月饼
    "step": 5,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:kourou": { // 扣肉
    "step": 5,
    "eat_sounds": ["random.eat", "random.eat", "random.eat", "random.eat", "random.drink"],
    "effects": [
      { "index": 0, "health": 2, },
      { "index": 1, "health": 2, },
      { "index": 2, "health": 2, },
      { "index": 3, "health": 2, },
      { "index": 4, "health": 1, }
    ]
  },
  "amp:baotarou": { // 宝塔肉
    "step": 5,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:jiaozi": { // 饺子
    "step": 4,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:mantou": { // 馒头
    "step": 5,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:soup_pork": { // 猪肉汤
    "step": 3,
    "eat_sounds": "random.drink",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:dish_chinese1": { // 青椒酿肉
    "step": 3,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:choudoufu": { // 臭豆腐
    "step": 3,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:rice": { // 米饭
    "step": 3,
    "eat_sounds": "random.eat",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:chilli_chopped": { // 剁椒酱
    "step": 5,
    "eat_sounds": "random.eat",
    "effects": [
      { "index": 'all', "health": 1 },
      { "index": 4, "fire": 10 }, // 吃完会被烧
      {
        "index": 4,
        "timeout": 20*5, // 延迟执行（单位：刻）
        "effect": {
          "type": "fire_resistance", // 效果名称
          "duration": 20*60, // 持续时间（tick）
          "amplifier": 2, // 效果等级，不指定则为1
          "showParticles": true // 是否展示药水粒子，默认为是
        }
      },
      { "index": 4, "timeout": 20*5, // 速度
        "effect": { "type": "speed", "duration": 20*60, "amplifier": 2, "showParticles": true } },
      { "index": 4, "timeout": 20*5, // 力量
        "effect": { "type": "strength", "duration": 20*60, "amplifier": 2, "showParticles": true } }
    ]
  },
  "amp:fruit_tea": { // 果茶
    "step": 4,
    "eat_sounds": "random.drink",
    "effects": [ { "index": 'all', "health": 2 } ]
  },
  "amp:bubble_tea": { // 果茶
    "step": 4,
    "eat_sounds": ["random.drink", "random.drink", "random.drink", "random.eat"],
    "effects": [ { "index": 'all', "health": 2 } ]
  },
}