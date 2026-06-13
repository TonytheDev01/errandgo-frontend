import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import StatusBar from "../components/StatusBar";
import HomeIndicator from "../components/HomeIndicator";
import ErrandGoLogo from "../components/ErrandGoLogo";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY, FONTS } from "../constants/typography";

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		const t = setTimeout(() => navigation.replace("Onboarding"), 2500);
		return () => clearTimeout(t);
	}, [navigation]);

	return (
		<View style={styles.screen}>
			<StatusBar theme="dark" />
			<View style={styles.body}>
				<ErrandGoLogo size="md" theme="dark" />
				<Text style={styles.tagline}>Your errands, handled.</Text>
			</View>
			<HomeIndicator color={COLORS.homeIndicator} />
		</View>
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
