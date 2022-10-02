import React from "react";

export default function Square({ highlight, value, onClick }) {
  const className = "square" + (highlight ? " highlight" : "");

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
