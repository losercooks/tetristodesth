export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.createEmptyGrid();
  }

  // Create an empty 2D array to represent the game board
  createEmptyGrid() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  // Set the value of a cell at a given position
  set(x, y, value) {
    if (this.isWithinBounds(x, y)) {
      this.grid[y][x] = value;
    }
  }

  // Get the value of a cell at a given position
  get(x, y) {
    if (this.isWithinBounds(x, y)) {
      return this.grid[y][x];
    }
    return null; // Return null for out-of-bounds positions
  }

  // Check if a coordinate is within the board boundaries
  isWithinBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  // Check if a cell is occupied
  isOccupied(x, y) {
    return this.get(x, y) !== 0;
  }

  // Lock a tetromino in place on the board
  lockTetromino(tetromino, offsetX, offsetY) {
    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.set(x + offsetX, y + offsetY, value);
        }
      });
    });
  }

  // Check for and clear any full lines
  clearLines() {
    let linesCleared = 0;
    for (let y = this.height - 1; y >= 0; y--) {
      // Check if the row is full
      if (this.grid[y].every(value => value !== 0)) {
        linesCleared++;
        // Remove the full row
        this.grid.splice(y, 1);
        // Add a new empty row at the top
        this.grid.unshift(Array(this.width).fill(0));
        // Since we removed a line, we need to re-check the current line index
        y++;
      }
    }
    return linesCleared;
  }

  // Reset the board to an empty state
  clear() {
    this.grid = this.createEmptyGrid();
  }
}
