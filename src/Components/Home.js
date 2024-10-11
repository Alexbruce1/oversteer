import React from "react";
import './Home.css';

function Home({ seasons }) {
  return (
    <div className="Home">
      Home
      <form className="home-form">
        <select className="seasons-dropdown">
          {seasons && seasons.length > 0 ? (
            seasons.map(year => (
              <option key={year.season} className="season-option">{year.season}</option>
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