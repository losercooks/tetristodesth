import SceneManager from './src/ui/SceneManager.js';

// Import all scenes
import LoadingScene from './src/ui/scenes/LoadingScene.js';
import MenuScene from './src/ui/scenes/MenuScene.js';
import GameScene from './src/ui/scenes/GameScene.js';

// --- Initialization ---

// Get the main canvas
const canvas = wx.createCanvas();

// Get device dimensions
const systemInfo = wx.getSystemInfoSync();
const viewport = {
  width: systemInfo.windowWidth,
  height: systemInfo.windowHeight
};

// Get the 2D rendering context
const ctx = canvas.getContext('2d');

// Instantiate the Scene Manager
const sceneManager = new SceneManager(ctx, viewport);

// --- Scene Registration ---
// Create instances of all our scenes and register them with the manager.
sceneManager.addScene('loading', new LoadingScene(sceneManager));
sceneManager.addScene('menu', new MenuScene(sceneManager));
sceneManager.addScene('game', new GameScene(sceneManager));

// --- Event Handling ---
// Pass touch events to the current scene.
wx.onTouchEnd((event) => {
  sceneManager.handleEvent(event);
});

// --- Game Loop ---
function gameLoop() {
  // Update the state of the current scene
  sceneManager.update();

  // Draw the current scene
  sceneManager.draw();

  // Request the next animation frame
  canvas.requestAnimationFrame(gameLoop);
}

// --- Game Start ---
function initialize() {
  console.log("Initializing game...");

  // Set the initial scene to 'loading'.
  // The LoadingScene will handle asset loading and then switch to the menu.
  sceneManager.switchTo('loading');

  // Start the game loop.
  console.log("Starting game loop.");
  gameLoop();
}

// Start the entire game process
initialize();
