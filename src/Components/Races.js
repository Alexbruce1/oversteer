import React, { useEffect } from "react";
import { getCountryFlag } from "../api";
import "./Races.css";
import RaceCard from "./RaceCard";

function Races ({ races, fetchRaces }) {
  useEffect (() => {

    // not sure yet if this is necessary; leaving it for now while testing. Remove if unnecessary, as well as fetchRaces and attribute in App
    if (!races) {
      fetchRaces();
    }
  })

  return (
    <div>
      <div className="races-container">
        {races && races.map(race => {
          return (
            <RaceCard 
              raceName={race.raceName}
              date={race.date}
              raceTime={race.time}
              startDate={race.FirstPractice.date}
              url={race.Circuit.url}
              round={race.round}
              location={race.Circuit.Location}
              circuit={race.Circuit.circuitName} />
          )
        })}
      </div>
    </div>
  )
}

export default Races;