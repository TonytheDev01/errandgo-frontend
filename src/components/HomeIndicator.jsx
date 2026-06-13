import React from "react";
import { View, StyleSheet } from "react-native";

const HomeIndicator = ({ color = "#F5F5F5" }) => (
	<View style={styles.wrap}>
		<View style={[styles.bar, { backgroundColor: color }]} />
	</View>
);

const styles = StyleSheet.create({
	wrap: {
		width: "100%",
		height: 32,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 8,
	},
	bar: {
		width: 212,
		height: 5,
		borderRadius: 100,
	},
});

export default HomeIndicator;
