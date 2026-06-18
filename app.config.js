// app.config.js
export default {
	expo: {
		scheme: "errandgo",
		name: "ErrandGo",
		slug: "errandgo-frontend",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/app-icon1.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/images/Errand-logo.png",
			resizeMode: "contain",
			backgroundColor: "#052E16",
		},
		ios: {
			supportsTablet: false,
			bundleIdentifier: "com.errandgo.app",
			infoPlist: {
				CFBundleURLTypes: [
					{
						CFBundleURLSchemes: ["com.errandgo.app", "errandgo"],
					},
				],
			},
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/app-icon1.png",
				backgroundColor: "#052E16",
			},
			edgeToEdgeEnabled: true,
			package: "com.errandgo.app",
			intentFilters: [
				{
					action: "VIEW",
					autoVerify: true,
					data: [{ scheme: "errandgo" }],
					category: ["BROWSABLE", "DEFAULT"],
				},
			],
		},
		web: {
			favicon: "./assets/images/app-icon1.png",
		},
		plugins: ["expo-font", "expo-web-browser"],
		extra: {
			API_BASE_URL:
				process.env.API_BASE_URL ||
				"https://errand-go-backend.onrender.com/api",
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
			ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID || "",
			IOS_CLIENT_ID: process.env.IOS_CLIENT_ID || "",
			eas: {
				projectId: "83bf84d2-508b-42a8-aa58-c9afe22169d2",
			},
		},
	},
};
