import React from "react";
import './Home.css';

function Home({ seasons, chooseSeason, season }) {
  return (
    <div className="Home">
      <h1 className="home-header">oversteer</h1>
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
      </form>
    </div>
  );
}

export default Home;