import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Svg, Rect, Path } from "react-native-svg";
import { FONTS } from "../constants/typography";

const SignalIcon = ({ color = "#fff" }) => (
	<Svg width={17} height={12} viewBox="0 0 17 12" fill="none">
		<Rect x="0" y="7" width="3" height="5" rx="0.5" fill={color} />
		<Rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill={color} />
		<Rect x="9" y="2" width="3" height="10" rx="0.5" fill={color} />
		<Rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={color} />
	</Svg>
);

const WifiIcon = ({ color = "#fff" }) => (
	<Svg width={16} height={12} viewBox="0 0 16 12" fill="none">
		<Path
			d="M8 9.5C8.828 9.5 9.5 10.172 9.5 11S8.828 12.5 8 12.5 6.5 11.828 6.5 11 7.172 9.5 8 9.5Z"
			fill={color}
		/>
		<Path
			d="M8 6.5C9.72 6.5 11.27 7.22 12.38 8.38L13.79 6.97C12.32 5.46 10.27 4.5 8 4.5S3.68 5.46 2.21 6.97L3.62 8.38C4.73 7.22 6.28 6.5 8 6.5Z"
			fill={color}
		/>
		<Path
			d="M8 3.5C10.63 3.5 13.01 4.55 14.74 6.29L16.15 4.88C14.05 2.75 11.18 1.5 8 1.5S1.95 2.75-.15 4.88L1.26 6.29C2.99 4.55 5.37 3.5 8 3.5Z"
			fill={color}
		/>
	</Svg>
);

const BatteryIcon = ({ color = "#fff" }) => (
	<Svg width={25} height={12} viewBox="0 0 25 12" fill="none">
		<Rect
			x="0.5"
			y="0.5"
			width="21"
			height="11"
			rx="2.5"
			stroke={color}
			strokeOpacity={0.35}
		/>
		<Rect x="2" y="2" width="16" height="8" rx="1.5" fill={color} />
		<Path
			d="M23 4V8C23.83 7.67 24.5 6.88 24.5 6S23.83 4.33 23 4Z"
			fill={color}
			fillOpacity={0.4}
		/>
	</Svg>
);

const StatusBar = ({ theme = "dark" }) => {
	const iconColor = theme === "light" ? "#1a1a1a" : "#ffffff";
	return (
		<>
			<ExpoStatusBar style={theme === "light" ? "dark" : "light"} />
			<View style={styles.container} accessibilityRole="header">
				<Text style={[styles.time, { color: iconColor }]}>9:41</Text>
				<View style={styles.icons}>
					<SignalIcon color={iconColor} />
					<WifiIcon color={iconColor} />
					<BatteryIcon color={iconColor} />
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 44,
		paddingHorizontal: 22,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	time: {
		fontFamily: FONTS.gabarito,
		fontSize: 15,
		fontWeight: "700",
		letterSpacing: 0.16,
	},
	icons: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
});

export default StatusBar;
