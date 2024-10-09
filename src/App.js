import React, { useEffect, useState } from 'react';
import 'normalize.css';
import './App.css';
import { getDrivers } from './api';
import Header from './Components/Header';

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
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <ul>
          {drivers.map(driver => (
            <li key={driver.id}>{driver.givenName} {driver.familyName}</li>
          ))}
        </ul>
    </div>
  );
}

export default App;
