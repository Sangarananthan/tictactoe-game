const StatusMessage = ({ winner, gaming_board }) => {
  const { squares, isNext } = gaming_board;
  const noMovesLeft = squares.every((val) => val !== null);
  const nextPlayer = isNext ? "X" : "O";

  const statusMessage = () => {
    if (winner) {
      return <>Winner is {winner}</>;
    }
    if (noMovesLeft) {
      return (
        <>
          <span className="text-green"> X </span>and
          <span className="text-orange"> O </span>tied!
        </>
      );
    }
    return (
      <>
        Next player is{" "}
        <span className={!isNext ? "text-orange" : "text-green"}>
          {nextPlayer}
        </span>
      </>
    );
  };

  return <h2 className="status-message">{statusMessage()}</h2>;
};

export default StatusMessage;
