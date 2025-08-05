/**
 * 在方块 components 加上 "amp:seat": {}, 然后在下面定义坐垫类型和位置
 */
export const BLOCK_SEAT = {
  "amp:stone_stool": { // 方块id
    "type": "amp:seat", // 坐垫类型，即坐垫实体标识符
    "pos": [0, 8, 0] // 以 1/16 方块边长为单位，以方块底部中央为原点，会随着方块旋转而旋转
  },
  "amp:pier1": { "type": "amp:seat", "pos": [0, 16, 0] },
  "amp:pier2": { "type": "amp:seat", "pos": [0, 16, 0] },
  "amp:money": { "type": "amp:seat", "pos": [0, 16, 0] },
  "amp:stool": { "type": "amp:seat", "pos": [0, 5.5, 0] },
  "amp:papers": { "type": "amp:seat", "pos": [0, 16, 0] },

  // 已弃用
  // "amp:folding_table": { "type": "amp:seat", "pos": [0, 16, 0] },
  // "amp:quarter_table": { "type": "amp:seat", "pos": [0, 16, 0] },
  // "amp:board": { "type": "amp:seat", "pos": [0, 16, 0] },
  // "amp:stone_table": { "type": "amp:seat", "pos": [0, 16, 0] },
}