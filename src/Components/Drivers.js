import React from "react";
import "./Drivers.css";
import { Link } from 'react-router-dom';

function Drivers({ drivers, driverImages, season }) {
  return (
    <div className="Drivers">
      <h1 className="drivers-header">{season} F1 Standings</h1>
      <div className="driver-card-container">
        {drivers.map(driver => (
          <Link 
            to={`/driver/${encodeURIComponent(driver.Driver.givenName)}_${encodeURIComponent(driver.Driver.familyName)}`}
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
                { driverImages[driver.Driver.driverId] ? (
                  <img 
                    src={driverImages[driver.Driver.driverId]}
                    className="driver-image"
                    alt={`${driver.Driver.givenName} ${driver.Driver.familyName} image`}
                  />
                ) : (
                  <div className="no-driver-image">no image available</div>
                )}
                <h2 className="driver-name driver-first-name">
                  {driver.Driver.givenName}  <strong className="driver-name driver-last-name">{driver.Driver.familyName}</strong>
                </h2>
              </a>
              <div className="driver-team">{driver.Constructors[0].name}</div>
              <div className="driver-points">{driver.points !== 1 ? `${driver.points} PTS` : "1 PT"}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Drivers;