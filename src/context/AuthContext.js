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

	// ── Restore session from AsyncStorage on app launch ──
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
				console.error("Session restore failed:", error);
			} finally {
				setLoading(false);
			}
		};
		restoreSession();
	}, []);

	// ── Sign in — saves token and full user object ──
	const signIn = async (newToken, userData = null) => {
		await saveToken(newToken);
		if (userData) await saveUser(userData);
		setToken(newToken);
		setUser(userData);
	};

	// ── Sign out ──
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
