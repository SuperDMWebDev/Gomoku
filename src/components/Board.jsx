import React from "react";
import Square from "./Square";
import { sizeOfBoard } from "../utils/constants";
export default function Board(props) {
  const { winLine, squares, onClick } = props;
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={`${i}-square`}
        highlight={winLine && winLine.includes(i)}
      />
    );
  };
  const createABoard = () => {
    let squares = [];
    let row = [];
    for (let i = 0; i < sizeOfBoard; i++) {
      row = [];
      for (let j = 0; j < sizeOfBoard; j++) {
        row.push(renderSquare(i * sizeOfBoard + j));
      }
      squares.push(
        <div className="board-row" key={`${i}-board`}>
          {row}
        </div>
      );
    }
    return squares;
  };
  return <div>{createABoard()}</div>;
}
