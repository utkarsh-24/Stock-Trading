import axios from "axios";
import Table from "./Table";
import "../styles/Dashboard.css";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [watchListStocks, setWatchListStocks] = useState([]);
  const [watchListStocksNames, setWatchListStocksNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);

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
      await getWatchListFromUser(response.data.splice(0, 20));
    } catch (error) {
      console.error(error);
        window.location.href = "/login"      
    }
  };

  const addToWatchlist = async (stockName) => {
    const foundStock = stocks.find((stock) => stock.symbol === stockName);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const symbol = foundStock.symbol;
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
      setWatchListStocks([...watchListStocks, foundStock]);
      setWatchListStocksNames([...watchListStocksNames, stockName]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWatchlist = async (stockName) => {
    const indexToRemove = watchListStocks.findIndex(
      (stock) => stock.symbol === stockName
    );
    const foundStock = stocks.find((stock) => stock.symbol === stockName);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const symbol = foundStock.symbol;
      await axios.delete(process.env.REACT_APP_API_URL + "watchlist", {
        data: { stockName: symbol },
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      });
      if (indexToRemove !== -1) {
        setWatchListStocks((watchListStocks) => {
          const updatedWatchListStocks = [
            ...watchListStocks.slice(0, indexToRemove),
            ...watchListStocks.slice(indexToRemove + 1),
          ];
          return updatedWatchListStocks;
        });
        setWatchListStocksNames((watchListStocksNames) =>
          watchListStocksNames.filter((name) => name !== stockName)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWatchListFromUser = async (fetchedStocks) => {
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
        setWatchListStocksNames(response.data.data);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (watchListStocksNames.length > 0) {
      const filteredStocks = stocks.filter((stock) =>
        watchListStocksNames.includes(stock.symbol)
      );
      setWatchListStocks(filteredStocks);
    }
  }, [watchListStocksNames, stocks]);

  useEffect(() => {
    fetchTop20Stocks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStocks([]);
    } else {
      const filteredStocks = stocks.filter((stock) =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStocks(filteredStocks);
    }
  }, [searchQuery, stocks]);

  return (
    <div className="Dashboard">
      <div className="wrapper">
        <div className="search-table">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table
            stocks={filteredStocks}
            action={true}
            addStockToWatchList={addToWatchlist}
            removeStockFromWatchList={removeFromWatchlist}
            watchListStocksNames={watchListStocksNames}
          />
        </div>
        <Table stocks={watchListStocks} action={false} color={"green"} />
        <Table
          stocks={stocks}
          action={true}
          addStockToWatchList={addToWatchlist}
          removeStockFromWatchList={removeFromWatchlist}
          watchListStocksNames={watchListStocksNames}
          color={"blue"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
