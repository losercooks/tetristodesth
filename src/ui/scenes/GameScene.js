import BaseScene from './BaseScene.js';
import Board from '../../core/Board.js';
import Tetromino from '../../core/Tetromino.js';
import Button from '../widgets/Button.js';
import { COLORS, TETROMINOES } from '../../core/constants.js';
import assetManager from '../../core/AssetManager.js';
import audioManager from '../../core/AudioManager.js'; // <-- 1. Import AudioManager

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TETROMINO_TYPES = 'IOTSZLJ';

export default class GameScene extends BaseScene {
  constructor(sceneManager) {
    super(sceneManager);
    this.board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    
    this.gridSize = 0;
    this.gridLeft = 0;
    this.gridTop = 0;
    this.calculateGridDimensions();
    
    this.tetrominoColors = this.getTetrominoColors();

    this.currentTetromino = null;
    this.isGameOver = false;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.lastTime = 0;
    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.softDropActive = false;

    this.buttons = [];
    this.createButtons();
  }

  getTetrominoColors() {
    return Object.keys(TETROMINOES).reduce((acc, key, index) => {
        acc[index + 1] = TETROMINOES[key].color;
        return acc;
    }, {});
  }

  calculateGridDimensions() {
    const viewport = this.sceneManager.getViewport();
    const availableHeight = viewport.height * 0.7; 
    const availableWidth = viewport.width;
    this.gridSize = Math.floor(Math.min(availableWidth / (BOARD_WIDTH + 6), availableHeight / BOARD_HEIGHT));
    const gridWidth = this.gridSize * BOARD_WIDTH;
    const gridHeight = this.gridSize * BOARD_HEIGHT;
    this.gridLeft = (viewport.width - gridWidth) / 2;
    this.gridTop = (viewport.height - gridHeight) * 0.35;
  }
  
  createButtons() {
    const viewport = this.sceneManager.getViewport();
    const btnSize = Math.min(viewport.width / 7, 70);
    const yPos = viewport.height - btnSize * 1.5;
    const spacing = btnSize * 1.2;
    const btnDefs = {
        'left': { x: spacing * 0.5, key: 'BTN_LEFT', action: () => this.playerMove(-1, 0) },
        'right': { x: spacing * 1.7, key: 'BTN_RIGHT', action: () => this.playerMove(1, 0) },
        'soft_drop': { x: spacing * 2.9, key: 'BTN_SOFT_DROP', pressAction: () => this.softDropActive = true, releaseAction: () => this.softDropActive = false },
        'rotate': { x: viewport.width - spacing * 2.9, key: 'BTN_ROTATE', action: () => this.playerRotate() },
        'hard_drop': { x: viewport.width - spacing * 1.7, key: 'BTN_HARD_DROP', action: () => this.playerHardDrop() },
        'attack': { x: viewport.width - spacing * 0.5, key: 'BTN_ATTACK', action: () => console.log("Attack!") }
    };
    for(const name in btnDefs) {
        const def = btnDefs[name];
        this.buttons.push(new Button(def.x, yPos, btnSize, btnSize, '', {
            image: assetManager.getAsset(def.key),
            imagePressed: assetManager.getAsset(`${def.key}_PRESSED`),
            pressAction: def.pressAction,
            releaseAction: def.releaseAction,
            action: def.action
        }));
    }
  }

  enter() {
    this.lastTime = Date.now();
    this.resetGame(true); // Pass a flag for the initial start
  }

  resetGame(isInitialStart = false) {
    if (!isInitialStart) {
        audioManager.playSfx('GAME_OVER');
    }
    
    this.board.clear();
    this.score = 0; this.lines = 0; this.level = 1;
    this.isGameOver = false;
    this.dropInterval = 1000;
    
    audioManager.playMusic('BGM_GAME'); // <-- 2. Play game music
    this.spawnNewTetromino();
  }

  spawnNewTetromino() {
    const type = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
    this.currentTetromino = new Tetromino(type);
    this.currentTetromino.x = Math.floor((this.board.width - this.currentTetromino.shape[0].length) / 2);
    this.currentTetromino.y = 0;
    if (this.checkCollision(this.currentTetromino)) {
      this.isGameOver = true;
      audioManager.stopMusic();
    }
  }

  checkCollision(tetromino) { return super.checkCollision(tetromino); } // No changes
  
  lockTetromino() {
    audioManager.playSfx('LAND'); // <-- 3. Play soft land SFX
    this.board.lockTetromino(this.currentTetromino, this.currentTetromino.x, this.currentTetromino.y);
    const linesCleared = this.board.clearLines();
    
    if (linesCleared > 0) {
        if (linesCleared === 4) {
            audioManager.playSfx('TETRIS'); // <-- 4. Play "TETRIS" SFX
        } else {
            audioManager.playSfx('LINE_CLEAR'); // <-- 4. Play "LINE_CLEAR" SFX
        }

        this.lines += linesCleared;
        this.score += [0, 100, 300, 500, 800][linesCleared] * this.level;
        const newLevel = Math.floor(this.lines / 10) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.dropInterval = Math.max(150, 1000 - (this.level - 1) * 50);
            audioManager.playSfx('LEVEL_UP'); // <-- 4. Play level up SFX
        }
    }
  }

  update() { super.update() } // No changes

  playerMove(x, y, isAutoDrop = false) {
    if (this.isGameOver) return;
    
    this.currentTetromino.move(x, y);

    if (this.checkCollision(this.currentTetromino)) {
      this.currentTetromino.move(-x, -y);
      if (y > 0) {
        this.lockTetromino();
        this.spawnNewTetromino();
      }
      return;
    }
    
    if(x !== 0) audioManager.playSfx('MOVE'); // <-- 5. Play move SFX

    if (y > 0 && !isAutoDrop) {
        this.dropCounter = 0;
        this.score += 1;
    }
  }

  playerRotate() {
    if (this.isGameOver) return;

    this.currentTetromino.rotate();
    
    if (this.checkCollision(this.currentTetromino)) {
        this.currentTetromino.move(-1, 0); if (!this.checkCollision(this.currentTetromino)) { audioManager.playSfx('ROTATE'); return; }
        this.currentTetromino.move(2, 0); if (!this.checkCollision(this.currentTetromino)) { audioManager.playSfx('ROTATE'); return; }
        this.currentTetromino.move(-1, 0);
        this.currentTetromino.undoRotate();
    } else {
        audioManager.playSfx('ROTATE'); // <-- 6. Play rotate SFX
    }
  }
  
  playerHardDrop() {
      if (this.isGameOver) return;
      let cellsDropped = 0;
      while(!this.checkCollision(this.currentTetromino)) {
          this.currentTetromino.move(0, 1);
          cellsDropped++;
      }
      this.currentTetromino.move(0, -1);
      this.score += cellsDropped * 2;
      
      audioManager.playSfx('HARD_DROP'); // <-- 7. Play hard drop SFX
      
      this.lockTetromino();
      this.spawnNewTetromino();
  }

  handleEvent(event) { super.handleEvent(event)} // No changes
  draw(ctx, viewport) { super.draw(ctx, viewport)} // No changes
  drawBackground(ctx, viewport) { super.drawBackground(ctx, viewport)} // No changes
  drawBoard(ctx) { super.drawBoard(ctx)} // No changes
  drawTetromino(ctx, tetromino) { super.drawTetromino(ctx, tetromino)} // No changes
  drawGridLines(ctx) { super.drawGridLines(ctx)} // No changes
  drawUI(ctx) { super.drawUI(ctx)} // No changes
  drawGameOver(ctx, viewport) { super.drawGameOver(ctx, viewport)} // No changes
}
