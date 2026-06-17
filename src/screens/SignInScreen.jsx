import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeIndicator from "../components/HomeIndicator";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import * as authService from "../services/authService";
import { useAuth } from "../context/AuthContext";
import useGoogleAuth from "../hooks/useGoogleAuth";

const SignInScreen = ({ navigation }) => {
	const { signIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async () => {
		setError("");

		if (!email.trim()) {
			setError("Email is required.");
			return;
		}
		if (!password.trim()) {
			setError("Password is required.");
			return;
		}

		setLoading(true);
		const result = await authService.login({
			email: email.trim().toLowerCase(),
			password,
		});
		setLoading(false);

		if (result.ok) {
			await signIn(result.data.token, result.data.user);
		} else {
			setError(result.data.error || "Login failed. Please try again.");
		}
	};

	const { handleGoogleSignIn, googleAuthReady } = useGoogleAuth({
		onLoading: (val) => setLoading(val),
		onSuccess: async (token, user) => {
			await signIn(token, user);
		},
		onError: (msg) => setError(msg),
	});

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

					<Text style={styles.heading}>Welcome back</Text>
					<Text style={styles.subheading}>
						Log in to request your next errand.
					</Text>

					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Email Address</Text>
						<TextInput
							style={styles.input}
							placeholder="you@example.com"
							placeholderTextColor="#B0B3B8"
							value={email}
							onChangeText={(t) => {
								setEmail(t);
								setError("");
							}}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Password</Text>
						<View style={styles.passwordWrap}>
							<TextInput
								style={styles.passwordInput}
								placeholder="••••••••••••"
								placeholderTextColor="#B0B3B8"
								value={password}
								onChangeText={(t) => {
									setPassword(t);
									setError("");
								}}
								secureTextEntry={!showPassword}
								autoCapitalize="none"
								autoCorrect={false}
							/>
							<TouchableOpacity
								style={styles.eyeBtn}
								onPress={() => setShowPassword((v) => !v)}
								accessibilityLabel={
									showPassword ? "Hide password" : "Show password"
								}>
								<Image
									source={require("../../assets/images/eye-toggle.png")}
									style={styles.eyeIcon}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity
						style={styles.forgotWrap}
						onPress={() => navigation.navigate("ForgotPassword")}>
						<Text style={styles.forgotText}>Forgot password?</Text>
					</TouchableOpacity>

					{error ? <Text style={styles.errorText}>{error}</Text> : null}

					<View style={styles.btnWrap}>
						<PrimaryButton
							label={loading ? "Logging in..." : "Login"}
							onPress={handleLogin}
							variant="green"
							fullWidth
							disabled={loading}
						/>
						{loading && (
							<ActivityIndicator
								style={styles.spinner}
								color={COLORS.primary}
							/>
						)}
					</View>

					<View style={styles.dividerRow}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>or</Text>
						<View style={styles.dividerLine} />
					</View>

					<TouchableOpacity
						style={[styles.googleBtn, !googleAuthReady && { opacity: 0.6 }]}
						onPress={handleGoogleSignIn}
						disabled={!googleAuthReady}
						activeOpacity={0.85}>
						<Image
							source={require("../../assets/images/Google.png")}
							style={styles.googleLogo}
							resizeMode="contain"
						/>
						<Text style={styles.googleText}>Continue with Google</Text>
					</TouchableOpacity>

					<View style={styles.signupRow}>
						<Text style={styles.signupText}>Don't have an account? </Text>
						<TouchableOpacity
							onPress={() => navigation.navigate("SignUp")}
							accessibilityLabel="Sign up">
							<Text style={styles.signupLink}>Sign up</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			<HomeIndicator color={COLORS.primary} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: "#F8FAF5" },
	flex: { flex: 1 },
	scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
	logoRow: { flexDirection: "row", alignItems: "center", marginBottom: 32 },
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
	heading: {
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 32,
		fontWeight: "600",
		lineHeight: 40,
		marginBottom: 8,
	},
	subheading: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 20,
		fontWeight: "400",
		lineHeight: 28,
		marginBottom: 32,
	},
	fieldGroup: { marginBottom: 16 },
	label: {
		color: "rgba(0,0,0,0.60)",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 6,
	},
	input: {
		height: 50,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: COLORS.white,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textDark,
	},
	passwordWrap: {
		flexDirection: "row",
		alignItems: "center",
		height: 50,
		borderRadius: 12,
		backgroundColor: COLORS.white,
		paddingHorizontal: 16,
	},
	passwordInput: {
		flex: 1,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textDark,
	},
	eyeBtn: { padding: 4 },
	eyeIcon: { width: 18, height: 18 },
	forgotWrap: { alignSelf: "flex-end", marginBottom: 24 },
	forgotText: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		lineHeight: 24,
	},
	errorText: {
		color: "#FF384A",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		marginBottom: 12,
		textAlign: "center",
	},
	btnWrap: { marginBottom: 24 },
	spinner: { marginTop: 12 },
	dividerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: COLORS.BORDER,
		marginHorizontal: 8,
	},
	dividerText: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
	},
	googleBtn: {
		flexDirection: "row",
		width: "100%",
		height: 50,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
		backgroundColor: COLORS.white,
		marginBottom: 32,
	},
	googleLogo: { width: 20, height: 20, marginRight: 10 },
	googleText: {
		color: "#334155",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 24,
	},
	signupRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	signupText: {
		color: "#64748B",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		lineHeight: 24,
	},
	signupLink: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		lineHeight: 24,
	},
});

export default SignInScreen;
