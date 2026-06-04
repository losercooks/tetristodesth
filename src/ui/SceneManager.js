import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import LoadingScene from './scenes/LoadingScene.js';

export default class SceneManager {
  constructor(ctx, viewport, assetManager) {
    this.ctx = ctx;
    this.viewport = viewport;
    this.assetManager = assetManager;

    // 1. Create instances of all scenes, passing the manager and asset manager to them
    this.scenes = {
      'loading': new LoadingScene(this.ctx, this.viewport, this, this.assetManager),
      'menu': new MenuScene(this.ctx, this.viewport, this, this.assetManager),
      'game': new GameScene(this.ctx, this.viewport, this, this.assetManager)
    };

    // 2. Set the starting scene to the loading scene
    this.currentScene = this.scenes['loading'];
    this.currentScene.onEnter();
  }

  // Switch to a new scene
  switchTo(sceneName) {
    if (this.scenes[sceneName] && this.scenes[sceneName] !== this.currentScene) {
      console.log(`Switching from ${this.currentScene.constructor.name} to ${sceneName}`);
      this.currentScene.onExit();
      this.currentScene = this.scenes[sceneName];
      this.currentScene.onEnter();
    } else {
      console.warn(`Scene '${sceneName}' not found or already active.`);
    }
  }

  // Update the current scene
  update() {
    this.currentScene.update();
  }

  // Draw the current scene
  draw() {
    this.currentScene.draw();
  }

  // Pass events to the current scene
  handleEvent(event) {
    this.currentScene.handleEvent(event);
  }
}
