import React, { createContext, useContext, useState, useEffect } from "react";
import {
	getToken,
	saveToken,
	removeToken,
	getUser,
	saveUser,
	removeUser,
} from "../services/authService";

// ── DEV BYPASS ────────────────────────────────────────────
// Must match DEV_BYPASS in AppNavigator.js.
// SET TO false BEFORE ANY PRODUCTION COMMIT.
const DEV_BYPASS = true;

const DEV_MOCK_USER = {
	name: "Tunde",
	full_name: "Tunde Adeyemi",
	email: "tunde@errandgo.com",
	avatar: null,
};

const DEV_MOCK_TOKEN = "dev_mock_token_not_for_production";
// ─────────────────────────────────────────────────────────

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(DEV_BYPASS ? DEV_MOCK_TOKEN : null);
	const [user, setUser] = useState(DEV_BYPASS ? DEV_MOCK_USER : null);
	const [loading, setLoading] = useState(!DEV_BYPASS);

	// ── Restore session from AsyncStorage (skipped in DEV_BYPASS) ──
	useEffect(() => {
		if (DEV_BYPASS) return;

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

	// ── Sign in ──
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
