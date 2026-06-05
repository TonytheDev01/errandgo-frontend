import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadToken = async () => {
			const stored = await AsyncStorage.getItem("errandgo_token");
			if (stored) setToken(stored);
			setLoading(false);
		};
		loadToken();
	}, []);

	const signIn = async (jwt, userData) => {
		await AsyncStorage.setItem("errandgo_token", jwt);
		setToken(jwt);
		setUser(userData);
	};

	const signOut = async () => {
		await AsyncStorage.removeItem("errandgo_token");
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ token, user, setUser, signIn, signOut, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
