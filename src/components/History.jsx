const History = ({ history, moveto, currentMove }) => {
  return (
    <div className="history-wrapper">
      <ul className="history">
        {history.map((move, index) => (
          <li key={index}>
            <button
              type="button"
              className={`btn-move ${currentMove === index ? "active" : ""}`}
              onClick={() => moveto(index)}
            >
              {index === 0 ? "New Game" : `Go to move #${index}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
