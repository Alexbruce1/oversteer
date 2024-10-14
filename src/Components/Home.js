import React from "react";
import './Home.css';

function Home({ seasons, chooseSeason }) {
  return (
    <div className="Home">
      <h1 className="home-header">oversteer</h1>
      <form className="home-form">
        <select className="seasons-dropdown" onChange={(e) => {chooseSeason(e.currentTarget.value)}}>
          {seasons && seasons.length > 0 ? (
            seasons.map(year => (
              // <option key={year.season} className="season-option">{year.season}</option>
              <option key={year.season} className="season-option">{year}</option>
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