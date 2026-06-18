import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeIndicator from "../components/HomeIndicator";
import ErrandGoLogo from "../components/ErrandGoLogo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import CONFIG from "../constants/config";

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		// ✅ Wake up backend on app launch — fire and forget
		// Prevents cold start timeout when user hits register/login
		fetch(`${CONFIG.API_BASE_URL}/health`).catch(() => {});

		const t = setTimeout(() => navigation.replace("Onboarding"), 2500);
		return () => clearTimeout(t);
	}, [navigation]);

	return (
		<SafeAreaView style={styles.screen}>
			<StatusBar theme="light" />
			<View style={styles.body}>
				<ErrandGoLogo size="md" theme="dark" />
				<Text style={styles.tagline}>Your errands, handled.</Text>
			</View>
			<HomeIndicator color={COLORS.homeIndicator} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.splashBg,
		alignItems: "stretch",
	},
	body: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	tagline: {
		color: COLORS.textLight,
		fontFamily: FONTS.gabarito,
		fontSize: 13,
		fontWeight: "700",
		letterSpacing: 0.16,
		textAlign: "right",
	},
});

export default SplashScreen;
