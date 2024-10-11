import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import { getDrivers, getSeasons } from './api';
import Header from './Components/Header';
import Drivers from './Components/Drivers';
import Home from './Components/Home';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const seasonData = await getSeasons();
        setSeasons(seasonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasons();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversData = await getDrivers();
        setDrivers(driversData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home seasons={seasons} />} />
        <Route path="/drivers" element={<Drivers drivers={drivers} />} />
      </Routes>
    </div>
  );
}

export default App;
