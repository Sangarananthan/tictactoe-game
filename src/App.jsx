import "./style.scss";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import { useState } from "react";
import { calculateWinner } from "./winner";
const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(false);
  const winner = calculateWinner(squares);
  const handleSquareClick = (clickedPosition) => {
    if (squares[clickedPosition] || winner) return;

    setSquares((prevSquares) => {
      return prevSquares.map((value, position) =>
        clickedPosition === position ? (isNext ? "X" : "O") : value
      );
    });
    setIsNext((prevIsNext) => !prevIsNext);
  };

  return (
    <div className="app">
      <StatusMessage isNext={isNext} winner={winner} squares={squares} />
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default App;
