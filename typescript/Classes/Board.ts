export default class Board {

  // Type declarations
  matrix: string[][]; // A two-dimensional array
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | false;
  isADraw: boolean;
  gameOver: boolean;

  constructor() {
    // Generate a board with 7 columns and 6 rows
    this.matrix = [...new Array(6)].map(row => [...new Array(7)].map(column => ' '));
    // Check whose turn it is
    this.currentPlayer = 'X';
    // Game status
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }
}

