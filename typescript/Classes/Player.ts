import Board from "./Board.js";

export default class Player {

  name: string;
  color: string;
  board: Board;
  isComputer: boolean;

  constructor(name: string, color: string, board: Board, isComputer: boolean = false) {
    this.name = name;
    this.color = color;
    this.board = board;
    this.isComputer = isComputer;
  }
}