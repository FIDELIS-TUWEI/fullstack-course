import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries";

// function to get countries
const getCountries = async () => {
    const res = await axios.get(`${baseURL}/api/all`);
    return res.data
};

// Function to get country by name
const getCountryByName = async (name) => {
    const res = await axios.get(`${baseURL}/api/name/${name}`);
    return res.data;
};

// Function to get weather data
const getWeatherData = async (lat, lon, part, city) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
            params: {
              lat: lat,
              lon: lon,
              exclude: part,
              appid: import.meta.env.REACT_APP_OPENWEATHERMAP_API_KEY,
            },
          });

          return response.data;
    } catch (error) {
        console.error(`Failed to fetch weather data for ${city}:`, error);
    }
}

export default { getCountries, getCountryByName, getWeatherData };