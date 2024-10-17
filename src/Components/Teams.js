import React, { useEffect } from "react";
import "./Teams.css";
import DriverCard from "./DriverCard";

function Teams({ getStandings, standings }) {
  useEffect(() => {
    console.log("TEAM useEffect: ", standings)
  }, [standings]);

  return (
    <div className="Teams">
      <div className="home-section-container">
        {standings.length && standings.map(team => {
          return (
            <DriverCard 
              key={team.Constructor.constructorId}
              driverNumber={team.position}
              driverCode={team.points === 1 ? "1 Pt" : `${team.points} PTS`}
              driverWikiLink={team.Constructor.url}
              driverFirst={team.Constructor.name}
              driverTeam={team.wins === 1 ? "1 win" : `${team.wins} wins`}
              driverPoints={team.Constructor.nationality}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Teams;


