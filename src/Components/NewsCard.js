import React from "react";
import "./NewsCard.css";

function NewsCard ({ url, index, title, articleImage, source, publishedDate, description }) {
  return (
    <a 
      className="article-card" 
      href={url} 
      rel="noopener noreferrer"
      target="_blank" 
      key={index}>
      <div className="article-image-container">
        <img alt={title} className="article-image" src={articleImage} />
      </div>
      <h2 
        className="article-title">
        {title}
      </h2>
      <h3 className="article-source">{source}</h3>
      <p className="article-description">{new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric"}).format(new Date(publishedDate)).replace(/,/g, " ")}: {description}</p>
    </a>
  )
}

export default NewsCard;