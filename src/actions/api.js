// api.js

import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api/';
// const BASE_URL = 'https://spectrum-freckle-scabiosa.glitch.me/api';
// const BASE_URL = 'http://142.93.195.50:8000/api';
const BASE_URL = 'https://tourist-app-backend.onrender.com/api';
const api = axios.create({
  baseURL: BASE_URL,
});

// Function to make a GET request
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    api.get(url, { params })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Function to make a POST request
export const post = (url, data = {}) => {
  console.log(data,url,"post");
  return new Promise((resolve, reject) => {
    api.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
