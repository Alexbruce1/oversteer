import React, { useEffect, useState } from "react";
import { getCountryFlag, getRaceTrackImage } from "../api";
import "./RaceCard.css";

function RaceCard ({ raceName, date, raceTime, startDate, url, round, location, circuit }) {
  const [formattedRaceDate, setFormattedRaceDate] = useState(date);
  const [formattedDateRange, setFormattedDateRange] = useState(startDate);
  const [flagUrl, setFlagUrl] = useState(startDate);
  const [trackImage, setTrackImage] = useState("");

  useEffect(() => {
    let practiceDate = new Date(startDate);
    let raceDate = new Date(date);
    const options = { month: "long", day: "numeric" };
    const dateRangeFormatMD = { month: "short", day: "numeric" };
    const dateRangeFormatD = { day: "numeric" };
    let dateRange = [];

    if (practiceDate.getMonth() === raceDate.getMonth()) {
      dateRange = [
        practiceDate.toLocaleDateString(undefined, dateRangeFormatMD),
        raceDate.toLocaleDateString(undefined, dateRangeFormatD)
      ]
    } else {
      dateRange = [
        practiceDate.toLocaleDateString(undefined, dateRangeFormatMD),
        raceDate.toLocaleDateString(undefined, dateRangeFormatMD)
      ]
    }

    setFormattedRaceDate(raceDate.toLocaleDateString(undefined, options));
    setFormattedDateRange(dateRange);

    location.country === "UK" ? getCountryFlag("United Kingdom").then((url) => setFlagUrl(url))
    : getCountryFlag(location.country).then((url) => setFlagUrl(url))

    getRaceTrackImage(circuit).then((url) => {
      if (url) {
        setTrackImage(url);
      }
    });
  }, [date, startDate, location.country, circuit]);

  return (
    <div className="race-card">
      <div 
        className="race-card-left-section"
        style={{ 
          backgroundImage: `linear-gradient(to left, #333, rgba(0, 0, 0, 0.8) 90%), url(${flagUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <h2 className="race-card-race-name">{raceName}</h2>
        <h3 className="race-card-location">{location.country}</h3>
        <p className="race-card-race-date">{formattedDateRange[0]}-{formattedDateRange[1]}</p>
        {trackImage && <img src={trackImage} className="track-image"/>}
        {!trackImage && <img src={flagUrl} className="flag-image"/>}
      </div>
      <div className="race-card-right-section">
        <h3 className="card-right-section-header">Results:</h3>
        <p className="card-right-section-list card-list-1">Charles Leclerc</p>
        <p className="card-right-section-list card-list-2">Carlos Sainz Jr.</p>
        <p className="card-right-section-list card-list-3">Max Verstappen</p>
        {/* <p className="race-card-race-round">Round {round}</p> */}
        {/* <p className="race-card-race-date">{formattedRaceDate}</p> */}
        {/* <p className="race-card-circuit">{circuit}</p> */}
        {/* <p className="race-card-city">locality: {location.locality}</p> */}
        {/* <p className="race-card-city">country: {location.country}</p> */}
      </div>
    </div>
  );
}

export default RaceCard;