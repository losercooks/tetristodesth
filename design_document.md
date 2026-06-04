
# 俄罗斯方块小游戏设计文档

本文档旨在规划和定义俄罗斯方块小游戏所需的 UI 资源、页面结构和可复用组件。

## 1. UI 素材

以下是建议为游戏准备的 UI 素材列表：

### 1.1. 游戏元素
- **方块 (Tetrominoes)**:
    - 为 7 种不同形状 (I, O, T, L, J, S, Z) 的方块提供多彩的、清晰的视觉表现。
    - 额外设计一种 **垃圾行方块**，用于在对战或挑战模式中从底部升起。
    - 考虑为方块添加描边或阴影效果，以增加立体感和区分度。
- **游戏区域 (Playfield)**:
    - 游戏主区域的背景，可以是简单的网格，也可以是带有主题风格的背景图。

### 1.2. UI 控件
- **按钮 (Buttons)**:
    - **通用按钮样式**: 设计一套统一风格的按钮，用于“开始游戏”、“暂停”、“重新开始”、“返回主菜单”等操作。
    - **图标按钮**: 为静音/取消静音、排行榜等功能设计清晰的图标。
- **对话框 (Dialogs)**:
    - “游戏结束”对话框：显示最终得分，并提供“重新开始”和“返回主菜单”的选项。
    - “暂停”对话框：提供“继续游戏”和“返回主菜单”的选项。

### 1.3. 视觉效果
- **粒子效果**:
    - **消除行**: 方块行被消除时的动画效果（例如：闪光、粒子迸发）。
    - **方块落地**: 方块触底时的轻微动画或粒子效果。
- **背景**:
    - 游戏背景采用分层设计，由底色和上层纹理构成，以创造丰富的视觉深度。
    - **底色**: 使用 **色彩系统** 中定义的 **深邃蓝 (`#0D1B2A`)** 作为背景底色。
    - **纹理**: 在底色上叠加一个平铺的、半透明的纹理图片 (`background_texture.png`)，以增加质感。

### 1.4. 色彩系统 (Color System)

为了保证游戏视觉风格的统一和专业，我们定义一个全局的色彩系统。

- **主色调 (Primary Palette)**:
    - **深邃蓝 (`#0D1B2A`)**: 用于游戏背景或主菜单背景，营造专注、沉浸的氛围。
    - **幽灵白 (`#E0E1DD`)**: 用于主要的文本、标题和图标，确保在深色背景上的可读性。
    - **活力蓝 (`#415A77`)**: 用作按钮、对话框等 UI 元素的背景色，比主背景稍亮，形成层次。

- **辅助色 (Accent Palette)**:
    - **警告红 (`#D90429`)**: 用于“游戏结束”或重要提示。
    - **确认绿 (`#2ECC71`)**: 用于积极的反馈，如“新纪录”。
    - **高亮黄 (`#FFD700`)**: 用于选中状态或得分动画。

- **方块颜色 (Tetromino & Garbage Colors)**:
    - **垃圾行灰 (`#808080`)**: 用于垃圾行，以区别于常规方块。
    - **I (长条)**: 青色 (`#00FFFF`)
    - **O (方块)**: 黄色 (`#FFFF00`)
    - **T (T形)**: 紫色 (`#800080`)
    - **L (L形)**: 橙色 (`#FFA500`)
    - **J (反L形)**: 蓝色 (`#0000FF`)
    - **S (S形)**: 绿色 (`#008000`)
    - **Z (反S形)**: 红色 (`#FF0000`)

### 1.5. 音频
- **背景音乐 (BGM)**:
- **音效 (SFX)**:

## 2. 页面 (Pages)

基于我们创建的场景系统，我们规划了以下几个核心场景：

### 2.1. 主菜单/首页 (`MenuScene`)
- **功能**: 展示游戏标题，提供开始游戏的入口。
- **布局**: 简洁明了，突出核心操作。
- **素材与颜色使用**:
    - **背景**:
        - 底色: `COLORS.PRIMARY_DARK` (深邃蓝)。
        - 纹理: `background_texture.png` (半透明平铺)。
    - **标题 "Tetris"**:
        - 颜色: `COLORS.TEXT_LIGHT` (幽灵白)。
    - **"开始游戏" 按钮**:
        - 背景: `COLORS.PRIMARY_LIGHT` (活力蓝)。
        - 文本: `COLORS.TEXT_LIGHT` (幽灵白)。

### 2.2. 游戏页面 (`GameScene`)
- **功能**: 承载核心玩法，处理游戏逻辑，显示分数和游戏状态。
- **布局**: 主要区域为游戏画布。
- **素材与颜色使用**:
    - **背景**:
        - 底色: `COLORS.PRIMARY_DARK` (深邃蓝)。
        - 纹理: `background_texture.png` (半透明平铺)。
    - **游戏区域网格线**:
        - 颜色: `COLORS.PRIMARY_LIGHT` (活力蓝)。
    - **分数、等级等UI文本**:
        - 颜色: `COLORS.TEXT_LIGHT` (幽灵白)。
    - **方块**:
        - 颜色: `COLORS.TETROMINO_*` (全系列方块颜色)。
    - **垃圾行方块**:
        - 颜色: `COLORS.GARBAGE` (垃圾行灰)。
        - 图像: `block_garbage.png`
    - **"游戏结束" 对话框**:
        - 背景: `COLORS.PRIMARY_LIGHT` (活力蓝)。
        - 标题文本 ("Game Over"): `COLORS.ACCENT_RED` (警告红)。
        - 分数文本: `COLORS.TEXT_LIGHT` (幽灵白)。
    - **"重新开始" 按钮**:
        - 背景: `COLORS.ACCENT_GREEN` (确认绿)。
        - 文本: `COLORS.TEXT_LIGHT` (幽灵白)。

## 3. 组件 (Components)

(No changes in this section)

## 4. 美术与音频资源 (Assets)

### 4.1. 资源目录结构

```
/assets
  ├── audio/ 
  └── images/
      ├── blocks/
      │   ├── block_i.png
      │   ├── block_o.png
      │   ├── block_t.png
      │   ├── block_l.png
      │   ├── block_j.png
      │   ├── block_s.png
      │   ├── block_z.png
      │   └── block_garbage.png
      ├── ui/
      │   ├── button.png
      │   ├── dialog.png
      │   ├── icon_sound_on.png
      │   └── icon_sound_off.png
      └── backgrounds/
          └── background_texture.png
```

### 4.2. 资源命名规范

#### a) 图片资源 (`assets/images/`)

- **方块 (Tetrominoes)**: `assets/images/blocks/`
  - `block_i.png`
  - `block_o.png`
  - ... (and so on for all 7) ...
  - `block_z.png`
  - `block_garbage.png` (新添加)

- **UI 控件 (UI Controls)**: `assets/images/ui/`
  - ... (no changes)

- **背景 (Backgrounds)**: `assets/images/backgrounds/`
  - `background_texture.png` (新添加)

#### b) 音频资源 (`assets/audio/`)

(No changes in this section)
