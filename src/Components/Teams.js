import React, { useEffect } from "react";
import "./Teams.css";

function Teams({ getStandings, standings }) {
  useEffect(() => {
    getStandings();
  }, {});

  return (
    <div className="Teams">
      {standings.length && standings.map(team => {
        return (
          <div>{team.Constructor.name}</div>
        )
      })}
    </div>
  )
}

export default Teams;