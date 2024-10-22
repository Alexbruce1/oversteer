import React, { useState, useEffect } from "react";
import './Home.css';
import DriverCard from "./DriverCard";

function Home ({ chooseSeason, seasons, season, drivers, driverImages, articles, loadingArticles, articlesError, fetchRaces }) {
  const [topDrivers, setTopDrivers] = useState([]);

  useEffect(() => {
    const topThreeDrivers = drivers.filter(driver => {
      return parseInt(driver.position) < 4
    });

    setTopDrivers(topThreeDrivers)
  }, drivers)

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="Home">
      <h1 className="home-header">{season} F1 Standings</h1>
      <div className="top-3-container home-section-container">
        {topDrivers.map(driver => {
          let placeText = "";

          parseInt(driver.position) === 1 ? placeText = "1st" :
          parseInt(driver.position) === 2 ? placeText = "2nd" :
          placeText = "3rd";

          return (
              <DriverCard 
                key={driver.Driver.code}
                driverKey={driver.Driver.code} 
                driverNumber={placeText}
                driverCode={driver.Driver.code}
                driverWikiLink={driver.Driver.url}
                driverImages={driverImages[driver.Driver.driverId]}
                driverFirst={driver.Driver.givenName}
                driverLast={driver.Driver.familyName}
                driverTeam={driver.Constructors[0].name}
                driverPoints={driver.points}
              />
          )
        })}
      </div>
      <div className="home-form-container home-section-container">
        <form className="home-form" onClick={fetchRaces} onSubmit={handleSubmit}>
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
          <div className="articles-container home-section-container">
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
                <p className="article-description">{new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'}).format(new Date(article.publishedAt)).replace(/\,/g, ' ')}: {article.description}</p>
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