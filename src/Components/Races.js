import React, { useEffect, useState } from "react";
import { getCountryFlag, getResults } from "../api";
import "./Races.css";
import RaceCard from "./RaceCard";

function Races ({ races, fetchRaces }) {
  const [raceResults, setRaceResults] = useState([]);

  useEffect(() => {
    if (races && races.length > 0) {
      getResults(races[0].season, races.length).then((response) => {
        if (response) {
          setRaceResults(response);
        }
      });
    }

    // Fetch races if not present
    if (!races) {
      fetchRaces();
    }
  }, [races, fetchRaces]);

  return (
    <div>
      <div className="races-container">
        {races && races.length > 0 ? (
          races.map((race, index) => (
            <RaceCard 
              key={race.round}
              raceName={race.raceName}
              date={race.date}
              raceTime={race.time}
              startDate={race.FirstPractice.date}
              url={race.Circuit.url}
              round={race.round}
              location={race.Circuit.Location}
              circuit={race.Circuit.circuitName} 
              roundsPerSeason={races.length} 
              results={raceResults && raceResults[index]}
              firstPractice={race.FirstPractice}
              quali={race.Qualifying}
              sprint={race.Sprint && race.Sprint}
            />
          ))
        ) : (
          <p>No races available.</p>
        )}
      </div>
    </div>
  );
}

export default Races;