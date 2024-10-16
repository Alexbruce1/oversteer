import React from "react";
import "./Drivers.css";
import DriverCard from "./DriverCard";

function Drivers({ drivers, driverImages, season }) {
  return (
    <div className="Drivers">
      <h1 className="drivers-header">{season} F1 Standings</h1>
      <div className="driver-card-container">
        {drivers.map(driver => (
          <DriverCard 
            key={driver.Driver.code} 
            driverNumber={driver.Driver.permanentNumber}
            driverCode={driver.Driver.code}
            driverWikiLink={driver.Driver.url}
            driverImages={driverImages[driver.Driver.driverId]}
            driverFirst={driver.Driver.givenName}
            driverLast={driver.Driver.familyName}
            driverTeam={driver.Constructors[0].name}
            driverPoints={driver.points}
          />
        ))}
      </div>
    </div>
  )
}

export default Drivers;