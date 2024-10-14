import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import { getDriverImage, getStandings } from './api';
import Header from './Components/Header';
import Drivers from './Components/Drivers';
import Home from './Components/Home';

const thisYear = new Date().getFullYear();

function App() {
  const [standings, setStandings] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState();
  const [driverImages, setDriverImages] = useState([]);

  useEffect(() => {
    let years = [];
    for (let i = 1950; i <= thisYear; i++) {
      years.push(i);
    }
    setSeasons(years);

    const storedSeason = JSON.parse(localStorage.getItem("Season")) || thisYear;
    setSeason(storedSeason);

    const storedStandings = JSON.parse(localStorage.getItem(`Standings_${storedSeason}`));
    const storedImages = JSON.parse(localStorage.getItem(`Images_${storedSeason}`));

    if (storedStandings) {
      setStandings(storedStandings);
    } else {
      fetchStandings(storedSeason);
    }

    if (storedImages) {
      setDriverImages(storedImages);
    }
  }, []);

  const fetchStandings = async (season) => {
    try {
      const standingsData = await getStandings(season);
      localStorage.setItem(`Standings_${season}`, JSON.stringify(standingsData));
      setStandings(standingsData);

      const imagePromises = standingsData.map(async (driver) => {
        const fullName = driver.Driver.familyName === "Sainz"
          ? `${driver.Driver.givenName}_${driver.Driver.familyName}_jr`
          : `${driver.Driver.givenName}_${driver.Driver.familyName}`;
        const imageUrl = await getDriverImage(fullName);
        return { driverId: driver.Driver.driverId, imageUrl };
      });

      const images = await Promise.all(imagePromises);
      const imagesMap = images.reduce((acc, { driverId, imageUrl }) => {
        acc[driverId] = imageUrl;
        return acc;
      }, {});

      setDriverImages(imagesMap);
      localStorage.setItem(`Images_${season}`, JSON.stringify(imagesMap));

    } catch (error) {
      console.error(error);
    }
  };

  const chooseSeason = (value) => {
    localStorage.setItem("Season", JSON.stringify(value));
    setSeason(value);

    const storedStandings = JSON.parse(localStorage.getItem(`Standings_${value}`));
    const storedImages = JSON.parse(localStorage.getItem(`Images_${value}`));

    if (storedStandings) {
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
        <Route path="/" element={<Home chooseSeason={chooseSeason} seasons={seasons} />} />
        <Route path="/drivers" element={<Drivers drivers={standings} driverImages={driverImages} />} />
      </Routes>
    </div>
  );
}

export default App;