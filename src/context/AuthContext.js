import React, { createContext, useContext, useState, useEffect } from "react";
import {
	getToken,
	saveToken,
	removeToken,
	getUser,
	saveUser,
	removeUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const restoreSession = async () => {
			try {
				const [storedToken, storedUser] = await Promise.all([
					getToken(),
					getUser(),
				]);
				if (storedToken) {
					setToken(storedToken);
					setUser(storedUser);
				}
			} catch (error) {
				// Session restore failed — user will be sent through auth flow
			} finally {
				setLoading(false);
			}
		};

		restoreSession();
	}, []);

	const signIn = async (newToken, userData = null) => {
		await saveToken(newToken);
		if (userData) await saveUser(userData);
		setToken(newToken);
		setUser(userData);
	};

	const signOut = async () => {
		await removeToken();
		await removeUser();
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};

export default AuthContext;
