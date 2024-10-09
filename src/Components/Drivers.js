import React from "react";

function Drivers({ drivers }) {
  return (
    <div className="Drivers">
      Drivers
      <ul>
        {drivers.map(driver => (
          <li key={driver.id}>{driver.givenName} {driver.familyName}</li>
        ))}
      </ul>
    </div>
  )
}

export default Drivers;