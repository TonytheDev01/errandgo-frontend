import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
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

const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "South Africa", "Other"];
const GENDERS = ["Male", "Female", "Prefer not to say"];

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [mobile, setMobile] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [gender, setGender] = useState("");
	const [showCountry, setShowCountry] = useState(false);
	const [showGender, setShowGender] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// ── Password strength state ──
	const [passwordStrength, setPasswordStrength] = useState({
		score: 0,
		hasMinLength: false,
		hasUppercase: false,
		hasLowercase: false,
		hasNumber: false,
		hasSpecial: false,
	});

	// ── Password strength checker ──
	const checkPasswordStrength = (pwd) => {
		const checks = {
			hasMinLength: pwd.length >= 8,
			hasUppercase: /[A-Z]/.test(pwd),
			hasLowercase: /[a-z]/.test(pwd),
			hasNumber: /[0-9]/.test(pwd),
			hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
		};
		const score = Object.values(checks).filter(Boolean).length;
		setPasswordStrength({ score, ...checks });
	};

	// ── Strength label + color ──
	const getStrengthLabel = (score) => {
		if (score <= 1) return { label: "Very Weak", color: "#FF384A" };
		if (score <= 2) return { label: "Weak", color: "#FF384A" };
		if (score === 3) return { label: "Fair", color: "#F97300" };
		if (score === 4) return { label: "Strong", color: "#16A34A" };
		return { label: "Very Strong", color: "#16A34A" };
	};

	const getBarColor = (level, score) => {
		if (score < level) return "#E5E7EB";
		if (score <= 2) return "#FF384A";
		if (score === 3) return "#F97300";
		return "#16A34A";
	};

	const handleCreateAccount = async () => {
		setError("");

		if (!email.trim()) {
			setError("Email is required.");
			return;
		}
		if (!password.trim()) {
			setError("Password is required.");
			return;
		}
		if (password.length < 8) {
			setError("Password must be at least 8 characters.");
			return;
		}
		if (!country) {
			setError("Please select your country.");
			return;
		}

		const location = city.trim() ? `${city.trim()}, ${country}` : country;

		setLoading(true);
		const result = await authService.register({
			email: email.trim().toLowerCase(),
			password,
			location,
		});
		setLoading(false);

		if (result.ok) {
			navigation.navigate("OTP", { email: email.trim().toLowerCase() });
		} else {
			setError(result.data.error || "Registration failed. Please try again.");
		}
	};

	const DropdownField = ({
		label,
		value,
		placeholder,
		open,
		onToggle,
		options,
		onSelect,
	}) => (
		<View style={styles.fieldGroup}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={styles.dropdownBtn}
				onPress={onToggle}
				activeOpacity={0.8}>
				<Text
					style={[styles.dropdownValue, !value && styles.dropdownPlaceholder]}>
					{value || placeholder}
				</Text>
				<Image
					source={require("../../assets/images/Drop-down.png")}
					style={[styles.dropdownArrowIcon, open && styles.dropdownArrowOpen]}
					resizeMode="contain"
				/>
			</TouchableOpacity>
			{open && (
				<View style={styles.dropdownList}>
					{options.map((opt) => (
						<TouchableOpacity
							key={opt}
							style={styles.dropdownItem}
							onPress={() => {
								onSelect(opt);
								onToggle();
							}}>
							<Text style={styles.dropdownItemText}>{opt}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);

	const { label: strengthLabel, color: strengthColor } = getStrengthLabel(
		passwordStrength.score
	);

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
					{/* ── Logo row ── */}
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
					<Text style={styles.heading}>Create your account</Text>
					<Text style={styles.subheading}>
						Set up your profile so runners can reach you for errands.
					</Text>

					{/* ── Email ── */}
					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder="lilshondy2@gmail.com"
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

					{/* ── Password ── */}
					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Password</Text>
						<View style={styles.passwordWrap}>
							<TextInput
								style={styles.passwordInput}
								placeholder="password"
								placeholderTextColor="#B0B3B8"
								value={password}
								onChangeText={(t) => {
									setPassword(t);
									setError("");
									checkPasswordStrength(t);
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

						{/* ── Password strength indicator ── */}
						{password.length > 0 && (
							<View style={styles.strengthWrap}>
								{/* Strength bars */}
								<View style={styles.strengthBarRow}>
									{[1, 2, 3, 4, 5].map((level) => (
										<View
											key={level}
											style={[
												styles.strengthBar,
												{
													backgroundColor: getBarColor(
														level,
														passwordStrength.score
													),
												},
											]}
										/>
									))}
								</View>

								{/* Strength label */}
								<Text style={[styles.strengthLabel, { color: strengthColor }]}>
									{strengthLabel}
								</Text>

								{/* Checklist */}
								<View style={styles.checkList}>
									{[
										{ key: "hasMinLength", label: "At least 8 characters" },
										{
											key: "hasUppercase",
											label: "One uppercase letter (A-Z)",
										},
										{
											key: "hasLowercase",
											label: "One lowercase letter (a-z)",
										},
										{ key: "hasNumber", label: "One number (0-9)" },
										{
											key: "hasSpecial",
											label: "One special character (!@#$...)",
										},
									].map((rule) => (
										<View key={rule.key} style={styles.checkRow}>
											<Text
												style={[
													styles.checkDot,
													{
														color: passwordStrength[rule.key]
															? "#16A34A"
															: "#9CA3AF",
													},
												]}>
												{passwordStrength[rule.key] ? "✓" : "○"}
											</Text>
											<Text
												style={[
													styles.checkText,
													{
														color: passwordStrength[rule.key]
															? "#16A34A"
															: "#9CA3AF",
													},
												]}>
												{rule.label}
											</Text>
										</View>
									))}
								</View>
							</View>
						)}
					</View>

					{/* ── Mobile number ── */}
					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Mobile Number</Text>
						<View style={styles.mobileWrap}>
							<View style={styles.dialCode}>
								<Text style={styles.dialText}>+233</Text>
							</View>
							<TextInput
								style={styles.mobileInput}
								placeholder="012-345-6789"
								placeholderTextColor="#B0B3B8"
								value={mobile}
								onChangeText={setMobile}
								keyboardType="phone-pad"
							/>
						</View>
					</View>

					{/* ── Country dropdown ── */}
					<DropdownField
						label="Country"
						value={country}
						placeholder="Select Country"
						open={showCountry}
						onToggle={() => {
							setShowCountry((v) => !v);
							setShowGender(false);
						}}
						options={COUNTRIES}
						onSelect={(val) => {
							setCountry(val);
							setError("");
						}}
					/>

					{/* ── City/Community ── */}
					<View style={styles.fieldGroup}>
						<Text style={styles.label}>City/Community</Text>
						<TextInput
							style={[styles.input, !country && styles.inputDisabled]}
							placeholder={country ? "Enter your city" : "Select Country First"}
							placeholderTextColor="#B0B3B8"
							value={city}
							onChangeText={setCity}
							editable={!!country}
						/>
					</View>

					{/* ── Gender dropdown ── */}
					<DropdownField
						label="Gender"
						value={gender}
						placeholder="Select Gender"
						open={showGender}
						onToggle={() => {
							setShowGender((v) => !v);
							setShowCountry(false);
						}}
						options={GENDERS}
						onSelect={setGender}
					/>

					{/* ── API error message ── */}
					{error ? <Text style={styles.errorText}>{error}</Text> : null}

					{/* ── Create account button ── */}
					<View style={styles.btnWrap}>
						<PrimaryButton
							label={loading ? "Creating account..." : "Create account"}
							onPress={handleCreateAccount}
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
		paddingBottom: 32,
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

	// ── Form fields ──
	fieldGroup: {
		marginBottom: 16,
	},
	label: {
		color: "rgba(0,0,0,0.60)",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
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
	inputDisabled: {
		opacity: 0.5,
	},

	// ── Password ──
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

	// ── Password strength ──
	strengthWrap: {
		marginTop: 10,
	},
	strengthBarRow: {
		flexDirection: "row",
		marginBottom: 6,
	},
	strengthBar: {
		flex: 1,
		height: 4,
		borderRadius: 100,
		marginHorizontal: 2,
	},
	strengthLabel: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 12,
		fontWeight: "600",
		marginBottom: 8,
	},
	checkList: {
		marginTop: 4,
	},
	checkRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	checkDot: {
		fontSize: 12,
		fontWeight: "700",
		marginRight: 6,
		width: 14,
	},
	checkText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 12,
	},

	// ── Mobile ──
	mobileWrap: {
		flexDirection: "row",
		height: 50,
		borderRadius: 12,
		backgroundColor: COLORS.white,
		overflow: "hidden",
	},
	dialCode: {
		paddingHorizontal: 12,
		justifyContent: "center",
		borderRightWidth: 1,
		borderRightColor: COLORS.BORDER,
	},
	dialText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textDark,
	},
	mobileInput: {
		flex: 1,
		paddingHorizontal: 12,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textDark,
	},

	// ── Dropdown ──
	dropdownBtn: {
		height: 50,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: COLORS.white,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	dropdownValue: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textDark,
	},
	dropdownPlaceholder: {
		color: "#B0B3B8",
	},
	dropdownArrowIcon: {
		width: 8,
		height: 13,
	},
	dropdownArrowOpen: {
		transform: [{ rotate: "90deg" }],
	},
	dropdownList: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		marginTop: 4,
		borderWidth: 1,
		borderColor: COLORS.BORDER,
		overflow: "hidden",
	},
	dropdownItem: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.BORDER,
	},
	dropdownItemText: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		color: COLORS.textDark,
	},

	// ── Error ──
	errorText: {
		color: "#FF384A",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 14,
		marginBottom: 12,
		textAlign: "center",
	},

	// ── Button ──
	btnWrap: {
		marginTop: 8,
	},
	spinner: {
		marginTop: 12,
	},
});

export default RegisterScreen;
