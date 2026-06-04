export default class BaseScene {
  constructor(ctx, viewport, sceneManager, assetManager) {
    this.ctx = ctx;
    this.viewport = viewport;
    this.sceneManager = sceneManager;
    this.assetManager = assetManager;
  }

  // Called when the scene becomes active
  onEnter() {}

  // Called when the scene is no longer active
  onExit() {}

  // Called on every frame to update the scene's state
  update() {}

  // Called on every frame to draw the scene
  draw() {}

  // Handles user input and other events
  handleEvent(event) {}
}
