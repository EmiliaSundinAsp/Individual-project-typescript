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



}