import React from "react";
import "./RaceCard.css";

function RaceCard ({ raceName, date, round, location, circuit }) {
  return (
    <div className="race-card">
      <h2 className="race-card-race-name">{raceName}</h2>
      <p className="race-card-race-round">{round}</p>
      <p className="race-card-race-date">{date}</p>
      <p className="race-card-circuit">{circuit}</p>
      <p className="race-card-city">locality: {location.locality}</p>
      <p className="race-card-city">country: {location.country}</p>
    </div>
  )
}

export default RaceCard;