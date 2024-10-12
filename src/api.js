import axios from 'axios';

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1/';
const THE_SPORTS_DB_PLAYERS_URL = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getStandings = async (year) => {
  try {
    const response = await apiClient.get(`/${year}/driverstandings`);
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export const getDriverImage = async (fullName) => {
  try {
    const url = `${THE_SPORTS_DB_PLAYERS_URL}${fullName}`;
    const response = await axios.get(url);
    const player = response.data.player ? response.data.player[0] : null;
    
    if (player && player.strCutout) {
      return player.strCutout;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching driver image:', error);
    return null;
  }
};