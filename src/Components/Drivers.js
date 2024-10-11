import React from "react";
import "./Drivers.css";

function Drivers({ drivers }) {
  return (
    <div className="Drivers">
      <div className="driver-card-container">
        {drivers.map(driver => (
          <div 
            className="driver-card"
            key={driver.Driver.code}>
              <div className="driver-top-info">
                <h2 className="driver-number">{driver.Driver.permanentNumber}</h2>
                <h2 className="driver-code">{driver.Driver.code}</h2>
              </div>
              <a 
                className="driver-wiki-link" 
                href={driver.Driver.url}
                target="_blank">
                <h2 className="driver-name driver-first-name">
                  {driver.Driver.givenName}  <strong className="driver-name driver-last-name">{driver.Driver.familyName}</strong>
                </h2>
              </a>
              <div className="driver-team">{driver.Constructors[0].name}</div>
              <div className="driver-points">{driver.points !== 1 ? `${driver.points} PTS` : "1 PT"}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drivers;