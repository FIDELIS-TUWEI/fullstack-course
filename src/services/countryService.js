import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries";

// function to get countries
const getCountries = async () => {
    const request = axios.get(`${baseURL}/api/all`);
    return request.then(response => {
        return response.data
    })
};

export default { getCountries };