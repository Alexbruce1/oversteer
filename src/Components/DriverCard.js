import React from "react";
import "./DriverCard.css"
import { Link } from "react-router-dom";

function DriverCard({ key, driverNumber, driverCode, driverWikiLink, driverImages, driverFirst, driverLast, driverTeam, driverPoints, }) {
  return (
    <Link 
      to={`/driver/${encodeURIComponent(driverFirst)}_${encodeURIComponent(driverLast)}`}
      className="driver-card"
      key={key}>
      <div className="driver-top-info">
        <h2 className="driver-number">{driverNumber}</h2>
        <h2 className="driver-code">{driverCode}</h2>
      </div>
      <a 
        className="driver-wiki-link" 
        href={driverWikiLink}
        target="_blank">
        { driverImages ? (
          <img 
            src={driverImages}
            className="driver-image"
            alt={`${driverFirst} ${driverLast} image`}
          />
        ) : (
          <div className="no-driver-image">no image available</div>
        )}
        <h2 className="driver-name driver-first-name">
          {driverFirst}  <strong className="driver-name driver-last-name">{driverLast}</strong>
        </h2>
      </a>
      <div className="driver-team">{driverTeam}</div>
      <div className="driver-points">{driverPoints !== 1 ? `${driverPoints} PTS` : "1 PT"}</div>
    </Link>
  )
}

export default DriverCard;