// App.js
import "./style.scss";
import Board from "./components/Board";
import StatusMessage from "./components/StatusMessage";
import { useState } from "react";
import { calculateWinner } from "./winner";
import History from "./components/History";
const NEW_GAME = [
  {
    squares: Array(9).fill(null),
    isNext: true,
  },
];
const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const gaming_board = history[currentMove];
  const { winner, winningSquares } = calculateWinner(gaming_board.squares);
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
        ? currentHistory.slice(0, currentMove + 1)
        : currentHistory;
      return [...base, nextGamingState];
    });

    setCurrentMove((move) => move + 1);
  };

  const moveto = (move) => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
    console.clear();
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gaming_board={gaming_board} />
      <Board
        squares={gaming_board.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGameStart}
        className={`btn-reset ${!winner ? "" : "active"}`}
      >
        Start New Game
      </button>
      <h2>Current Game History</h2>
      <History history={history} moveto={moveto} currentMove={currentMove} />
    </div>
  );
};

export default App;
