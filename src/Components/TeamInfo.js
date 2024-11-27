import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConstructorStandings, getIndividualTeamData, getCountryFlag } from "../api"
import "./TeamInfo.css";
import DriverCard from "./DriverCard";

function TeamInfo({ teamStandings, drivers, driverImages }) {
  const { name } = useParams();
  const [teamName, setTeamName] = useState("");
  const [teamNationality, setTeamNationality] = useState("");
  const [teamWiki, setTeamWiki] = useState("");
  const [teamPosition, setTeamPosition] = useState("");
  const [teamBadge, setTeamBadge] = useState("");
  const [teamDrivers, setTeamDrivers] = useState([]);
  const [teamDescription, setTeamDescription] = useState("");
  const [teamFoundedYear, setTeamFoundedYear] = useState("");
  const [teamCarImage, setTeamCarImage] = useState("");
  const [teamTwitter, setTeamTwitter] = useState("");
  const [teamWebsite, setTeamWebsite] = useState("");
  const [teamLocation, setTeamLocation] = useState("");
  const [teamCountryFlag, setTeamCountryFlag] = useState("");

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
          setTeamWiki(currentTeam.Constructor.url);
          setTeamPosition(currentTeam.position);

          let teamNameForApi;

          if (currentTeam.Constructor.name.includes("Haas")) {
            teamNameForApi = "Haas F1";
          } else if (currentTeam.Constructor.name.includes("Aston")) {
            teamNameForApi = "Aston Martin Racing";
          } else if (currentTeam.Constructor.name.includes("RB F1")) {
            teamNameForApi = "Scuderia Alpha Tauri";
          } else {
            teamNameForApi = currentTeam.Constructor.name;
          }   

          getIndividualTeamData(encodeURIComponent(teamNameForApi)).then(team => {
            if (team) {
              setTeamNationality(team.strCountry);
              setTeamBadge(team.strBadge);
              setTeamDescription(team.strDescriptionEN);
              setTeamFoundedYear(team.intFormedYear);
              setTeamCarImage(team.strEquipment);
              setTeamTwitter(team.strTwitter);
              setTeamWebsite(team.strWebsite);
              setTeamLocation(team.strStadium);
            } else {
            }
          })
        } else {
          console.warn("No team found with the provided name:", name);
        }
      } catch (error) {
        console.error("Error fetching or processing team data:", error);
      }
    }
    fetchAndSetTeam();

    console.log(`linear-gradient(270deg, #444, var(--${teamName.replace(/ /g, "-")})`)
  }, [teamStandings, name]);

  useEffect(() => {
    if (teamNationality) {
      if (teamNationality === "England") {
        getCountryFlag("United Kingdom").then(url => {
          setTeamCountryFlag(url);
        });
      } else {
        getCountryFlag(teamNationality).then(url => {
          setTeamCountryFlag(url);
        });
      }
    }
  }, [teamNationality]);

  useEffect(() => {
    if (drivers && drivers.length) {
      let filteredDrivers = drivers.filter(driver => driver.Constructors[0].name === name);
      setTeamDrivers(filteredDrivers);
    }
  }, [drivers])

  return (
    teamName ? (<div className="team-info">
      <div className="team-info-content team-stats-card" style={{
        background: `linear-gradient(270deg, var(--${teamName.replace(/ /g, "-")}), #222`
      }}>
        <img className="team-stats-badge" src={teamBadge} />
        <div className="team-stats-info">
          <div className="team-stats-top-line">
            <h1 className="team-stats-name">{teamName}</h1>
            <div>
              <img className="team-stats-flag" src={teamCountryFlag} />
              <p className="team-stats-nationality">{teamNationality}</p>
            </div>
            <h1 className="team-stats-position">
              {teamPosition === "1" ? "1st" :
              teamPosition === "2" ? "2nd" :
              teamPosition === "3" ? "3rd" : `${teamPosition}th`} Place
            </h1>
          </div>
          <div className="team-stats-driver-card-container">
            {teamDrivers && teamDrivers.length > 1 && teamDrivers.slice(0, 2).map((driver, index) => {
              return <DriverCard 
                key={index}
                driverKey={driver.Driver.code} 
                driverNumber={driver.Driver.permanentNumber}
                driverCode={driver.Driver.code}
                driverWikiLink={driver.Driver.url}
                driverImages={driverImages && (driverImages[driver.Driver.driverId])}
                driverFirst={driver.Driver.givenName}
                driverLast={driver.Driver.familyName}
                driverTeam={teamName}
                driverPoints={driver.points}
              />
            })}
          </div>
        </div>
      </div>
      <div className="team-lower-content">
        <div className="lower-content-container">
          <p className="team-description">
            <div className="car-image-container" aria-label={`${teamName} F1 car image`} style={teamCarImage ? { 
                backgroundImage: `url(${teamCarImage})`, 
                backgroundPosition: "center", 
                backgroundRepeat: "no-repeat",
                backgroundSize: "50%" } : {
                visibility: "hidden",
                height: "0"
            }}>
            </div>
            {teamDescription}
          </p>
        </div>
      </div>
    </div>) : null
  )
}

export default TeamInfo;