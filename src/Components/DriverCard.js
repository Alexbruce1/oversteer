import React, { useEffect } from "react";
import "./DriverCard.css"
import { Link, useLocation } from "react-router-dom";

function DriverCard({ driverKey, driverNumber, driverCode, driverWikiLink, driverImages, driverFirst, driverLast, driverTeam, driverPoints, teamPosition, teamPoints, teamName, teamWins, teamNationality }) {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem(`${driverFirst}_${driverLast}_images`, JSON.stringify(driverImages))

  }, [driverImages])

  return (
    <div className={(
      location.pathname.includes("/drivers")) || location.pathname === "/" ? "driver-card" : 
      (location.pathname.includes("/teams")) ? "driver-card driver-card-team" :
      "driver-card driver-card-team-stats"}
      style={location.pathname === "/teams" ? {
      background: `linear-gradient(150deg, var(--${teamName.replace(/ /g, "-")}) -50%, #222`
      } : {background: "var(--card-background-gradient)"}}>
      {(location.pathname.includes("/drivers") || location.pathname === "/") && (
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
{/* ---------------------- TEAMS --------------------------------------- */}
      {(location.pathname === "/teams") && (
        <div className="team-card">
          <Link 
            to={`/team/${encodeURIComponent(teamName)}`}
            className="driver-card-link"
            key={driverKey}>
            <div className="card-top-info card-top-info-team">
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
            <div className="team-card-bottom-info">
              <h1 className="team-name">
                {teamName}
              </h1>
              <h2 className="team-nationality">{teamNationality}</h2>
              <div className="team-card-last-row">
                <h2 className="team-position">{teamPosition === "1" ? "1st" :
                  teamPosition === "2" ? "2nd" :
                  teamPosition === "3" ? "3rd" : `${teamPosition}th`} Place</h2>
                <h2 className="team-points">{teamPoints}</h2>
              </div>
            </div>
          </Link>
        </div>
      )}
{/* ---------------------- INDIVIDUAL TEAM --------------------------------------- */}
      {(location.pathname.includes("/team/")) && (
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
                  <div className="driver-points">{driverPoints !== 1 ? `${driverPoints} PTS` : "1 PT"}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DriverCard;