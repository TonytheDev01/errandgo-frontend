/**
 * useGoogleAuth.js
 * Handles Google OAuth flow via expo-auth-session.
 * Backend endpoint: POST /auth/google
 * Expected request body: { access_token: string }
 * Expected response: { token: string, user: object }
 *
 * TO ACTIVATE GOOGLE LOGIN:
 * 1. Get Android Client ID from backend → set ANDROID_CLIENT_ID in .env
 * 2. Get iOS Client ID from backend → set IOS_CLIENT_ID in .env
 * 3. Uncomment the authService.googleLogin block below
 * 4. Confirm backend has POST /auth/google endpoint ready
 */
import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
	GOOGLE_CLIENT_ID, // Web Client ID — used by backend
	ANDROID_CLIENT_ID, // Android Client ID — PENDING FROM BACKEND
	IOS_CLIENT_ID, // iOS Client ID — PENDING FROM BACKEND
} from "@env";

// Required for Android OAuth redirect handling
WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = ({ onSuccess, onError, onLoading }) => {
	// ── Guards — warn if any client ID is missing ──
	if (!ANDROID_CLIENT_ID || ANDROID_CLIENT_ID === "PENDING_FROM_BACKEND") {
		console.warn(
			"[useGoogleAuth] Android Client ID not set. Google OAuth disabled on Android."
		);
	}
	if (!IOS_CLIENT_ID || IOS_CLIENT_ID === "PENDING_FROM_BACKEND") {
		console.warn(
			"[useGoogleAuth] iOS Client ID not set. Google OAuth disabled on iOS."
		);
	}

	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: GOOGLE_CLIENT_ID, // Web Client ID (required by expo-auth-session)
		androidClientId: ANDROID_CLIENT_ID, // ⚠️ PENDING — activate when backend sends
		iosClientId: IOS_CLIENT_ID, // ⚠️ PENDING — activate when backend sends
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
			// Uncomment this block once backend confirms POST /auth/google:
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

			// TEMPORARY — passes token directly until backend /auth/google is ready
			onSuccess?.(authentication.accessToken, null);
		} else if (response.type === "error") {
			onError?.("Google sign-in failed. Please try again.");
		} else if (response.type === "cancel") {
			onError?.("Google sign-in was cancelled.");
		}
	}, [response, onSuccess, onError, onLoading]);

	// ── Button is only active when both Android/iOS client IDs are set ──
	const androidReady =
		!!ANDROID_CLIENT_ID && ANDROID_CLIENT_ID !== "PENDING_FROM_BACKEND";
	const iosReady = !!IOS_CLIENT_ID && IOS_CLIENT_ID !== "PENDING_FROM_BACKEND";

	return {
		handleGoogleSignIn: () => promptAsync(),
		// ⚠️ googleAuthReady stays false until backend sends Android + iOS client IDs
		googleAuthReady: !!request && (androidReady || iosReady),
	};
};

export default useGoogleAuth;
