import "../styles/Table.css";

const Table = ({
  stocks,
  action,
  addStockToWatchList,
  removeStockFromWatchList,
  watchListStocksNames,
  color,
}) => {
  const buttonTag = (stockName) => {
    if (watchListStocksNames != undefined) {
      if (watchListStocksNames.includes(stockName)) return "Remove";
      else return "Add";
    }
  };

  const handleClick = (stockName) => {
    if (watchListStocksNames.includes(stockName)) {
      removeStockFromWatchList(stockName);
    } else {
      addStockToWatchList(stockName);
    }
  };

  const display = () => {
    return action ? "block" : "none";
  };

  return (
    <div
      className="table"
      style={{ display: stocks.length === 0 ? "none" : "" }}
    >
      <div className={`row header ${color}`}>
        <div className="cell">Symbol</div>
        <div className="cell">Open</div>
        <div className="cell">Day High</div>
        <div className="cell">Day Low</div>
        <div className="cell">Last Price</div>
        <div className="cell" style={{ display: display() }}>
          Actions
        </div>
      </div>
      {stocks.map((stock) => (
        <div className="row" key={stock.symbol}>
          <div className="cell" data-title="Name">
            {stock.symbol}
          </div>
          <div className="cell" data-title="Price">
            {stock.open}
          </div>
          <div className="cell" data-title="Latest Price">
            {stock.dayHigh}
          </div>
          <div className="cell" data-title="Date">
            {stock.dayLow}
          </div>
          <div className="cell" data-title="Date">
            {stock.lastPrice}
          </div>
          <button
            className="cell"
            data-title="Action"
            style={{ display: action ? "block" : "none" }}
            onClick={() => {
              handleClick(stock.symbol);
            }}
          >
            {buttonTag(stock.symbol)}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Table;
