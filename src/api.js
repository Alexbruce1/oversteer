import axios from 'axios';

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1/';
// const API_KEY = 'your_api_key_here';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // 'Authorization': `Bearer ${API_KEY}`,
  },
});

export const getDrivers = async () => {
  try {
    const response = await apiClient.get('/2024/drivers');
    console.log(response.data.MRData.DriverTable.Drivers);
    return response.data.MRData.DriverTable.Drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};