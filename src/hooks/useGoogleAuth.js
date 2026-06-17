import { useEffect, useState } from "react";

const useGoogleAuth = ({ onSuccess, onError, onLoading }) => {
	const [isAuthInProgress, setIsAuthInProgress] = useState(false);

	// ... guards and useAuthRequest stay the same ...

	useEffect(() => {
		if (!response) return;

		setIsAuthInProgress(false);

		if (response.type === "success") {
			const { authentication } = response;

			if (!authentication?.accessToken) {
				onError?.("Google sign-in failed. No access token received.");
				return;
			}

			onLoading?.(true);
			authService
				.googleLogin({ access_token: authentication.accessToken })
				.then((result) => {
					onLoading?.(false);
					if (result.ok) {
						onSuccess?.(result.data.token, result.data.user);
					} else {
						onError?.(result.data.error || "Google login failed.");
					}
				})
				.catch(() => {
					onLoading?.(false);
					onError?.("Google login failed. Please try again.");
				});
		} else if (response.type === "error") {
			onError?.("Google sign-in failed. Please try again.");
		} else if (response.type === "cancel") {
			onError?.("Google sign-in was cancelled.");
		}
	}, [response, onSuccess, onError, onLoading]);

	return {
		handleGoogleSignIn: () => {
			if (isAuthInProgress) return;
			setIsAuthInProgress(true);
			promptAsync();
		},
		googleAuthReady:
			!!request &&
			!isAuthInProgress &&
			((!!ANDROID_CLIENT_ID && ANDROID_CLIENT_ID !== "PENDING_FROM_BACKEND") ||
				(!!IOS_CLIENT_ID && IOS_CLIENT_ID !== "PENDING_FROM_BACKEND")),
	};
};
