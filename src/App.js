import "./App.css";
import { NewsList } from "./components";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import NewsItemSkeleton from "./components/NewsItemSkeleton";
/*import tempData from "./articles";   passed the 100 limit*/

const API_KEY = process.env.REACT_APP_API;

function App() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getArticles = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&search=${searchQuery}&limit=50`
      );

      const json = await response.json();

      if (response.ok) {
        setArticles(json.data);
      }

      /*  setArticles(tempData.data); running temp data*/

      setLoading(false);

      console.log(json); // Check the API response data

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (API_KEY && searchQuery) {
      getArticles();
    }
  }, [searchQuery]);

  return (
    <div className="App">
      <Search onSearch={(searchQuery) => setSearchQuery(searchQuery)} />

      {loading ? (
        <div className="skeleton-container">
          <NewsItemSkeleton />
        </div>
      ) : (
        <NewsList articles={articles} />
      )}
    </div>
  );
}

export default App;
