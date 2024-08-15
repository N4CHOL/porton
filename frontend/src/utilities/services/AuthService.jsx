import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { React, useEffect } from "react";


const API_URL = "https://gestampapi.aiphag.com/api";
//const API_URL = "http://localhost:3000/api/";

const login = async (username, password, navigate) => {


    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        });

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/"); // Navigate to the desired route upon successful login
            return response.data;
        } else {
            throw new Error("Token not found in response");
        }
    } catch (error) {
        console.error("Login failed:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};




const logout = () => {
    localStorage.removeItem("user");
    window.location.reload()
};


const authService = {
    login,
    logout
};

export default authService;