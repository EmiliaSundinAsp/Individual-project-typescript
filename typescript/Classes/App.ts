import prompt from "../helpers/prompt.js";
import Board from './Board.js';
import Player from './Player.js';

export default class App {

  board: Board;
  playerX: Player;
  playerO: Player;


  constructor() {
    // Loop to play the game
    while (true) {
      this.createPlayers();
      console.log('Player created')
      this.board = new Board;
      this.startGameLoop();
      this.whoHasWonOnGameOver();
      let playAgain = prompt('Play again? (yes/no) ')
      if (playAgain !== 'yes') { break; }
    }
  }

  // Function to create players
  createPlayers(): void {
    console.log('Connect Four/n');
    let opponentType = prompt('Two players or player VS computer? (two/computer)');
    this.playerX = new Player(prompt('Player X name: '), 'X', this.board);
    if (opponentType === 'computer') {
      this.playerO = new Player('Computer,', 'O', this.board, true)
    } else {
      this.playerO = new Player(prompt('Player O name: '), 'O', this.board);
    }
}

  // Function to start game loop
  startGameLoop(): void {
    if (!this.board.gameOver) {
      this.board.renderBoard();
      let player = this.board.currentPlayer === 'X' ? this.playerX : this.playerO;
      if (player.isComputer) {
        console.log('Computer move');
        let validMove = false;
        let column: number = -1;
        while (!validMove) {
          column = Math.floor(Math.random() * 6);
          if (this.board.matrix[0][column] === ' ') {
            validMove = true;
            console.log('Player color' + player.color + ", Column: " + (column + 1));
          }
        }
        this.board.makeMove(player.color, column);
        console.log('Computer makes move in column: ' + (column + 1));
        this.startGameLoop();
      }

      else {
        console.log('Player move')
        let move = prompt("Make your move " + player.color + " " + player.name + " - enter column:");
        let [column] = move.split(',').map((x: string) => +x.trim() - 1);
        this.board.makeMove(player.color, column,);
        this.startGameLoop();
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