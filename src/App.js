import "./App.css";
import { NewsList } from "./components";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import NewsItemSkeleton from "./components/NewsItemSkeleton";
import tempData from "./articles";


const API_KEY = process.env.REACT_APP_API;
function App() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    try {
      var requestOptions = {
        method: "GET"
      };

      var params = {
        api_token: API_KEY,
        search: searchQuery,
        limit: "50"
      };

      var esc = encodeURIComponent;
      var query = Object.keys(params)
        .map(function (k) {
          return esc(k) + "=" + esc(params[k]);
        })
        .join("&");

      setLoading(true);

      const response = await fetch(
        "https://api.thenewsapi.com/v1/news/all?" + query,
        requestOptions
      );

      const json = await response.json();

      if (response.ok) {
        setArticles(json.data);
      }

      setArticles(tempData.data);

      setLoading(false);

      console.log(json);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (API_KEY) {
      getArticles();
    }
  }, [searchQuery]);

  return (
    <div className="App">
      <Search onSearch={(searchQuery) => setSearchQuery(searchQuery)} />

      {loading ? (
        <div className="skeleton-container">
          {" "}
          <NewsItemSkeleton />{" "}
        </div>
      ) : (
        <NewsList articles={articles} />
      )}
    </div>
  );
}

export default App;
