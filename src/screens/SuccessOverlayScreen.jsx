import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeIndicator from "../components/HomeIndicator";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

const SuccessOverlayScreen = ({ navigation }) => {
	const handleGetStarted = () => {
		navigation.replace("Dashboard");
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top"]}>
			<StatusBar style="dark" />

			<View style={styles.screen}>
				<View style={styles.body}>
					<View style={styles.checkCircle}>
						<Image
							source={require("../../assets/images/Success.png")}
							style={styles.checkIcon}
							resizeMode="contain"
						/>
					</View>

					{/* ── Heading ── */}
					<Text style={styles.heading}>Account Verified!</Text>

					<Text style={styles.subtext}>
						Welcome to ErrandGo. Let's get things done for you.
					</Text>

					<View style={styles.btnWrap}>
						<PrimaryButton
							label="Get Started"
							onPress={handleGetStarted}
							variant="green"
							fullWidth
						/>
					</View>
				</View>
			</View>

			<HomeIndicator color={COLORS.primary} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	screen: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	body: {
		alignItems: "center",
		width: "100%",
	},
	checkCircle: {
		width: 100,
		height: 100,
		borderRadius: 52,
		backgroundColor: COLORS.primary,
		borderWidth: 1,
		borderColor: COLORS.white,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 32,
	},
	checkIcon: {
		width: 52,
		height: 52,
	},
	heading: {
		width: 304,
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 32,
		fontWeight: "600",
		lineHeight: 47,
		textAlign: "center",
		marginBottom: 12,
	},
	subtext: {
		width: 349,
		color: COLORS.textMuted,
		textAlign: "center",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 20,
		fontWeight: "400",
		lineHeight: 28,
		marginBottom: 48,
	},
	btnWrap: {
		width: "100%",
	},
});

export default SuccessOverlayScreen;
