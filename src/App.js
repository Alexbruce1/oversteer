import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import "normalize.css";
import "./App.css";
import { getDriverCutout, getStandings, getNews, getConstructorStandings, getTeamImages, getRaces, getResults } from "./api";
import Header from "./Components/Header";
import Drivers from "./Components/Drivers";
import DriverInfo from "./Components/DriverInfo";
import TeamInfo from "./Components/TeamInfo";
import Home from "./Components/Home";
import Teams from "./Components/Teams";
import Races from "./Components/Races";

const thisYear = new Date().getFullYear();

function App() {
  const [standings, setStandings] = useState([]);
  const [teamStandings, setTeamStandings] = useState({});
  const [teamData, setTeamData] = useState({});
  const [currentSeason, setCurrentSeason] = useState();
  const [currentSeasonRounds, setCurrentSeasonRounds] = useState();
  const [races, setRaces] = useState();
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState();
  const [driverImages, setDriverImages] = useState([]);
  const [articles, setArticles] = useState([]); 
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articlesError, setArticlesError] = useState(null);

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      document.title = 'Oversteer - Local';
    } else {
      document.title = 'Oversteer';
    }
  }, []);


  useEffect(() => {
    let years = [];
    for (let i = 1950; i <= thisYear; i++) {
      years.push(i);
    }
    setSeasons(years);

    const storedSeason = JSON.parse(localStorage.getItem("Season")) || thisYear;
    const storedRaces = JSON.parse(localStorage.getItem(`Races_${storedSeason}`));
    setSeason(storedSeason);
    
    const checkDataAge = (key) => {
      const storedItem = JSON.parse(localStorage.getItem(key));
      const timestamp = localStorage.getItem(`${key}_timestamp`);
      const isOld = timestamp ? (Date.now() - timestamp) > (24 * 60 * 60 * 1000) : true;
      return isOld ? null : storedItem;
    };
    
    const storedStandings = checkDataAge(`Standings_${storedSeason}`);
    const storedImages = checkDataAge(`Images_${storedSeason}`);
    const storedConstructorStandings = checkDataAge("ConstructorStandings");
    const storedTeamData = checkDataAge("TeamData");
    
    if (storedStandings) {
      setStandings(storedStandings);
    } else {
      fetchStandings(storedSeason);
    }
    
    if (storedImages) {
      setDriverImages(storedImages);
    }
    
    if (storedConstructorStandings) {
      setTeamStandings(storedConstructorStandings);
    } else {
      fetchTeamStandings();
    }
    
    if (storedTeamData) {
      setTeamData(storedTeamData);
    } else {
      fetchTeamData();
    }
    
    if (storedRaces) {
      setRaces(storedRaces)
    } else {
      fetchRaces();
    }
    
    fetchNewsArticles();
    
  }, [season]);
  
  const fetchTeamData = async () => {
    try {
      const teamImages = await getTeamImages();
      if (teamImages) {
        setTeamData(teamImages);
        localStorage.setItem("TeamData", JSON.stringify(teamImages));
        localStorage.setItem("TeamData_timestamp", Date.now());
      }
    } catch (error) {
      console.error("Error fetching team data: ", error);
    }
  };

  const fetchRaces = async () => {

    try {
      const races = await getRaces();
      const raceResults = await getResults(currentSeason, currentSeasonRounds);
      setRaces(races);
      localStorage.setItem(`Races_${currentSeason || 2024}`, JSON.stringify(races));

    } catch (error) {
      console.error("Error fetching race results: ", error);
    }
  }

  const fetchStandings = async (season) => {
    try {
      const standingsData = await getStandings(season);
      const rounds = standingsData.total;
      const cleanedStandingsData = standingsData.StandingsTable.StandingsLists[0].DriverStandings;

      localStorage.setItem(`Standings_${season}`, JSON.stringify(cleanedStandingsData));
      localStorage.setItem(`Rounds_${season}`, JSON.stringify(rounds));
      localStorage.setItem(`Standings_${season}_timestamp`, Date.now());
      setStandings(cleanedStandingsData);
      setCurrentSeasonRounds(rounds);

      const imagePromises = cleanedStandingsData.map(async (driver) => {
        const fullName = driver.Driver.familyName === "Sainz"
          ? `${driver.Driver.givenName}_${driver.Driver.familyName}_jr`
          : `${driver.Driver.givenName}_${driver.Driver.familyName}`;
        const imageUrl = await getDriverCutout(fullName);
        return { driverId: driver.Driver.driverId, imageUrl };
      });

      const images = await Promise.all(imagePromises);
      const imagesMap = images.reduce((acc, { driverId, imageUrl }) => {
        acc[driverId] = imageUrl;
        return acc;
      }, {});

      setDriverImages(imagesMap);
      localStorage.setItem(`Images_${season}`, JSON.stringify(imagesMap));
      localStorage.setItem(`Images_${season}_timestamp`, Date.now());

    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeamStandings = async () => {
    try {
      const teamStandingsData = await getConstructorStandings(thisYear);
      const cleanedTeamStandingsData = teamStandingsData.ConstructorStandings;
      const currentSeason = teamStandingsData.season;

      localStorage.setItem("CurrentSeason", JSON.stringify(currentSeason));
      setCurrentSeason(currentSeason);

      localStorage.setItem("ConstructorStandings", JSON.stringify(cleanedTeamStandingsData));
      localStorage.setItem("ConstructorStandings_timestamp", Date.now());
      setTeamStandings(cleanedTeamStandingsData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNewsArticles = async () => {
    try {
      const fetchedArticles = await getNews("formula_1_FIA");
      setArticles(fetchedArticles);
      setLoadingArticles(false);
    } catch (error) {
      setArticlesError("Failed to load articles");
      setLoadingArticles(false);
    }
  };

  const chooseSeason = (value) => {
    setSeason(value);
    localStorage.setItem("Season", JSON.stringify(value));

    const storedStandings = JSON.parse(localStorage.getItem(`Standings_${value}`));
    const storedImages = JSON.parse(localStorage.getItem(`Images_${value}`));

    if (storedStandings && storedImages) {
      setStandings(storedStandings);
    } else {
      fetchStandings(value);
    }

    if (storedImages) {
      setDriverImages(storedImages);
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              chooseSeason={chooseSeason} 
              seasons={seasons} 
              season={season}
              drivers={standings}
              driverImages={driverImages}
              articles={articles}
              loadingArticles={loadingArticles}
              articlesError={articlesError}
            />
          } 
        />
        <Route 
          path="/drivers" 
          element={<Drivers 
            drivers={standings} 
            driverImages={driverImages} 
            season={season}/>} 
        />
        <Route 
          path="/races" 
          element={<Races 
            races={races}
            fetchRaces={fetchRaces} />} 
        />
        <Route 
          path="/teams" 
          element={<Teams 
            getStandings={fetchTeamStandings}
            standings={teamStandings}
            teamData={teamData}
            season={season}/>} 
        />
        <Route path="/driver/:name" element={<DriverInfo driverStandings={standings} />} />
        <Route path="/team/:name" element={<TeamInfo teamStandings={teamStandings} drivers={standings} driverImages={driverImages} />} />
      </Routes>
    </div>
  );
}

export default App;