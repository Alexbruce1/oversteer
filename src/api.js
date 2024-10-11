import axios from 'axios';

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // 'Authorization': `Bearer ${API_KEY}`,
  },
});

export const getSeasons = async () => {
  try {
    const response = await apiClient.get('seasons');
    return response.data.MRData.SeasonTable.Seasons;
  } catch (error) {
    console.error('Error fetching seasons: ', error);
    throw error;
  }
};

export const getDrivers = async () => {
  try {
    const response = await apiClient.get('/2024/drivers');
    return response.data.MRData.DriverTable.Drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};