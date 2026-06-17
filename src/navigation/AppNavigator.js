import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
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

const AppNavigator = () => {
	const { token, loading } = useAuth();

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
			{token ? (
				// ── Authenticated stack ──
				<Stack.Screen name="Dashboard" component={DashboardScreen} />
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

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F5F0EB", 
	},
});

export default AppNavigator;
