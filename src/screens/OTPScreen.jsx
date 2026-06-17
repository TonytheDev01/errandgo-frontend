import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeIndicator from "../components/HomeIndicator";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import * as authService from "../services/authService";

const { width: SW } = Dimensions.get("window");
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const OTPScreen = ({ navigation, route }) => {
	const email = route?.params?.email || "";
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
	const [hasError, setHasError] = useState(false);
	const [apiError, setApiError] = useState("");
	const [seconds, setSeconds] = useState(RESEND_SECONDS);
	const [canResend, setCanResend] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);
	const inputRefs = useRef([]);

	useEffect(() => {
		if (seconds === 0) {
			setCanResend(true);
			return;
		}
		const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
		return () => clearTimeout(timer);
	}, [seconds]);

	const formatTime = (s) => {
		const m = Math.floor(s / 60);
		const sec = s % 60;
		return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
	};

	// ── Handle digit input ──
	const handleChange = (text, index) => {
		const digit = text.replace(/[^0-9]/g, "").slice(-1);
		const newOtp = [...otp];
		newOtp[index] = digit;
		setOtp(newOtp);
		setHasError(false);
		setApiError("");
		if (digit && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// ── Handle backspace ──
	const handleKeyPress = (e, index) => {
		if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleVerify = async () => {
		const code = otp.join("");
		if (code.length < OTP_LENGTH) return;

		setLoading(true);
		setApiError("");

		const result = await authService.verifyEmail({
			email,
			otp_code: code,
		});

		setLoading(false);

		if (result.ok) {
			navigation.replace("SuccessOverlay", {
				token: result.data.token,
				user: { email },
			});
		} else {
			setHasError(true);
			setApiError(result.data.error || "Invalid code. Please try again.");
		}
	};

	const handleResend = async () => {
		if (!canResend) return;

		setResendLoading(true);
		const result = await authService.resendOTP({ email });
		setResendLoading(false);

		if (result.ok) {
			setOtp(Array(OTP_LENGTH).fill(""));
			setHasError(false);
			setApiError("");
			setSeconds(RESEND_SECONDS);
			setCanResend(false);
			inputRefs.current[0]?.focus();
		} else {
			setApiError(result.data.error || "Could not resend code. Try again.");
		}
	};

	const isComplete = otp.every((d) => d !== "");

	return (
		<SafeAreaView style={styles.safeArea} edges={["top"]}>
			<StatusBar style="dark" />

			<View style={styles.screen}>
				{/* ── Back button ── */}
				<TouchableOpacity
					style={styles.backBtn}
					onPress={() => navigation.goBack()}
					accessibilityLabel="Go back">
					<Image
						source={require("../../assets/images/arrow-left.png")}
						style={{ width: 24, height: 24 }}
						resizeMode="contain"
					/>
				</TouchableOpacity>

				{/* ── Heading ── */}
				<Text style={styles.heading}>Verify your email</Text>

				<Text style={styles.subtext}>
					{"We've sent a 6-digit verification\ncode to "}
					<Text style={styles.emailText}>{email}</Text>
				</Text>

				{/* ── OTP inputs ── */}
				<View style={styles.otpRow}>
					{otp.map((digit, i) => (
						<TextInput
							key={i}
							ref={(ref) => (inputRefs.current[i] = ref)}
							style={[
								styles.otpBox,
								hasError && styles.otpBoxError,
								digit && !hasError && styles.otpBoxFilled,
							]}
							value={digit}
							onChangeText={(text) => handleChange(text, i)}
							onKeyPress={(e) => handleKeyPress(e, i)}
							keyboardType="number-pad"
							maxLength={1}
							textAlign="center"
							selectTextOnFocus
							accessibilityLabel={`OTP digit ${i + 1}`}
						/>
					))}
				</View>

				{/* ── Countdown or error ── */}
				<View style={styles.middleSpace}>
					{hasError ? (
						<>
							<Text style={styles.errorText}>
								{apiError ||
									"The 6-digit passcode you've\nentered is incorrect"}
							</Text>
							<View style={styles.errorIconWrap}>
								<Image
									source={require("../../assets/images/error-circle.png")}
									style={{ width: 80, height: 80 }}
									resizeMode="contain"
								/>
							</View>
						</>
					) : (
						<Text style={styles.countdownText}>
							{canResend
								? "You can resend the code now"
								: `Resend code in ${formatTime(seconds)}`}
						</Text>
					)}
				</View>

				{/* ── Resend row ── */}
				<View style={styles.resendRow}>
					<Text style={styles.resendBaseText}>{"Didn't get a code? "}</Text>
					<TouchableOpacity
						onPress={handleResend}
						disabled={!canResend || resendLoading}>
						{resendLoading ? (
							<ActivityIndicator size="small" color={COLORS.primary} />
						) : (
							<Text
								style={[
									styles.resendLink,
									!canResend && styles.resendDisabled,
								]}>
								Resend
							</Text>
						)}
					</TouchableOpacity>
				</View>

				{/* ── Verify button ── */}
				<View style={styles.btnWrap}>
					<PrimaryButton
						label={loading ? "Verifying..." : "Verify"}
						onPress={handleVerify}
						variant="green"
						fullWidth
						disabled={!isComplete || loading}
					/>
					{loading && (
						<ActivityIndicator
							style={{ marginTop: 12 }}
							color={COLORS.primary}
						/>
					)}
				</View>
			</View>

			<HomeIndicator color={COLORS.primary} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F8FAF5",
	},
	screen: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 16,
	},
	backBtn: {
		marginBottom: 24,
		alignSelf: "flex-start",
		padding: 4,
	},
	heading: {
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 32,
		fontWeight: "600",
		marginBottom: 12,
	},
	subtext: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 24,
		lineHeight: 24,
	},
	emailText: {
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 16,
		fontWeight: "600",
	},
	otpRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 16,
	},
	otpBox: {
		width: SW / 6 - 10,
		height: SW / 6 - 10,
		borderRadius: 8,
		borderWidth: 1.5,
		borderColor: "#DFE2E8",
		backgroundColor: COLORS.white,
		fontSize: 24,
		fontFamily: FONTS.poppinsExtraBold,
		fontWeight: "600",
		color: COLORS.textDark,
		textAlign: "center",
	},
	otpBoxFilled: {
		borderColor: COLORS.primary,
	},
	otpBoxError: {
		borderColor: "#FF384A",
		color: "#FF384A",
	},
	middleSpace: {
		flex: 1,
		paddingTop: 12,
	},
	countdownText: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
	},
	errorText: {
		color: "#FF384A",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 24,
		marginBottom: 20,
	},
	errorIconWrap: {
		alignItems: "center",
		marginTop: 20,
	},
	resendRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	resendBaseText: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 24,
	},
	resendLink: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 24,
	},
	resendDisabled: {
		color: "#B0B3B8",
	},
	btnWrap: {
		paddingBottom: 8,
	},
});

export default OTPScreen;
