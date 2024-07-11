import axios from "axios";
import authService from "./AuthService";
// eslint-disable-next-line no-unused-vars
import { React, useEffect } from "react";


const API_URL = "https://agroimperioapi.aiphag.com/api";
//const API_URL = "http://localhost:3000/api/";




const get = async (endpoint) => {
  const userString = localStorage.getItem("user") ? localStorage.getItem("user") : "{}";
  const user = JSON.parse(userString);
  const AUTH_TOKEN = user.token

  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,

      }
    });
    return response.data;
  } catch (error) {
    console.error("GET failed:", error);
    if (error.response.status === 403){
      authService.logout()
    }

    throw error; // Rethrow the error to be handled by the caller
  }
};


const post = async (endpoint, postData) => {
  const userString = localStorage.getItem("user") || "{}";
  const user = JSON.parse(userString);
  const AUTH_TOKEN = user.token;

  if (!AUTH_TOKEN) {
    console.error("No authentication token found. Please log in.");
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.post(`${API_URL}${endpoint}`, postData, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("POST failed with response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("POST failed: No response received", error.request);
    } else {
      // Something else happened
      console.error("POST failed:", error.message);
    }

    throw error; // Rethrow the error to be handled by the caller
  }
};



const apiService = {
  get,post
};

export default apiService;