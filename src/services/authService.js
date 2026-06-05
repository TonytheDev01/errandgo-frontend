import axios from "axios";

const API = axios.create({
	baseURL: process.env.API_BASE_URL || "http://localhost:5000",
	headers: { "Content-Type": "application/json" },
});

export const registerUser = (email, password, location_tag) =>
	API.post("/auth/register", { email, password, location_tag });

export const loginUser = (email, password) =>
	API.post("/auth/login", { email, password });

export const googleAuth = (id_token, location_tag) =>
	API.post("/auth/google", { id_token, location_tag });
