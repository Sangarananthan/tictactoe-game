// App.js
import "./style.scss";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import { useState } from "react";
import { calculateWinner } from "./winner";
import History from "./components/History";

const App = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      isNext: true,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const gaming_board = history[currentMove];
  const winner = calculateWinner(gaming_board.squares);
  console.log({ historyLength: history.length, currentMove: currentMove });

  const handleSquareClick = (clickedPosition) => {
    if (gaming_board.squares[clickedPosition] || winner) return;

    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;
      const latestGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[history.length - 1];
      const nextGamingState = {
        squares: latestGamingState.squares.map((sqVal, position) => {
          if (clickedPosition === position) {
            return latestGamingState.isNext ? "X" : "O";
          }
          return sqVal;
        }),
        isNext: !latestGamingState.isNext,
      };
      let base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(latestGamingState) + 1)
        : currentHistory;
      return [...base, nextGamingState];
    });

    setCurrentMove((move) => move + 1);
  };

  const moveto = (move) => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gaming_board={gaming_board} />
      <Board
        squares={gaming_board.squares}
        handleSquareClick={handleSquareClick}
      />
      <h2>Current Game History</h2>
      <History history={history} moveto={moveto} currentMove={currentMove} />
      <button
        onClick={() => {
          setHistory([{ squares: Array(9).fill(null), isNext: true }]);
          setCurrentMove(0);
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default App;
