import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeIndicator from "../components/HomeIndicator";
import PrimaryButton from "../components/PrimaryButton";
import SliderDots from "../components/SliderDots";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width: SW } = Dimensions.get("window");

const SLIDES = [
	{
		id: "s1",
		image: require("../../assets/images/Register.png"),
		imageAlt: "Woman requesting an errand",
		headingLine1: "Request any",
		headingLine2: "Errand.",
		accentColor: COLORS.primary,
		description:
			"From market shopping to quick pick-ups, our runners have you covered.",
		btnLabel: "Next",
		btnVariant: "green",
	},
	{
		id: "s2",
		image: require("../../assets/images/Shop-for-item.png"),
		imageAlt: "Woman shopping for groceries",
		headingLine1: "Shop for",
		headingLine2: "Items Easily",
		accentColor: COLORS.cta,
		description:
			"Have hours of your day while trusted locals handle the running around.",
		btnLabel: "Next",
		btnVariant: "orange",
	},
	{
		id: "s3",
		image: require("../../assets/images/Map.png"),
		imageAlt: "Map showing delivery route",
		headingLine1: "Send",
		headingLine2: "Deliveries",
		accentColor: COLORS.primary,
		description:
			"Get your item picked up and delivered without leaving your seat.",
		btnLabel: "Next",
		btnVariant: "green",
	},
	{
		id: "s4",
		image: require("../../assets/images/Track-order.png"),
		imageAlt: "Man tracking errand on phone",
		headingLine1: "Track Your",
		headingLine2: "Errands",
		accentColor: COLORS.cta,
		description: "Real-time progress every single step of the way.",
		btnLabel: "Let's Go",
		btnVariant: "orange",
	},
];

const OnboardingScreen = ({ navigation }) => {
	const [index, setIndex] = useState(0);
	const slide = SLIDES[index];
	const isFirst = index === 0;
	const isLast = index === SLIDES.length - 1;

	const handleNext = useCallback(() => {
		if (!isLast) setIndex((i) => i + 1);
		else navigation.replace("SignIn");
	}, [isLast, navigation]);

	// Goes back one slide — if on slide 1, goes back to Splash
	const handleBack = useCallback(() => {
		if (!isFirst) setIndex((i) => i - 1);
		else navigation.goBack();
	}, [isFirst, navigation]);

	const handleSkip = useCallback(() => {
		navigation.replace("SignIn");
	}, [navigation]);

	return (
		<SafeAreaView style={styles.safeArea} edges={["top"]}>
			<StatusBar style="dark" />
			<View style={styles.screen}>
				<View style={styles.topRow}>
					<TouchableOpacity
						style={styles.backBtn}
						onPress={handleBack}
						accessibilityLabel="Go back">
						<Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
					</TouchableOpacity>
					{!isLast && (
						<TouchableOpacity
							style={styles.skipBtn}
							onPress={handleSkip}
							accessibilityLabel="Skip onboarding">
							<Text style={styles.skipText}>Skip</Text>
						</TouchableOpacity>
					)}
				</View>

				{/* Hero image */}
				<View style={styles.imageWrap}>
					{slide.image ? (
						<Image
							source={slide.image}
							style={styles.image}
							accessibilityLabel={slide.imageAlt}
							resizeMode="cover"
						/>
					) : (
						<View style={styles.imagePlaceholder} />
					)}
				</View>

				{/* Content */}
				<View style={styles.content}>
					<Text style={styles.heading}>
						<Text style={styles.headingBlack}>
							{slide.headingLine1}
							{"\n"}
						</Text>
						<Text style={[styles.headingAccent, { color: slide.accentColor }]}>
							{slide.headingLine2}
						</Text>
					</Text>

					<Text style={styles.description}>{slide.description}</Text>

					<SliderDots
						total={SLIDES.length}
						current={index}
						variant={slide.btnVariant}
					/>

					<View style={styles.btnWrap}>
						<PrimaryButton
							label={slide.btnLabel}
							onPress={handleNext}
							variant={slide.btnVariant}
						/>
					</View>
				</View>

				<HomeIndicator color="#1a1a1a" />
			</View>
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
	},
	topRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 8,
	},
	backBtn: {
		padding: 8,
	},
	backArrow: {
		fontSize: 20,
		color: COLORS.textDark,
	},
	skipBtn: {
		padding: 8,
	},
	skipText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textMuted,
	},
	imageWrap: {
		width: SW,
		height: SW * 1.115,
		maxHeight: 435,
		backgroundColor: "#f0f0f0",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imagePlaceholder: {
		flex: 1,
		backgroundColor: "#e8e8e8",
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		gap: 12,
	},
	heading: {
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 32,
		lineHeight: 38,
	},
	headingBlack: {
		color: COLORS.textDark,
		fontFamily: FONTS.poppinsExtraBold,
		fontWeight: "800",
	},
	headingAccent: {
		fontFamily: FONTS.poppinsExtraBold,
		fontWeight: "800",
	},
	description: {
		width: 234,
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 12,
		fontWeight: "500",
		lineHeight: 18,
	},
	btnWrap: {
		marginTop: "auto",
		paddingBottom: 8,
	},
});

export default OnboardingScreen;
