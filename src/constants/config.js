
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};

const CONFIG = {
	API_BASE_URL:
		extra.API_BASE_URL || "https://errand-go-backend.onrender.com/api",

	GOOGLE_CLIENT_ID: extra.GOOGLE_CLIENT_ID || "",
	ANDROID_CLIENT_ID: extra.ANDROID_CLIENT_ID || "",
	IOS_CLIENT_ID: extra.IOS_CLIENT_ID || "",
};

export default CONFIG;
