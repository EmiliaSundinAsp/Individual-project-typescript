import prompt from "../helpers/prompt.js";
import Board from './Board.js';
import Player from './Player.js';

export default class App {

  board: Board;
  playerX!: Player;
  playerO!: Player;


  constructor() {
    // Game loop
    while (true) {
      this.board = new Board(); // Initialize the board first
      this.createPlayers();
      console.log('Players created');
      this.startGameLoop();
      this.whoHasWonOnGameOver();
      let playAgain = prompt('Play again? (yes/no) ');
      if (playAgain.toLowerCase() !== 'yes') {
        break;
      }
    }
  }

  // Function to create players
  createPlayers(): void {
    console.log('Connect Four\n');
    let opponentType = prompt('Two players or player VS computer? (two/computer)');
    this.playerX = new Player(prompt('Player X name: '), 'X', this.board);

    if (opponentType.toLowerCase() === 'computer') {
      this.playerO = new Player('Computer', 'O', this.board, true);
    } else {
      this.playerO = new Player(prompt('Player O name: '), 'O', this.board);
    }
  }

  // Function to start game loop
  startGameLoop(): void {
    while (!this.board.gameOver) { // Ensure game loop continues until the game is over
      this.board.renderBoard();
      let player = this.board.currentPlayer === 'X' ? this.playerX : this.playerO;

      if (player.isComputer) {
        console.log('Computer move');
        let validMove = false;
        let column: number = -1;
        while (!validMove) {
          column = Math.floor(Math.random() * 7); // Assuming 7 columns in Connect Four
          if (this.board.matrix[0][column] === ' ') {
            validMove = true;
            console.log(`Player ${player.color} (Computer), Column: ${column + 1}`);
          }
        }
        this.board.makeMove(player.color, column);
        console.log(`Computer makes move in column: ${column + 1}`);
      } else {
        let validMove = false;
        while (!validMove) {
          let move = prompt(`Make your move ${player.color} (${player.name}) - enter column (1-7):`);
          let column = parseInt(move) - 1;
          if (!isNaN(column) && column >= 0 && column < 7 && this.board.matrix[0][column] === ' ') {
            validMove = true;
            this.board.makeMove(player.color, column);
          } else {
            console.log('Invalid move. Try again.');
          }
        }
      }

      // Check for game over after each move
      if (this.board.gameOver) {
        break;
      }
    }
  }

  // Function to determine winner or a draw
  whoHasWonOnGameOver(): void {
    this.board.renderBoard();
    if (this.board.winner) {
      let winningPlayer = (this.board.winner === 'X' ? this.playerX : this.playerO);
      console.log('Congratulations ' + winningPlayer.color + ": " + winningPlayer.name + ' you won!');
    }
    else {
      console.log('Unfortunately, the game was a draw!')
    }
  }
}