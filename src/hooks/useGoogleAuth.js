/**
 * useGoogleAuth.js
 * Handles Google OAuth flow via expo-auth-session.
 * Backend endpoint: POST /auth/google
 * Expected request body: { access_token: string }
 * Expected response: { token: string, user: object }
 *
 * TO ACTIVATE: uncomment the authService.googleLogin call
 * once backend adds POST /auth/google endpoint.
 */
import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GOOGLE_CLIENT_ID } from "@env";

// Required for Android OAuth redirect handling
WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = ({ onSuccess, onError, onLoading }) => {
	// Guard — disables button silently if Client ID not yet provided
	if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "PENDING_FROM_BACKEND") {
		console.warn("[useGoogleAuth] Google Client ID not set. OAuth disabled.");
	}

	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: GOOGLE_CLIENT_ID,
		androidClientId: GOOGLE_CLIENT_ID,
		scopes: ["profile", "email"],
	});

	useEffect(() => {
		if (!response) return;

		if (response.type === "success") {
			const { authentication } = response;

			if (!authentication?.accessToken) {
				onError?.("Google sign-in failed. No access token received.");
				return;
			}

			// ── READY TO WIRE ──────────────────────────────────────
			// Uncomment this block once backend adds POST /auth/google:
			//
			// onLoading?.(true);
			// authService.googleLogin({ access_token: authentication.accessToken })
			//   .then((result) => {
			//     onLoading?.(false);
			//     if (result.ok) {
			//       onSuccess?.(result.data.token, result.data.user);
			//     } else {
			//       onError?.(result.data.error || "Google login failed.");
			//     }
			//   });
			// ─────────────────────────────────────────────────────

			// TEMPORARY — passes token directly until backend is ready
			onSuccess?.(authentication.accessToken, null);
		} else if (response.type === "error") {
			onError?.("Google sign-in failed. Please try again.");
		} else if (response.type === "cancel") {
			// ✅ Fix 3 — was empty, user got no feedback and loading could hang
			onError?.("Google sign-in was cancelled.");
		}
	}, [response, onSuccess, onError, onLoading]); // ✅ Fix 4 — full dep array

	return {
		handleGoogleSignIn: () => promptAsync(),
		googleAuthReady:
			!!request &&
			!!GOOGLE_CLIENT_ID &&
			GOOGLE_CLIENT_ID !== "PENDING_FROM_BACKEND",
		// ↑ ✅ bonus — button stays disabled until real Client ID is in .env
	};
};

export default useGoogleAuth;
