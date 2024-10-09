import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';
import './App.css';
import { getDrivers } from './api';
import Header from './Components/Header';
import Drivers from './Components/Drivers';

function App() {
  const [drivers, setDrivers] = useState([{id: 1, name: "Max"}, {id: 2, name: "Lando"}]);

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
        <Route path="/" element={<Drivers drivers={drivers} />} />
      </Routes>
    </div>
  );
}

export default App;
