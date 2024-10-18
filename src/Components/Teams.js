import React, { useState, useEffect } from "react";
import "./Teams.css";
import DriverCard from "./DriverCard";

function Teams({ getStandings, standings, teamData }) {
  const [teamImages, setTeamImages] = useState([]);

  useEffect(() => {
    let cleanedImageData = []
    teamData.length && teamData.forEach(team => {
      cleanedImageData.push({name: team.strTeam, logo: team.strLogo, car: team.strEquipment})
    });

    setTeamImages(cleanedImageData);

  }, [teamData]);

  return (
    <div className="Teams">
      <div className="team-card-container card-container">
        {standings.length && standings.map(team => {
          console.log("rendered thing: ", team.Constructor.name, teamImages.find(i => i.name.includes(team.Constructor.name)))
          return (
            <DriverCard 
              key={team.Constructor.constructorId}
              driverNumber={team.position}
              driverCode={team.points === 1 ? "1 Pt" : `${team.points} PTS`}
              driverWikiLink={team.Constructor.url}
              driverFirst={team.Constructor.name}
              driverTeam={team.wins === 1 ? "1 win" : `${team.wins} wins`}
              driverPoints={team.Constructor.nationality}
              driverImages={teamImages.length ? teamImages.find(i => i.name.includes(team.Constructor.name)) : null}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Teams;


