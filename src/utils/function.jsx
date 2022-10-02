import React from "react";
import { sizeOfBoard } from "./constants";
function handleWin(row, col, type, winner) {
  let arr = [];
  if (type === "row") {
    arr.push(
      row * sizeOfBoard + col,
      row * sizeOfBoard + col + 1,
      row * sizeOfBoard + col + 2,
      row * sizeOfBoard + col + 3,
      row * sizeOfBoard + col + 4
    );
    return {
      winner: winner,
      line: arr,
      isDrawing: false,
    };
  } else if (type === "col") {
    arr.push(
      col + row * sizeOfBoard,
      col + (row + 1) * sizeOfBoard,
      col + (row + 2) * sizeOfBoard,
      col + (row + 3) * sizeOfBoard,
      col + (row + 4) * sizeOfBoard
    );
    return {
      winner: winner,
      line: arr,
      isDrawing: false,
    };
  } else if (type === "main-diagonal") {
    arr.push(
      col * sizeOfBoard + row,
      (col + 1) * sizeOfBoard + row + 1,
      (col + 2) * sizeOfBoard + row + 2,
      (col + 3) * sizeOfBoard + row + 3,
      (col + 4) * sizeOfBoard + row + 4
    );
    return {
      winner: winner,
      line: arr,
      isDrawing: false,
    };
  } else if (type === "sub-diagonal") {
    arr.push(
      row * sizeOfBoard + col,
      (row + 1) * sizeOfBoard + col - 1,
      (row + 2) * sizeOfBoard + col - 2,
      (row + 3) * sizeOfBoard + col - 3,
      (row + 4) * sizeOfBoard + col - 4
    );
    return {
      winner: winner,
      line: arr,
      isDrawing: false,
    };
  }
  return {
    winner: null,
    line: null,
    isDrawing: false,
  };
}
function calculateWinner(board) {
  // hang ngang
  for (let row = 0; row < sizeOfBoard; row++) {
    for (let col = 0; col < sizeOfBoard - 4; col++) {
      if (
        "XXXXX" ===
        "" +
          board[row * sizeOfBoard + col] +
          board[row * sizeOfBoard + col + 1] +
          board[row * sizeOfBoard + col + 2] +
          board[row * sizeOfBoard + col + 3] +
          board[row * sizeOfBoard + col + 4]
      ) {
        return handleWin(row, col, "row", "X");
      } else if (
        "OOOOO" ===
        "" +
          board[row * sizeOfBoard + col] +
          board[row * sizeOfBoard + col + 1] +
          board[row * sizeOfBoard + col + 2] +
          board[row * sizeOfBoard + col + 3] +
          board[row * sizeOfBoard + col + 4]
      ) {
        return handleWin(row, col, "row", "O");
      }
    }
  }
  // hang doc
  for (let col = 0; col < sizeOfBoard; col++) {
    for (let row = 0; row < sizeOfBoard - 4; row++) {
      if (
        "XXXXX" ===
        "" +
          board[col + row * sizeOfBoard] +
          board[col + (row + 1) * sizeOfBoard] +
          board[col + (row + 2) * sizeOfBoard] +
          board[col + (row + 3) * sizeOfBoard] +
          board[col + (row + 4) * sizeOfBoard]
      ) {
        return handleWin(row, col, "col", "X");
      } else if (
        "OOOOO" ===
        "" +
          board[col + row * sizeOfBoard] +
          board[col + (row + 1) * sizeOfBoard] +
          board[col + (row + 2) * sizeOfBoard] +
          board[col + (row + 3) * sizeOfBoard] +
          board[col + (row + 4) * sizeOfBoard]
      ) {
        return handleWin(row, col, "col", "O");
      }
    }
  }
  // hang cheo chinh
  for (let row = 0; row < sizeOfBoard - 4; row++) {
    for (let col = 0; col < sizeOfBoard - 4; col++) {
      if (
        "XXXXX" ===
        "" +
          board[col * sizeOfBoard + row] +
          board[(col + 1) * sizeOfBoard + row + 1] +
          board[(col + 2) * sizeOfBoard + row + 2] +
          board[(col + 3) * sizeOfBoard + row + 3] +
          board[(col + 4) * sizeOfBoard + row + 4]
      ) {
        return handleWin(row, col, "main-diagonal", "X");
      } else if (
        "OOOOO" ===
        "" +
          board[col * sizeOfBoard + row] +
          board[(col + 1) * sizeOfBoard + row + 1] +
          board[(col + 2) * sizeOfBoard + row + 2] +
          board[(col + 3) * sizeOfBoard + row + 3] +
          board[(col + 4) * sizeOfBoard + row + 4]
      ) {
        return handleWin(row, col, "main-diagonal", "O");
      }
    }
  }
  // hang cheo phu
  for (let row = 0; row < sizeOfBoard - 4; row++) {
    for (let col = 0; col < sizeOfBoard; col++) {
      if (
        "XXXXX" ===
        "" +
          board[row * sizeOfBoard + col] +
          board[(row + 1) * sizeOfBoard + col - 1] +
          board[(row + 2) * sizeOfBoard + col - 2] +
          board[(row + 3) * sizeOfBoard + col - 3] +
          board[(row + 4) * sizeOfBoard + col - 4]
      ) {
        return handleWin(row, col, "sub-diagonal", "X");
      } else if (
        "OOOOO" ===
        "" +
          board[row * sizeOfBoard + col] +
          board[(row + 1) * sizeOfBoard + col - 1] +
          board[(row + 2) * sizeOfBoard + col - 2] +
          board[(row + 3) * sizeOfBoard + col - 3] +
          board[(row + 4) * sizeOfBoard + col - 4]
      ) {
        return handleWin(row, col, "sub-diagonal", "O");
      }
    }
  }
  // check draw
  let isDrawing = true;
  for (let i = 0; i < sizeOfBoard; i++) {
    for (let j = 0; j < sizeOfBoard; j++) {
      if (board[i * sizeOfBoard + j] == null) {
        isDrawing = false;
      }
    }
  }
  return {
    winner: null,
    line: null,
    isDrawing: isDrawing,
  };
}
export { handleWin, calculateWinner };
