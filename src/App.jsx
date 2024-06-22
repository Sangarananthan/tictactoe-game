import Board from "./components/Board";
import "./style.scss";
import { useState } from "react";
import { calculateWinner } from "./winner";
const App = () => {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXnext, setIsXNext] = useState(false);
  const winner = calculateWinner(square);
  const nextPlayer = isXnext ? "X" : "O";
  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next player is  ${nextPlayer}`;
  const handleSquareClick = (position) => {
    setSquare((currentState) => {
      return currentState.map((state, index) => {
        if (index === position && !state && !winner) {
          setIsXNext((currentState) => !currentState);
          return isXnext ? "X" : "O";
        }
        return state;
      });
    });
  };

  return (
    <div className="app">
      <h1>{statusMessage}</h1>
      <Board square={square} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default App;
