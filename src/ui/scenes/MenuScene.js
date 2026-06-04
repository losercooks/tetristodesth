import BaseScene from './BaseScene.js';
import Button from '../widgets/Button.js';
import { COLORS } from '../../core/constants.js';
import assetManager from '../../core/AssetManager.js';
import audioManager from '../../core/AudioManager.js'; // <-- 1. Import AudioManager

class MenuScene extends BaseScene {
  constructor(sceneManager) {
    super(sceneManager);
    const viewport = this.sceneManager.getViewport();

    this.startButton = new Button(
      viewport.width / 2 - 125,
      viewport.height / 2,
      250,
      60,
      '开始游戏',
      {
        backgroundColor: COLORS.PRIMARY_LIGHT,
        textColor: COLORS.TEXT_LIGHT,
        fontSize: 24,
      }
    );
  }

  // <-- 2. Add enter() method
  enter() {
    console.log("Entering Menu Scene. Playing menu music...");
    audioManager.playMusic('BGM_MENU');
  }

  draw(ctx, viewport) {
    // ... (drawing logic remains the same)
    ctx.fillStyle = COLORS.PRIMARY_DARK;
    ctx.fillRect(0, 0, viewport.width, viewport.height);

    try {
      const texture = assetManager.getAsset('BACKGROUND_TEXTURE');
      ctx.globalAlpha = 0.2;
      const pattern = ctx.createPattern(texture, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, viewport.width, viewport.height);
    } catch (e) {
      console.error("Failed to draw background texture:", e.message);
    } finally {
      ctx.globalAlpha = 1.0;
    }
    
    ctx.fillStyle = COLORS.TEXT_LIGHT;
    ctx.font = 'bold 60px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Tetris', viewport.width / 2, viewport.height / 4);

    this.startButton.draw(ctx);
  }

  handleEvent(event) {
    if (event.type === 'touchend') {
      const touch = event.changedTouches[0];
      if (this.startButton.isClicked(touch.x, touch.y)) {
        console.log('Start button clicked! Stopping menu music and switching to GameScene...');
        
        // <-- 3. Stop music before switching scene
        audioManager.stopMusic(); 
        
        this.sceneManager.switchTo('game');
      }
    }
  }

  update() {}
}

export default MenuScene;
