import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [matchingStocks, setMatchingStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect( () => {
    // Fetch top 20 stocks on component mount
    fetchTop20Stocks();
    getWatchListFromUser();
  }, []);

  useEffect(() => {
    // Filter matching stocks when a key is typed in the search box
    if (searchKeyword.trim() !== "") {
      const filteredStocks = stocks.filter((stock) =>
        stock.symbol.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setMatchingStocks(filteredStocks);
    } else {
      setMatchingStocks([]);
    }
  }, [searchKeyword, stocks]);

  const fetchTop20Stocks = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bearer = urlParams.get("bearer");
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "stock",
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      setStocks(response.data.splice(0, 20));
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    }
  };

  const addToWatchlist = async (stock) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const symbol = stock.symbol;
      await axios.post(
        process.env.REACT_APP_API_URL + "watchlist",
        {
          stockName: symbol,
        },
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      setWatchlist([...watchlist, stock]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWatchlist = async (stock) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const symbol = stock.symbol;
      await axios.delete(process.env.REACT_APP_API_URL + "watchlist", {
        data: { stockName: symbol },
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      });
      const updatedWatchlist = watchlist.filter((item) => item !== symbol);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error(error);
    }
  };

  const getWatchListFromUser = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "watchlist",
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      if (response.data.success) {
        const watchlistStocks = response.data.data;
        const filteredStocks = stocks.filter((stock) =>
          watchlistStocks.includes(stock.symbol)
        );
        console.log("#########")
        console.log(watchlistStocks)
        console.log(filteredStocks)
        setWatchlist(filteredStocks);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <div className="search-bar">
        <h2>Search Stocks</h2>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Enter a stock symbol"
        />
        {matchingStocks.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matchingStocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.lastPrice}</td>
                  <td>
                    {watchlist.includes(stock.symbol) ? (
                      <button onClick={() => removeFromWatchlist(stock.symbol)}>
                        Remove
                      </button>
                    ) : (
                      <button onClick={() => addToWatchlist(stock.symbol)}>
                        Add
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="watchlist">
        <h2>Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>No stocks in watchlist</p>
        ) : (
          <div className="">
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
      <div className="top-20-stocks">
        <h2>Top 20 Stocks</h2>
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
      </div>
    </div>
  );
};

export default Dashboard;
