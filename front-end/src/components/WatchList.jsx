import React from 'react';
import '../styles/Watchlist.css';

const Watchlist = ({ watchlist }) => {
  return (
    <div className="watchlist-container">
      <h2>Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No stocks in watchlist</p>
      ) : (
        <div className="watchlist-table">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Open</th>
                <th>Day High</th>
                <th>Day Low</th>
                <th>Last Price</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((stock) => (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.open}</td>
                  <td>{stock.dayHigh}</td>
                  <td>{stock.dayLow}</td>
                  <td>{stock.lastPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
