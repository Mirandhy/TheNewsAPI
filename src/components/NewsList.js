import React, { useState, useEffect } from "react";

import { NewsItem } from ".";

const NewsList = ({ articles }) => {
  if (!articles?.length) return <div> There's no article available </div>;
  return (
    <div>
      {articles.map((article) => {
        return (
          <NewsItem
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.image_url}
          />
        );
      })}
    </div>
  );
};

export default NewsList;
