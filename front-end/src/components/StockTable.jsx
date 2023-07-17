import React from 'react';

const StockTable = ({ stocks, watchlist, addToWatchlist, removeFromWatchlist }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Open</th>
          <th>Day High</th>
          <th>Day Low</th>
          <th>Last Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.open}</td>
            <td>{stock.dayHigh}</td>
            <td>{stock.dayLow}</td>
            <td>{stock.lastPrice}</td>
            <td>
              {watchlist.includes(stock.symbol) ? (
                <button onClick={() => removeFromWatchlist(stock)}>
                  Remove
                </button>
              ) : (
                <button onClick={() => addToWatchlist(stock)}>Add</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
