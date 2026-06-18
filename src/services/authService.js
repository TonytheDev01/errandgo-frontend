// src/services/authService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONFIG from "@constants/config"; 

const BASE_URL = CONFIG.API_BASE_URL;
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

	const fullURL = `${BASE_URL}${endpoint}`;

	// ✅ Keep for tonight's showcase — remove before production release
	if (__DEV__) {
		console.log("[authService] REQUEST →", fullURL);
		console.log("[authService] BODY →", JSON.stringify(body));
	}

	try {
		const response = await fetch(fullURL, config);
		const data = await response.json();

		if (__DEV__) {
			console.log("[authService] RESPONSE ←", JSON.stringify(data));
		}

		return { ok: response.ok, status: response.status, data };
	} catch (error) {
		console.error("[authService] NETWORK ERROR →", error.message);
		return {
			ok: false,
			status: 0,
			data: { error: "Network error. Please check your connection." },
		};
	}
};

// ── Token storage ──
export const saveToken = (token) => AsyncStorage.setItem(TOKEN_KEY, token);
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const removeToken = () => AsyncStorage.removeItem(TOKEN_KEY);

// ── User storage ──
export const saveUser = (user) =>
	AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = async () => {
	const raw = await AsyncStorage.getItem(USER_KEY);
	return raw ? JSON.parse(raw) : null;
};
export const removeUser = () => AsyncStorage.removeItem(USER_KEY);

// ── Auth endpoints ──
export const register = async ({
	email,
	password,
	mobile_number,
	country,
	city_community,
	gender,
}) => {
	return await request("/register", "POST", {
		email,
		password,
		mobile_number,
		country,
		city_community,
		gender,
	});
};

export const verifyEmail = async ({ email, otp_code }) => {
	return await request("/verify-email", "POST", { email, otp_code });
};

export const resendOTP = async ({ email }) => {
	return await request("/resend-otp", "POST", { email });
};

export const login = async ({ email, password }) => {
	return await request("/login", "POST", { email, password });
};

export const logout = async () => {
	await removeToken();
	await removeUser();
};

export const googleLogin = async ({ access_token }) => {
	return await request("/google-auth", "POST", { access_token });
};

export const isAuthenticated = async () => {
	const token = await getToken();
	return token || null;
};
