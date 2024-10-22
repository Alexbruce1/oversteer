import React, { useEffect, useState } from "react";
import { getCountryFlag } from "../api";
import "./RaceCard.css";

function RaceCard ({ raceName, date, raceTime, startDate, url, round, location, circuit }) {
  const [formattedRaceDate, setFormattedRaceDate] = useState(date);
  const [formattedDateRange, setFormattedDateRange] = useState(startDate);
  const [flagUrl, setFlagUrl] = useState(startDate);

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
  }, [date, startDate, location.country]);

  return (
    <div className="race-card">
      <div 
        className="race-card-left-section"
        style={{ 
          backgroundImage: `linear-gradient(to left, #333, rgba(0, 0, 0, 0.7) 90%), url(${flagUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <h2 className="race-card-race-name">{raceName}</h2>
        <h3 className="race-card-location">{location.country}</h3>
        <p className="race-card-race-date">{formattedDateRange[0]}-{formattedDateRange[1]}</p>
        {flagUrl && <img src={flagUrl} className="flag-image"/>}
      </div>
      <div className="race-card-right-section">
        {/* <p className="race-card-race-round">Round {round}</p> */}
        {/* <p className="race-card-race-date">{formattedRaceDate}</p> */}
        <p className="race-card-circuit">{circuit}</p>
        {/* <p className="race-card-city">locality: {location.locality}</p> */}
        {/* <p className="race-card-city">country: {location.country}</p> */}
      </div>
    </div>
  );
}

export default RaceCard;