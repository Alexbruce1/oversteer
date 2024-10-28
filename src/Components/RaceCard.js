import React, { useEffect, useState } from "react";
import { getCountryFlag, getRaceTrackImage } from "../api";
import "./RaceCard.css";

function RaceCard ({ raceName, date, raceTime, startDate, url, round, location, circuit, roundsPerSeason, results, firstPractice, quali, sprint }) {
  const [formattedDateRange, setFormattedDateRange] = useState(startDate);
  const [formattedRaceTime, setFormattedRaceTime] = useState("");
  const [formattedQualiTime, setFormattedQualiTime] = useState("");
  const [formattedSprintTime, setFormattedSprintTime] = useState("");
  const [formattedFP1Time, setFormattedFP1Time] = useState("");

  const [formattedRaceDate, setFormattedRaceDate] = useState(date);
  const [formattedQualiDate, setFormattedQualiDate] = useState("");
  const [formattedSprintDate, setFormattedSprintDate] = useState("");
  const [formattedFP1Date, setFormattedFP1Date] = useState("");

  const [flagUrl, setFlagUrl] = useState(startDate);
  const [trackImage, setTrackImage] = useState("");
  const [raceIsOver, setRaceIsOver] = useState(false);

  useEffect(() => {
    let practiceDate = new Date(startDate);
    let raceDate = new Date(date);
    let FPDate = new Date(firstPractice.date);
    let qualiDate = new Date(quali.date);
    let sprintDate = new Date(sprint && sprint.date);
    const options = { month: "short", day: "numeric" };
    const dateRangeFormatMD = { month: "short", day: "numeric" };
    const dateRangeFormatD = { day: "numeric" };
    const timeFormat = { hour: 'numeric', minute: 'numeric', hour12: true };
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

    // Set race as over if results exist and are valid
    if (results && results.Results && results.Results.length > 0) {
      setRaceIsOver(true);
      console.log(`Results for ${raceName}:`, results);
    }

    setFormattedFP1Date(FPDate.toLocaleDateString(undefined, options));
    setFormattedQualiDate(qualiDate.toLocaleDateString(undefined, options));
    setFormattedRaceDate(raceDate.toLocaleDateString(undefined, options));
    setFormattedDateRange(dateRange);
    
    
    const raceTimeFormatted = new Date(`1970-01-01T${raceTime}`).toLocaleTimeString(undefined, timeFormat);
    const qualiTimeFormatted = new Date(`1970-01-01T${quali.time}`).toLocaleTimeString(undefined, timeFormat);
    const FPTimeFormatted = new Date(`1970-01-01T${firstPractice.time}`).toLocaleTimeString(undefined, timeFormat);
    if (sprint) {
      const SprintTimeFormatted = new Date(`1970-01-01T${sprint.time}`).toLocaleTimeString(undefined, timeFormat);
      setFormattedSprintTime(SprintTimeFormatted);
      setFormattedSprintDate(sprintDate.toLocaleDateString(undefined, options));
    }
    setFormattedRaceTime(raceTimeFormatted);
    setFormattedQualiTime(qualiTimeFormatted);
    setFormattedFP1Time(FPTimeFormatted);

    location.country === "UK" ? getCountryFlag("United Kingdom").then((url) => setFlagUrl(url))
    : getCountryFlag(location.country).then((url) => setFlagUrl(url));

    getRaceTrackImage(circuit).then((url) => {
      if (url) {
        setTrackImage(url);
      }
    });
  }, [date, startDate, location.country, circuit, results, raceName]);

  return (
    <div className="race-card">
      <div 
        className="race-card-left-section"
        style={{ 
          backgroundImage: `linear-gradient(to left, #222, rgba(0, 0, 0, 0.8) 90%), url(${flagUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top left',
          backgroundRepeat: 'no-repeat'
        }}>
        <h2 className="race-card-race-name">{raceName}</h2>
        <h3 className="race-card-location">{location.country}</h3>
        <p className="race-card-race-date">{formattedDateRange[0]}-{formattedDateRange[1]}</p>
        {trackImage && <img src={trackImage} className="track-image"/>}
        {!trackImage && <img src={flagUrl} className="flag-image"/>}
      </div>
      
      {raceIsOver && results && results.Results && (
        <div className="race-card-right-section">
          <h3 className="card-right-section-header">Race Results</h3>
          <div className="card-right-section-list card-list-1">
            <p className="card-results-name">
              1. {results.Results[0].Driver.familyName}
            </p>
            <p className="card-results-name">
              {results.Results[0].Constructor.name}
            </p> 
            <p className="card-results-time">{results.Results[0].Time.time}</p>
          </div>
          <div className="card-right-section-list card-list-2">
            <p className="card-results-name">
              2. {results.Results[1].Driver.familyName}
            </p>
            <p className="card-results-name">
              {results.Results[1].Constructor.name}
            </p> 
            <p className="card-results-time">{results.Results[1].Time.time}</p>
          </div>
          <div className="card-right-section-list card-list-3">
            <p className="card-results-name">
              3. {results.Results[2].Driver.familyName}
            </p>
            <p className="card-results-name">
              {results.Results[2].Constructor.name}
            </p> 
            <p className="card-results-time">{results.Results[2].Time.time}</p>
          </div>
        </div>
      )}
      {!raceIsOver && <div className="race-card-right-section">
        <h3 className="card-right-section-header">Schedule</h3>
          <div className="card-right-section-list card-list-1">
            <p className="card-results-name">First Practice</p>
            <p className="card-results-time">{formattedFP1Date}, {formattedFP1Time}</p>
          </div>
        {sprint && 
          <div className="card-right-section-list card-list-1 sprint">
            <p className="card-results-name">Sprint:</p>
            <p className="card-results-time">{formattedSprintDate}, {formattedSprintTime}</p>
          </div>}
          <div className="card-right-section-list card-list-2">
            <p className="card-results-name">Qualifying:</p>
            <p className="card-results-time">{formattedQualiDate}, {formattedQualiTime}</p>
          </div>
          <div className="card-right-section-list card-list-3">
            <p className="card-results-name">Race:</p>
            <p className="card-results-time">{formattedRaceDate}, {formattedRaceTime}</p>
          </div>
        </div>}
    </div>
  );
}

export default RaceCard;