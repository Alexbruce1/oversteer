import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import { getDriverImage, getStandings } from './api';
import Header from './Components/Header';
import Drivers from './Components/Drivers';
import Home from './Components/Home';

const thisYear = new Date().getFullYear()

function App() {
  const [standings, setStandings] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState(thisYear);
  const [driverImages, setDriverImages] = useState([]);

  useEffect(() => {
    let years = []
    for (let i = 1950; i <= thisYear; i ++) {
      years.push(parseInt(i))
    }
    setSeasons(years)
    console.log(years);
  }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const standingsData = await getStandings(season);
        setStandings(standingsData);

        const imagePromises = standingsData.map(async (driver) => {
          const fullName = driver.Driver.familyName == "Sainz" ? `${driver.Driver.givenName}_${driver.Driver.familyName}_jr` : `${driver.Driver.givenName}_${driver.Driver.familyName}`;
          const imageUrl = await getDriverImage(fullName); // Fetch image from theSportsDB
          return { driverId: driver.Driver.driverId, imageUrl };
        });

        const images = await Promise.all(imagePromises);
        const imagesMap = images.reduce((acc, { driverId, imageUrl }) => {
          acc[driverId] = imageUrl;
          return acc;
        }, {});
        console.log(imagesMap)
        setDriverImages(imagesMap);

      } catch (error) {
        console.error(error);
      }
    };
    fetchStandings();
  }, [season]);

  const chooseSeason = (value) => {
    setSeason(value)
  }

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
