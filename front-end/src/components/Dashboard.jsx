import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from './SearchBar';
import StockTable from './StockTable';
import Watchlist from './WatchList';
import "../styles/Dashboard.css"

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [matchingStocks, setMatchingStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
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
        setWatchlist(filteredStocks);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };    
  
  return (
    <div>
      <SearchBar searchKeyword={searchKeyword} handleSearch={handleSearch} />
      {matchingStocks.length > 0 && (
        <StockTable
          stocks={matchingStocks}
          watchlist={watchlist}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
      )}
      <Watchlist watchlist={watchlist} />
      <div className="top-20-stocks">
        <h2>Top 20 Stocks</h2>
        <StockTable
          stocks={stocks}
          watchlist={watchlist}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
      </div>
    </div>
  );
};

export default Dashboard;
