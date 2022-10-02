import React, { useState, useEffect } from "react";
import { sizeOfBoard } from "../utils/constants";
import { calculateWinner } from "../utils/function";
import Board from "./Board";
export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(sizeOfBoard * sizeOfBoard).fill(null),
      latestMoveSquare: 0,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  useEffect(() => {
    console.log("history change", history);
  }, [history]);
  const handleClick = (i) => {
    console.log("history", history);
    const historyPart = history.slice(0, stepNumber + i + 1);
    console.log("history", historyPart);
    const current = historyPart[historyPart.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      historyPart.concat([
        {
          squares: squares,
          latestMoveSquare: i,
        },
      ])
    );
    setStepNumber(historyPart.length);
    setXIsNext(!xIsNext);
  };
  const jumpTo = (step) => {
    console.log("jump TO", "step");
    setHistory(history.slice(0, step + 1));
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  const handleSortToggle = () => {
    setIsAscending(!isAscending);
  };

  const renderMoves = () => {
    const moves = history.map((step, move) => {
      const latestMoveSquare = step.latestMoveSquare;
      const col = 1 + (latestMoveSquare % sizeOfBoard);
      const row = 1 + Math.floor(latestMoveSquare / sizeOfBoard);
      const desc = move
        ? "Go to move # ( " + row + "," + col + " )"
        : "Go to game start";
      return (
        <li key={move}>
          <button
            className={move === stepNumber ? "current-item" : ""}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    if (!isAscending) {
      moves.reverse();
    }
    return moves;
  };
  const gameStatus = () => {
    const current = history[stepNumber];
    const winnerInfo = calculateWinner(current.squares);
    const winner = winnerInfo.winner;
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (winnerInfo.isDrawing) {
      status = "Draw";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return status;
  };
  const renderBoard = () => {
    return (
      <Board
        squares={history[stepNumber].squares}
        onClick={(i) => handleClick(i)}
        winLine={calculateWinner(history[stepNumber].squares).line}
      />
    );
  };
  return (
    <div className="game">
      <div className="game-board">{renderBoard()}</div>
      <div className="game-info">
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          {gameStatus()}
        </div>
        <button onClick={() => handleSortToggle()}>
          {isAscending ? "descending" : "ascending"}
        </button>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  );
}
