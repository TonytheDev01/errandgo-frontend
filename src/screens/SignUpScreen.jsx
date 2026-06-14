import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator, // ✅ Added — needed for loading spinner
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeIndicator from "../components/HomeIndicator";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useAuth } from "../context/AuthContext";

const SignUpScreen = ({ navigation }) => {
	const { signIn } = useAuth();
	const [agreed, setAgreed] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const { handleGoogleSignIn, googleAuthReady } = useGoogleAuth({
		onLoading: (val) => setLoading(val),
		onSuccess: async (token, user) => {
			await signIn(token, user);
		},
		onError: (msg) => setError(msg),
	});

	// ✅ Added — blocks Google sign-in if terms not agreed
	const handleGooglePress = () => {
		if (!agreed) {
			setError("Please agree to the Terms of Service and Privacy Policy.");
			return;
		}
		handleGoogleSignIn();
	};

	// ✅ Added — blocks email sign-up if terms not agreed
	const handleEmailPress = () => {
		if (!agreed) {
			setError("Please agree to the Terms of Service and Privacy Policy.");
			return;
		}
		navigation.navigate("Register");
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top"]}>
			<StatusBar style="dark" />
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<ScrollView
					style={styles.flex}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}>
					{/* ── Logo ── */}
					<View style={styles.logoRow}>
						<View style={styles.iconBg}>
							<Image
								source={require("../../assets/images/app-icon1.png")}
								style={styles.iconImage}
								resizeMode="contain"
							/>
						</View>
						<Image
							source={require("../../assets/images/errandgo-text.png")}
							style={styles.wordmark}
							resizeMode="contain"
						/>
					</View>

					{/* ── Heading ── */}
					<Text style={styles.heading}>{"Get your errands\ndone"}</Text>
					<Text style={styles.subheading}>
						Sign up and let trusted runners handle your tasks and deliveries.
					</Text>

					{/* ── Terms checkbox — moved above buttons so user agrees first ── */}
					<TouchableOpacity
						style={styles.termsRow}
						onPress={() => {
							setAgreed((v) => !v);
							setError(""); // ✅ clears error when they tap checkbox
						}}
						activeOpacity={0.8}
						accessibilityLabel="Agree to terms">
						<View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
							{agreed && <Text style={styles.checkmark}>✓</Text>}
						</View>
						<Text style={styles.termsText}>
							{"By creating an account, you agree to our\n"}
							<Text style={styles.termsLink}>Terms of Service</Text>
							{" and "}
							<Text style={styles.termsLink}>Privacy Policy</Text>
						</Text>
					</TouchableOpacity>

					{/* ── Error message ── */}
					{error ? <Text style={styles.errorText}>{error}</Text> : null}

					{/* ── Sign up with email ── */}
					<View style={styles.btnWrap}>
						<PrimaryButton
							label="Sign up with email"
							onPress={handleEmailPress}
							variant="green"
							fullWidth
							// ✅ Dims button visually when terms not agreed
							style={!agreed && { opacity: 0.6 }}
						/>
					</View>

					{/* ── Divider ── */}
					<View style={styles.dividerRow}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>or</Text>
						<View style={styles.dividerLine} />
					</View>

					{/* ── Continue with Google ── */}
					<TouchableOpacity
						style={[
							styles.googleBtn,
							// ✅ Dims when not ready OR terms not agreed
							(!googleAuthReady || !agreed) && { opacity: 0.6 },
						]}
						onPress={handleGooglePress}
						disabled={!googleAuthReady}
						activeOpacity={0.85}>
						<Image
							source={require("../../assets/images/Google.png")}
							style={styles.googleLogo}
							resizeMode="contain"
						/>
						<Text style={styles.googleText}>Continue with Google</Text>
					</TouchableOpacity>

					{/* ✅ Loading spinner — shows during Google auth flow */}
					{loading && (
						<ActivityIndicator style={styles.spinner} color={COLORS.primary} />
					)}

					{/* ── Log in link ── */}
					<View style={styles.loginRow}>
						<Text style={styles.loginText}>Have an account? </Text>
						<TouchableOpacity
							onPress={() => navigation.navigate("SignIn")}
							accessibilityLabel="Log in">
							<Text style={styles.loginLink}>Log in</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			<HomeIndicator color={COLORS.primary} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F8FAF5",
	},
	flex: { flex: 1 },
	scrollContent: {
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 16,
	},

	// ── Logo ──
	logoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
	},
	iconBg: {
		width: 50,
		height: 50,
		borderRadius: 10.8,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
	},
	iconImage: { width: 30, height: 30 },
	wordmark: { width: 125, height: 36 },

	// ── Headings ──
	heading: {
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 32,
		fontWeight: "600",
		lineHeight: 40,
		width: 289,
		marginBottom: 10,
	},
	subheading: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 20,
		fontWeight: "400",
		lineHeight: 28,
		width: 349,
		marginBottom: 32,
	},

	// ── Button ──
	btnWrap: { marginBottom: 25 },

	// ── Divider ──
	dividerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: COLORS.BORDER,
		marginHorizontal: 10,
	},
	dividerText: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
	},

	// ── Google ──
	googleBtn: {
		flexDirection: "row",
		width: "100%",
		height: 50,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
		backgroundColor: COLORS.white,
		marginBottom: 24,
	},
	googleLogo: { width: 20, height: 20, marginRight: 10 },
	googleText: {
		color: "#334155",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 24,
	},

	// ── Spinner ──
	spinner: { marginBottom: 16 },

	// ── Error ──
	errorText: {
		color: "#FF384A",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		marginBottom: 12,
		textAlign: "center",
	},

	// ── Terms ──
	termsRow: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingLeft: 20,
		marginRight: 10,
		marginBottom: 20, // ✅ reduced from 32 — error message adds spacing naturally
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#CBD5E1",
		marginRight: 8,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 2,
		flexShrink: 0,
	},
	checkboxChecked: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},
	checkmark: {
		color: COLORS.white,
		fontSize: 12,
		fontWeight: "700",
	},
	termsText: {
		flex: 1,
		color: "#64748B",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		fontWeight: "400",
		lineHeight: 22.75,
	},
	termsLink: {
		color: COLORS.primary,
		lineHeight: 22.75,
	},

	// ── Log in link ──
	loginRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loginText: {
		color: "#64748B",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 24,
	},
	loginLink: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 24,
	},
});

export default SignUpScreen;
