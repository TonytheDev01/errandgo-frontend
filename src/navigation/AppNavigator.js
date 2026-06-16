import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@context/AuthContext";
import { COLORS } from "@constants/colors";
import SplashScreen from "@screens/SplashScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import SignInScreen from "@screens/SignInScreen";
import SignUpScreen from "@screens/SignUpScreen";
import RegisterScreen from "@screens/RegisterScreen";
import OTPScreen from "@screens/OTPScreen";
import SuccessOverlayScreen from "@screens/SuccessOverlayScreen";
import DashboardScreen from "@screens/DashboardScreen";

const Stack = createNativeStackNavigator();

// ── DEV BYPASS ────────────────────────────────────────────
// Skips auth and loads Dashboard directly for UI testing.
// ⚠️  REMOVE THIS LINE (set to false) when backend is fully ready
const DEV_BYPASS = true;
// ─────────────────────────────────────────────────────────

const AppNavigator = () => {
	const { token, loading } = useAuth();

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#F5F0EB",
				}}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
			{token || DEV_BYPASS ? (
				// ── Authenticated stack ──
				<>
					<Stack.Screen name="Dashboard" component={DashboardScreen} />
					{/* ⚠️  REMOVE THESE TWO SCREENS when backend is fully ready
                        OTP and SuccessOverlay only need to be here during DEV_BYPASS
                        so we can test them without going through auth flow.
                        Once auth is live, they'll be reached naturally from the
                        unauthenticated stack below. */}
					<Stack.Screen name="OTP" component={OTPScreen} />
					<Stack.Screen
						name="SuccessOverlay"
						component={SuccessOverlayScreen}
					/>
				</>
			) : (
				// ── Unauthenticated stack ──
				<>
					<Stack.Screen name="Splash" component={SplashScreen} />
					<Stack.Screen name="Onboarding" component={OnboardingScreen} />
					<Stack.Screen name="SignIn" component={SignInScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
					<Stack.Screen name="OTP" component={OTPScreen} />
					<Stack.Screen
						name="SuccessOverlay"
						component={SuccessOverlayScreen}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default AppNavigator;
