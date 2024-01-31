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
}

export default { getCountries, getCountryByName };