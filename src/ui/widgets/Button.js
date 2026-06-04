export default class Button {
  /**
   * Creates a UI button, which can be color-based or image-based.
   * @param {number} x - The x-coordinate of the button.
   * @param {number} y - The y-coordinate of the button.
   * @param {number} width - The width of the button.
   * @param {number} height - The height of the button.
   * @param {string} [text] - The text to display on the button (if not an image button).
   * @param {object} [options] - Styling and behavior options.
   * @param {string} [options.backgroundColor] - The background color.
   * @param {string} [options.textColor] - The text color.
   * @param {number} [options.fontSize] - The font size.
   * @param {number} [options.cornerRadius] - The corner radius.
   * @param {Image} [options.image] - The regular image for the button.
   * @param {Image} [options.imagePressed] - The image for the button when it's pressed.
   */
  constructor(x, y, width, height, text = '', options = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;

    // --- Style Properties ---
    this.backgroundColor = options.backgroundColor || '#007BFF';
    this.textColor = options.textColor || 'white';
    this.fontSize = options.fontSize || 20;
    this.cornerRadius = options.cornerRadius || 10;
    
    // --- Image Assets ---
    this.image = options.image || null;
    this.imagePressed = options.imagePressed || null;
    
    // --- State ---
    this.isPressed = false;
  }
  
  // Set the button to its pressed state
  press() {
    this.isPressed = true;
  }
  
  // Release the button
  release() {
    this.isPressed = false;
  }

  draw(ctx) {
    const currentImage = this.isPressed && this.imagePressed ? this.imagePressed : this.image;

    if (currentImage) {
      // If an image is available, draw it
      ctx.drawImage(currentImage, this.x, this.y, this.width, this.height);
    } else {
      // Otherwise, draw a color-based button with text
      this.drawColorButton(ctx);
    }
  }
  
  drawColorButton(ctx) {
    // Draw the button background with rounded corners
    ctx.fillStyle = this.backgroundColor;
    ctx.beginPath();
    ctx.moveTo(this.x + this.cornerRadius, this.y);
    ctx.lineTo(this.x + this.width - this.cornerRadius, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.cornerRadius);
    ctx.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
    ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.cornerRadius, this.y + this.height);
    ctx.lineTo(this.x + this.cornerRadius, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.cornerRadius);
    ctx.lineTo(this.x, this.y + this.cornerRadius);
    ctx.quadraticCurveTo(this.x, this.y, this.x + this.cornerRadius, this.y);
    ctx.closePath();
    ctx.fill();

    // Draw the button text
    if (this.text) {
        ctx.fillStyle = this.textColor;
        ctx.font = `${this.fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
  }

  isClicked(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
