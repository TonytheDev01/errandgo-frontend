
import React from "react";
import { Image, StyleSheet } from "react-native";

const logoSource = require("../../assets/images/Errand-logo.png");

const SIZES = {
	sm: { width: 80, height: 18 },
	md: { width: 163, height: 36 },
	lg: { width: 200, height: 44 },
};

const ErrandGoLogo = ({ size = "md" }) => {
	const dimensions = SIZES[size] || SIZES.md;

	return (
		<Image
			source={logoSource}
			style={[styles.logo, dimensions]}
			resizeMode="contain"
			accessibilityLabel="ErrandGo logo"
		/>
	);
};

const styles = StyleSheet.create({
	logo: {
	},
});

export default ErrandGoLogo;
