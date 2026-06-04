export default class Viewport {
  constructor(canvas, systemInfo) {
    this.canvas = canvas;
    this.systemInfo = systemInfo;

    // Use the screen dimensions for the viewport
    this.width = systemInfo.screenWidth;
    this.height = systemInfo.screenHeight;

    // Set the canvas dimensions to match the viewport
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  // A helper function to get the center of the screen
  get center() {
    return { x: this.width / 2, y: this.height / 2 };
  }
}
