import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import { getDrivers, getStandings } from './api';
import Header from './Components/Header';
import Drivers from './Components/Drivers';
import Home from './Components/Home';



function App() {
  const [drivers, setDrivers] = useState([]);
  const [standings, setStandings] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState(2024);

  // TEMPORARY SEASON SETTER 
  useEffect(() => {
    let years = []
    for (let i = 1950; i <= 2024; i ++) {
      years.push(parseInt(i))
    }
    setSeasons(years)
    console.log(years);
  }, []);


  // useEffect(() => {
  //   const fetchSeasons = async () => {
  //     try {
  //       const seasonData = await getSeasons();
  //       setSeasons(seasonData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSeasons();
  // }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const standingsData = await getStandings(season);
        setStandings(standingsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStandings();
  }, [season]);


  // useEffect(() => {
  //   const fetchDrivers = async () => {
  //     try {
  //       const driversData = await getDrivers(season);
  //       setDrivers(driversData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchDrivers();
  // }, [season]);

  const chooseSeason = (value) => {
    setSeason(value)
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home chooseSeason={chooseSeason} seasons={seasons} />} />
        <Route path="/drivers" element={<Drivers drivers={standings} />} />
      </Routes>

      <ul>
        {drivers.map(driver => (
          <li key={driver.code}>{driver.givenName} {driver.familyName}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
