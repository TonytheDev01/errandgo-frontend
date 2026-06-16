import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GOOGLE_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

const useGoogleAuth = ({ onSuccess, onError, onLoading }) => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: GOOGLE_CLIENT_ID,
		androidClientId: ANDROID_CLIENT_ID,
		iosClientId: IOS_CLIENT_ID,
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

			// Uncomment once backend confirms POST /auth/google is ready:
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

			onSuccess?.(authentication.accessToken, null);
		} else if (response.type === "error") {
			onError?.("Google sign-in failed. Please try again.");
		} else if (response.type === "cancel") {
			onError?.("Google sign-in was cancelled.");
		}
	}, [response, onSuccess, onError, onLoading]);

	return {
		handleGoogleSignIn: () => promptAsync(),
		googleAuthReady: !!request,
	};
};

export default useGoogleAuth;
