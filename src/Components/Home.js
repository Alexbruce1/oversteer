import React from "react";
import './Home.css';

function Home ({ chooseSeason, seasons, season, articles, loadingArticles, articlesError }) {
  return (
    <div className="Home">
      <h1 className="home-header">oversteer</h1>
      <div className="home-form-container">
        <form className="home-form">
          <select 
            className="seasons-dropdown" 
            value={season}
            onChange={(e) => {chooseSeason(e.currentTarget.value)}}>
            {seasons && seasons.length > 0 ? (
              seasons.map(year => (
                <option 
                  key={year} 
                  className="season-option">{year}</option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
          <input className="form-submit-button" type="submit" value="Find drivers" />
          <input className="form-submit-button" type="submit" value="Find teams" />
        </form>
      </div>
        {loadingArticles && <p>Loading articles...</p>}

        {articlesError && <p>{articlesError}</p>}

        {!loadingArticles && !articlesError && Array.isArray(articles) && articles.length > 0 ? (
          <div className="articles-container">
            {articles.map((article, index) => (
              <a 
                className="article-card" 
                href={article.url} 
                rel="noopener noreferrer"
                target="_blank" 
                key={index}>
                <div className="article-image-container">
                  <img className="article-image" src={article.urlToImage} />
                </div>
                <h2 
                  className="article-title">
                  {article.title}
                </h2>
                <h3 className="article-source">{article.source.name}</h3>
                <p className="article-description">{article.description}</p>
              </a>
            ))}
          </div>
        ) : (
          <p>No articles available.</p>
        )}
    </div>
  );
};

export default Home;