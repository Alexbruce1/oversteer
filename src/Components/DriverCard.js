import React, { useEffect } from "react";
import "./DriverCard.css"
import { Link, useLocation } from "react-router-dom";

function DriverCard({ driverKey, driverNumber, driverCode, driverWikiLink, driverImages, driverFirst, driverLast, driverTeam, driverPoints, teamPosition, teamPoints, teamName, teamWins, teamNationality }) {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem(`${driverFirst}_${driverLast}_images`, JSON.stringify(driverImages))
  }, [driverImages])

  return (
    <div className="driver-card">
      {(location.pathname === '/drivers' || location.pathname === '/') && (
        <Link 
          to={`/driver/${encodeURIComponent(driverFirst)}_${encodeURIComponent(driverLast)}`}
          className="driver-card-link"
          key={driverKey}>
          <div className="card-top-info">
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
          to={`/team/${encodeURIComponent(teamName)}`}
          className="driver-card-link"
          key={driverKey}>
          <div className="card-top-info">
            <h2 className="team-position">{teamPosition}</h2>
            <h2 className="team-points">{teamPoints}</h2>
          </div>
          <div 
            className="team-image-container">
            { driverImages ? (
              <img 
                src={driverImages.logo}
                className="team-image"
                alt={`${teamName} logo`}
              />
            ) : (
              <div className="no-driver-image no-team-image">no image available</div>
            )}
          </div>
          <h2 className="team-name">
            {teamName}
          </h2>
          <div className="team-wins">{teamWins}</div>
          <div className="team-nationality">{teamNationality}</div>
        </Link>
      )}

    </div>
  )
}

export default DriverCard;