import React from "react";
import "./DriverCard.css"
import { Link, useLocation } from "react-router-dom";

function DriverCard({ driverKey, driverNumber, driverCode, driverWikiLink, driverImages, driverFirst, driverLast, driverTeam, driverPoints, }) {
  const location = useLocation();

  return (
    <div className="driver-card">
      {(location.pathname === '/drivers' || location.pathname === '/') && (
        <Link 
          to={`/driver/${encodeURIComponent(driverFirst)}_${encodeURIComponent(driverLast)}`}
          className="driver-card-link"
          key={driverKey}>
          <div className="driver-top-info">
            <h2 className="driver-number">{driverNumber}</h2>
            <h2 className="driver-code">{driverCode}</h2>
          </div>
          <div 
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
          </div>
          <div className="driver-team">{driverTeam}</div>
          <div className="driver-points">{driverPoints !== 1 ? `${driverPoints} PTS` : "1 PT"}</div>
        </Link>
      )}
      {(location.pathname === '/teams') && (
        <Link 
          to={`/driver/${encodeURIComponent(driverFirst)}_${encodeURIComponent(driverLast)}`}
          className="driver-card-link"
          key={driverKey}>
          <div className="driver-top-info">
            <h2 className="driver-number">{driverNumber}</h2>
            <h2 className="driver-code">{driverCode}</h2>
          </div>
          <div 
            className="team-image-container" 
            href={driverWikiLink}
            target="_blank">
            { driverImages ? (
              <img 
                src={driverImages.logo}
                className="car-image"
                alt={`${driverFirst} ${driverLast} image`}
              />
            ) : (
              <div className="no-driver-image no-team-image">no image available</div>
            )}
          </div>
          <h2 className="driver-name driver-first-name">
            {driverFirst}  <strong className="driver-name driver-last-name">{driverLast}</strong>
          </h2>
          <div className="driver-team">{driverTeam}</div>
          <div className="driver-points">{driverPoints}</div>
        </Link>
      )}

    </div>
  )
}

export default DriverCard;