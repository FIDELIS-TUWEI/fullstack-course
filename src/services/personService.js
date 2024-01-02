import axios from "axios";
const baseURL = "http://localhost:3001/persons";

// function to get all persons from json-server
const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => {
        return response.data
    });
};

// function to add names and numbers to phonebook
const create = (newObject) => {
    return axios.post(baseURL, newObject);
};

export default { getAll, create };