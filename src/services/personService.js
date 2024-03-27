import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_API_URL;

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

// Function to delete user from phonebook with id
const deleteUser = (id) => {
    return axios.delete(`${baseURL}/${id}`);
};

// Function to edit user
const editUser = (id, updatedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request.then(response => {
        return response.data
    });
}

export default { getAll, create, deleteUser, editUser };