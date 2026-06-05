import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "@context/AuthContext";
import { COLORS } from "@constants/colors";
import { TYPOGRAPHY } from "@constants/typography";

export default function SplashScreen({ navigation }) {
	const { token, loading } = useContext(AuthContext);

	useEffect(() => {
		if (loading) return; // wait for AsyncStorage to finish reading

		const timer = setTimeout(() => {
			if (token) {
				navigation.replace("Dashboard"); // returning user — skip onboarding
			} else {
				navigation.replace("Slider"); // new user — start onboarding
			}
		}, 2500);

		return () => clearTimeout(timer);
	}, [loading, token]);

	return (
		<View style={styles.container}>
			<Text style={styles.logo}>ErrandGo</Text>
			<ActivityIndicator
				size="small"
				color={COLORS.BUTTON_GREEN}
				style={styles.spinner}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.PRIMARY_GREEN,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		...TYPOGRAPHY.H1,
		color: COLORS.SURFACE_WHITE,
		letterSpacing: 1,
	},
	spinner: {
		position: "absolute",
		bottom: 60,
	},
});
