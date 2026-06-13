import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

const SliderDots = ({ total = 4, current = 0, variant = "green" }) => {
	const activeColor = variant === "orange" ? COLORS.cta : COLORS.primary;
	const inactiveColor =
		variant === "orange" ? COLORS.ctaLight : COLORS.primaryLight;

	return (
		<View
			style={styles.row}
			accessibilityLabel={`Slide ${current + 1} of ${total}`}>
			{Array.from({ length: total }).map((_, i) => (
				<View
					key={i}
					style={[
						styles.dot,
						{
							backgroundColor: i === current ? activeColor : inactiveColor,
							width: i === current ? 24 : 8,
						},
					]}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	row: { flexDirection: "row", alignItems: "center", gap: 6, height: 4 },
	dot: { height: 4, borderRadius: 100 },
});

export default SliderDots;
