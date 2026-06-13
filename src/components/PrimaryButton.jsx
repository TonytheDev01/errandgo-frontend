import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

const BG = { green: COLORS.primary, orange: COLORS.cta };

const PrimaryButton = ({
	label = "Next",
	onPress,
	variant = "green",
	disabled = false,
	style,
}) => (
	<TouchableOpacity
		onPress={onPress}
		disabled={disabled}
		activeOpacity={0.85}
		accessibilityRole="button"
		accessibilityLabel={label}
		style={[
			styles.btn,
			{ backgroundColor: BG[variant] || BG.green },
			disabled && styles.disabled,
			style,
		]}>
		<Text style={styles.label}>{label}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	btn: {
		width: "100%",
		height: 48, 
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		color: COLORS.white,
		fontFamily: FONTS.mulishBold,
		fontSize: 18,
		fontWeight: "700",
	},
	disabled: { opacity: 0.5 },
});

export default PrimaryButton;
