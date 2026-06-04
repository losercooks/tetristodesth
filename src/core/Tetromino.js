import { TETROMINOES } from './constants.js';

export default class Tetromino {
  /**
   * Creates a new Tetromino instance.
   * @param {string} type - The type of the tetromino (e.g., 'I', 'O', 'T', ...).
   */
  constructor(type) {
    const tetrominoData = TETROMINOES[type];
    if (!tetrominoData) {
      throw new Error(`Invalid tetromino type: ${type}`);
    }

    this.type = type;
    this.shape = tetrominoData.shape;
    this.color = tetrominoData.color;

    // Current position of the tetromino on the board (in grid units)
    this.x = 0;
    this.y = 0;
  }

  // Rotate the tetromino clockwise
  rotate() {
    const newShape = [];
    for (let y = 0; y < this.shape[0].length; y++) {
      const newRow = [];
      for (let x = this.shape.length - 1; x >= 0; x--) {
        newRow.push(this.shape[x][y]);
      }
      newShape.push(newRow);
    }
    this.shape = newShape;
  }

  // Rotate the tetromino counter-clockwise (for undoing invalid rotations)
  undoRotate() {
    const newShape = [];
    for (let y = this.shape[0].length - 1; y >= 0; y--) {
        const newRow = [];
        for (let x = 0; x < this.shape.length; x++) {
            newRow.push(this.shape[x][y]);
        }
        newShape.push(newRow);
    }
    this.shape = newShape;
  }
  
  // Move the tetromino
  move(x, y) {
    this.x += x;
    this.y += y;
  }
}
