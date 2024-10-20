import axios from 'axios';

let newsSortBy = "publishedAt";
let newsPageSize = "20";
let newsLanguage = "en";

const sportsDBApiKey = process.env.REACT_APP_SPORTS_DB_API_KEY;
const newsQuery = 'Formula%201%20FIA'
const JOLPI_API_BASE_URL = 'https://api.jolpi.ca/ergast/f1/';
const NEWS_API_BASE_URL = `https://newsapi.org/v2/everything?q=${newsQuery}&sortBy=${newsSortBy}&searchin=title,description&pageSize=${newsPageSize}&language=${newsLanguage}&apiKey=${process.env.REACT_APP_NEWS_API_API_KEY}`;
const THE_SPORTS_DB_PLAYERS_URL = `https://www.thesportsdb.com/api/v1/json/${sportsDBApiKey}/searchplayers.php?p=`;
const THE_SPORTS_DB_TEAMS_URL =  `https://www.thesportsdb.com/api/v1/json/${sportsDBApiKey}/search_all_teams.php?l=Formula%201`

const apiClient = axios.create({
  baseURL: JOLPI_API_BASE_URL,
});

export const getStandings = async (year) => {
  try {
    const response = await apiClient.get(`/${year}/driverstandings`);

    return response.data.MRData;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export const getConstructorStandings = async (year) => {
  try {
    const response = await apiClient.get(`/${year}/constructorstandings`);
    const data = response.data.MRData.StandingsTable.StandingsLists[0];

    return data;
  } catch (error) {
    console.error('Error fetching constructors:', error);
    throw error;
  }
};

export const getNews = async () => {
  try {
    const url = `${NEWS_API_BASE_URL}`;
    const response = await axios.get(url);
    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error("Error getting articles: ", error);
    return null;
  }
};

export const getDriverImage = async (fullName) => {
  try {
    const url = `${THE_SPORTS_DB_PLAYERS_URL}${fullName}`;
    const response = await axios.get(url);
    const player = response.data.player ? response.data.player[0] : null;

    console.log("Image fetched: ", player);

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

export const getTeamImages = async () => {
  try {
    const response = await axios.get(THE_SPORTS_DB_TEAMS_URL);
    const teams = response.data.teams ? response.data.teams : null;

    console.log("TEAM DATA: ", teams);

    return teams;
  } catch (error) {
    console.error("Error fetching team data: ", error)
    return null;
  }
}