export const COLORS = {
  // Primary Palette
  PRIMARY_DARK: '#0D1B2A',   // 深邃蓝
  PRIMARY_LIGHT: '#415A77',  // 活力蓝
  TEXT_LIGHT: '#E0E1DD',     // 幽灵白

  // Accent Palette
  ACCENT_RED: '#D90429',      // 警告红
  ACCENT_GREEN: '#2ECC71',    // 确认绿
  ACCENT_YELLOW: '#FFD700',   // 高亮黄

  // Tetromino & Garbage Colors
  GARBAGE: '#808080',      // 垃圾行灰
  TETROMINO_I: '#00FFFF', // 青色 (Cyan)
  TETROMINO_O: '#FFFF00', // 黄色 (Yellow)
  TETROMINO_T: '#800080', // 紫色 (Purple)
  TETROMINO_L: '#FFA500', // 橙色 (Orange)
  TETROMINO_J: '#0000FF', // 蓝色 (Blue)
  TETROMINO_S: '#008000', // 绿色 (Green)
  TETROMINO_Z: '#FF0000', // 红色 (Red)
};

// 定义所有方块的形状和颜色
export const TETROMINOES = {
  'I': {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: COLORS.TETROMINO_I,
  },
  'O': {
    shape: [
      [2, 2],
      [2, 2]
    ],
    color: COLORS.TETROMINO_O,
  },
  'T': {
    shape: [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0]
    ],
    color: COLORS.TETROMINO_T,
  },
  'L': {
    shape: [
      [0, 4, 0],
      [0, 4, 0],
      [0, 4, 4]
    ],
    color: COLORS.TETROMINO_L,
  },
  'J': {
    shape: [
      [0, 5, 0],
      [0, 5, 0],
      [5, 5, 0]
    ],
    color: COLORS.TETROMINO_J,
  },
  'S': {
    shape: [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0]
    ],
    color: COLORS.TETROMINO_S,
  },
  'Z': {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ],
    color: COLORS.TETROMINO_Z,
  }
};