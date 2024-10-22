import React, { useEffect } from "react";
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
            <div>
              <RaceCard 
                raceName={race.raceName}
                date={race.date}
                round={race.round}
                location={race.Circuit.Location}
                circuit={race.Circuit.circuitName} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Races;