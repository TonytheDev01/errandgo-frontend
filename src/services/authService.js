import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";
const BASE_URL = API_BASE_URL || "https://errand-go-backend.onrender.com";
const TOKEN_KEY = "errandgo_token";
const USER_KEY = "errandgo_user";

const request = async (
	endpoint,
	method = "POST",
	body = null,
	token = null
) => {
	const headers = { "Content-Type": "application/json" };
	if (token) headers["Authorization"] = `Bearer ${token}`;

	const config = { method, headers };
	if (body) config.body = JSON.stringify(body);

	console.log("REQUEST URL:", `${BASE_URL}${endpoint}`);
	console.log("REQUEST BODY:", JSON.stringify(body));

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, config);
		const data = await response.json();
		return { ok: response.ok, status: response.status, data };
	} catch (error) {
		return {
			ok: false,
			status: 0,
			data: { error: "Network error. Please check your connection." },
		};
	}
};

// ── Token storage
export const saveToken = (token) => AsyncStorage.setItem(TOKEN_KEY, token);
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const removeToken = () => AsyncStorage.removeItem(TOKEN_KEY);

// ── User storage
export const saveUser = (user) =>
	AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = async () => {
	const raw = await AsyncStorage.getItem(USER_KEY);
	return raw ? JSON.parse(raw) : null;
};
export const removeUser = () => AsyncStorage.removeItem(USER_KEY);

// ── AUTH ENDPOINTS

export const register = async ({ email, password, location }) => {
	return await request("/auth/register", "POST", {
		email,
		password,
		location,
	});
};

export const verifyEmail = async ({ email, otp_code }) => {
	return await request("/auth/verify-email", "POST", { email, otp_code });
};

export const resendOTP = async ({ email }) => {
	return await request("/auth/resend-otp", "POST", { email });
};

export const login = async ({ email, password }) => {
	return await request("/auth/login", "POST", { email, password });
};

export const logout = async () => {
	await removeToken();
	await removeUser();
};

export const googleLogin = async ({ access_token }) => {
	return await request("/auth/google", "POST", { access_token });
};

export const isAuthenticated = async () => {
	const token = await getToken();
	return token || null;
};
