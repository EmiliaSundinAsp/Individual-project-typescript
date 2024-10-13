export default class Board {

  // Type declarations
  matrix: string[][]; // A two-dimensional array
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | false;
  isADraw: boolean;
  gameOver: boolean;

  constructor() {
    // Generate a board with 7 columns and 6 rows
    this.matrix = [...new Array(6)].map(_row => [...new Array(7)].map(_column => ' '));
    // Check whose turn it is
    this.currentPlayer = 'X';
    // Game status
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  // Function to render board in console
  renderBoard(): void {
    let line = '\n' + '-'.repeat(29) + '\n';
    console.log(
      line + this.matrix.map(row => row.map(column => `| ${column} `).join('') + '|').join(line) + line);
  }

  makeMove(color: 'X' | 'O',  column: number): boolean{
    // don't make any move if the game is over
    if (this.gameOver) { return false; }
    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayer) { return false; }
    // check that the column are numbers - otherwise don't make the move
    if (isNaN(column)) { return false; }
    // check that the column is between 0 and matrix[0] - otherwise don't make the move
    if (column < 0 || column >= this.matrix[0].length) { return false; }
    // check that the position is empty - otherwise don't make the move
        let row = -1;
    for (let r = this.matrix.length - 1; r >= 0; r--) {
        if (this.matrix[r][column] === ' ') {
            row = r;
            break;
        }
    }
    // If no empty row is found, the column is full
    if (row === -1) { return false; }

    // make the move
    this.matrix[row][column] = color;
    // change the current player color
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    // check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    // the game is over if someone has won or if it's a draw
    this.gameOver = !!(this.winner || this.isADraw);
    // return true if the move could be made
    return true;
  }

// PLACE HOLDERS

// Placeholder win checking function
  winCheck(): 'X' | 'O' | false {
    // Implement win checking logic
    return false;
  }

  // Placeholder draw checking function
  drawCheck(): boolean {
    // Implement draw checking logic
    return false;
  }