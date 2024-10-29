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
      {(location.pathname === "/drivers" || location.pathname === "/") && (
        <div 
          className="driver-card-bg-image"    
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(5, 5, 5, 0.4)), url(${driverImages})`,
            backgroundSize: "contain",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat"
          }}>
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
              { !driverImages && (
                <div className="no-driver-image">no image available</div>
              )}
              <div className="driver-lower-info">
                <h2 className="driver-name driver-first-name">
                  {driverFirst}<strong className="driver-name driver-last-name">{driverLast}</strong>
                </h2>
                <div className="driver-card-bottom-row">
                  <div className="driver-team">{driverTeam}</div>
                  <div className="driver-points">{driverPoints !== 1 ? `${driverPoints} PTS` : "1 PT"}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        )}
      {(location.pathname === "/teams") && (
        <div>
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
        // </div>
      )}
    </div>
  )
}

export default DriverCard;