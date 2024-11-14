import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConstructorStandings } from "../api"
import "./TeamInfo.css";

function TeamInfo({ teamStandings }) {
  const { name } = useParams();
  const [teamName, setTeamName] = useState("");
  const [teamNationality, setTeamNationality] = useState("");
  const [teamWiki, setTeamWiki] = useState("");
  const [teamPosition, setTeamPosition] = useState("");

  useEffect(() => {
    async function fetchAndSetTeam() {
      try {
        let currentTeam = null;
  
        if (Array.isArray(teamStandings) && teamStandings.length > 0) {
          currentTeam = teamStandings.find(team => team.Constructor.name === name);
        }
  
        if (!currentTeam) {
          const fetchedData = await getConstructorStandings();
          currentTeam = fetchedData.ConstructorStandings.find(team =>
            team.Constructor.name.includes(name)
          );
        }
  
        if (currentTeam) {
          setTeamName(currentTeam.Constructor.name);
          setTeamNationality(currentTeam.Constructor.nationality);
          setTeamWiki(currentTeam.Constructor.url);
          setTeamPosition(currentTeam.position);
        } else {
          console.warn("No team found with the provided name:", name);
        }
      } catch (error) {
        console.error("Error fetching or processing team data:", error);
      }
    }
  
    fetchAndSetTeam();

  }, [teamStandings, name]);

  return (
    <div className="team-info">
      <h1>{teamName}</h1>
    </div>
  )
}

export default TeamInfo;