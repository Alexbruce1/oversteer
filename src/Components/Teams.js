import React, { useState, useEffect } from "react";
import "./Teams.css";
import DriverCard from "./DriverCard";

function Teams({ getStandings, standings, teamData }) {
  const [teamImages, setTeamImages] = useState([]);

  useEffect(() => {
    let cleanedImageData = []
    teamData.length && teamData.forEach(team => {
      cleanedImageData.push({name: team.strTeam, logo: team.strBadge, car: team.strEquipment})
    });

    setTeamImages(cleanedImageData);

  }, [teamData]);

  return (
    <div className="Teams">
      <h1>F1 Teams</h1>
      <div className="team-card-container card-container">
        {standings.length && standings.map(team => {
          return (
            <DriverCard 
              key={team.Constructor.constructorId}
              teamPosition={team.position}
              teamPoints={team.points === 1 ? "1 Pt" : `${team.points} PTS`}
              teamName={team.Constructor.name}
              teamWins={team.wins === 1 ? "1 win" : `${team.wins} wins`}
              teamNationality={team.Constructor.nationality}
              driverImages={teamImages.length ? teamImages.find(i => i.name.includes(team.Constructor.name)) : null}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Teams;


