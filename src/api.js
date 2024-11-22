import axios from "axios";

let newsSortBy = "publishedAt";
let newsLanguage = "en";
const thisYear = new Date().getFullYear();

const sportsDBApiKey = process.env.REACT_APP_SPORTS_DB_API_KEY;
const gNewsApiKey = process.env.REACT_APP_GNEWS_API_KEY;
const openAIApiKey = process.env.REACT_APP_OPENAI_API_KEY;
const JOLPI_API_BASE_URL = "https://api.jolpi.ca/ergast/f1/";
const NEWS_API_BASE_URL = `https://newsapi.org/v2/everything?`;
const G_NEWS_API_BASE_URL = `https://gnews.io/api/v4/search?`;
const THE_SPORTS_DB_PLAYERS_URL = `https://www.thesportsdb.com/api/v1/json/${sportsDBApiKey}/searchplayers.php?p=`;
const THE_SPORTS_DB_TEAMS_URL =  `https://www.thesportsdb.com/api/v1/json/${sportsDBApiKey}/search_all_teams.php?l=Formula%201`
const THE_SPORTS_DB_BASE_URL =  `https://www.thesportsdb.com/api/v1/json`

const apiClient = axios.create({
  baseURL: JOLPI_API_BASE_URL,
});

export const getStandings = async (year) => {
  try {
    const response = await apiClient.get(`/${year}/driverstandings`);
    const data = response.data.MRData;
    return data;
  } catch (error) {
    console.error("Error fetching drivers: ", error);
    throw error;
  }
};

export const getRaces = async (year = 2024) => {
  try {
    const response = await apiClient.get(`/${year}/races`);
    return response.data.MRData.RaceTable.Races;
  } catch (error) {
    console.error("Error fetching races: ", error);
  }
}

export const getResults = async (year = 2024, rounds) => {
  let currentRound = 0;
  let results = [];

  // search for race results BY RACE. Fetching them all in one only returns the first two results. This gets everything for the season
  while (currentRound < rounds) {
    currentRound ++;
    try {
      const response = await apiClient.get(`/${year}/${currentRound}/results`);
      results.push(response.data.MRData.RaceTable.Races[0]);
    } catch (error) {
      console.error("Error fetching results: ", error);
      throw error;
    }
  }
  return results;
};

export const getConstructorStandings = async (year = thisYear) => {
  try {
    const response = await apiClient.get(`/${year}/constructorstandings`);
    const data = response.data.MRData.StandingsTable.StandingsLists[0];

    return data;
  } catch (error) {
    console.error("Error fetching constructors: ", error);
    throw error;
  }
};

export const getNews = async (topic, resultsLimit = 10) => {
  let mainNewsQuery = `q=${topic.split("_").join("%20")}`; 
  let path = `${mainNewsQuery}&lang=en&max=${resultsLimit}&apikey=${gNewsApiKey}`

  try {
    const url = `${G_NEWS_API_BASE_URL}${path}`;
    const response = await axios.get(url);
    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error("Error getting articles: ", error);
    return null;
  }
};

export const getDriverInfo = async (fullName) => {
  let name = fullName;

  if (fullName.includes("Sainz")) {
    name = `${fullName}%20JR`
  }

  try {
    const url = `${THE_SPORTS_DB_PLAYERS_URL}${name}`;
    const response = await axios.get(url);
    const player = response.data.player ? response.data.player[0] : null;

    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching driver info: ", error);
    return null;
  }
};

export const getDriverCutout = async (fullName) => {
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
    console.error("Error fetching driver image: ", error);
    return null;
  }
};

export const getTeamImages = async () => {
  try {
    const response = await axios.get(THE_SPORTS_DB_TEAMS_URL);
    const teams = response.data.teams ? response.data.teams : null;

    return teams;
  } catch (error) {
    console.error("Error fetching team data: ", error)
    return null;
  }
};

export const getIndividualTeamData = async team => {
  try {
    const response = await fetch(`${THE_SPORTS_DB_BASE_URL}/3/searchteams.php?t=${team}`);
    const data = await response.json();
    return data.teams[0];
  } catch (error) {
    console.error("Error fetching data for this team: ", error)
  }
}

export const getCountryFlag = async (country) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const countryData = await response.json();
    const flagUrl = countryData[0].flags.svg;
    return flagUrl;
  } catch (error) {
    console.error(`Error fetching a flag for ${country}: `, error)
  }
};

export const getRaceTrackImage = async (trackName) => {
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(trackName)}&pithumbsize=500&origin=*`);
    const data = await response.json();
    const pages = data.query.pages;
    
    const pageId = Object.keys(pages)[0];
    const trackImage = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;
    return trackImage;
  } catch (error) {
    console.error(`Error fetching image for ${trackName}: `, error);
    return null;
  }
};

export const getOpenAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert on Formula 1." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching OpenAI data:", error);
    throw error;
  }
};