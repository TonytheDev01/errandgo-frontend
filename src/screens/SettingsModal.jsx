
import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Pressable,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

// ── Settings menu items ──
const SETTINGS_ITEMS = [
	{
		key: "edit-profile",
		label: "Edit Profile",
		icon: require("../../assets/images/edit-pencil.png"), 
	},
	{
		key: "saved-locations",
		label: "Saved Locations",
		icon: require("../../assets/images/save-location.png"), 
	},
	{
		key: "payment-methods",
		label: "Payment Methods",
		icon: require("../../assets/images/payment-method.png"), 
	},
	{
		key: "notification-preferences",
		label: "Notification Preferences",
		icon: require("../../assets/images/not-prefer.png"), 
	},
	{
		key: "security-password",
		label: "Security & Password",
		icon: require("../../assets/images/security.png"), 
	},
	{
		key: "help-support",
		label: "Help & Support",
		icon: require("../../assets/images/help.png"), 
	},
];

const SettingsModal = ({ visible, onClose, navigation }) => {
	const { user, signOut } = useAuth();

	const handleMenuPress = (key) => {
		onClose();
		switch (key) {
			case "edit-profile":
				break;
			case "saved-locations":
				break;
			case "payment-methods":
				break;
			case "notification-preferences":
				break;
			case "security-password":
				break;
			case "help-support":
				break;
			default:
				break;
		}
	};

	const handleLogout = async () => {
		onClose();
		await signOut();
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}>
			{/* ── Backdrop ── */}
			<Pressable style={styles.backdrop} onPress={onClose} />

			{/* ── Modal sheet ── */}
			<View style={styles.sheet}>
				<View style={styles.dragHandle} />

				{/* ── Container 1: User profile row ── */}
				<View style={styles.profileRow}>
					{user?.avatar ? (
						<Image
							source={{ uri: user.avatar }}
							style={styles.avatar}
							resizeMode="cover"
						/>
					) : (
						<View style={styles.avatarPlaceholder}>
							<Image
								source={require("../../assets/images/edit-profile.png")}
								style={styles.avatarPlaceholderIcon}
								resizeMode="cover"
							/>
						</View>
					)}

					{/* Name + email */}
					<View style={styles.profileInfo}>
						<Text style={styles.profileName}>
							{user?.full_name || user?.name || "Tunde Adeyemi"}
						</Text>
						<Text style={styles.profileEmail}>
							{user?.email || "tunde@example.com"}
						</Text>
					</View>
				</View>

				{/* ── Container 2: Menu items ── */}
				<View style={styles.menuContainer}>
					{SETTINGS_ITEMS.map((item) => (
						<TouchableOpacity
							key={item.key}
							style={styles.menuItem}
							onPress={() => handleMenuPress(item.key)}
							activeOpacity={0.7}>
							{/* Left icon */}
							<Image
								source={item.icon}
								style={styles.menuIcon}
								resizeMode="contain"
							/>

							{/* Label */}
							<Text style={styles.menuLabel}>{item.label}</Text>

							<Image
								source={require("../../assets/images/arrow-rightt.png")}
								style={styles.arrowIcon}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					))}

					{/* ── Log Out ── */}
					<TouchableOpacity
						style={styles.menuItem}
						onPress={handleLogout}
						activeOpacity={0.7}>
						<Image
							source={require("../../assets/images/log-out.png")}
							style={styles.menuIcon}
							resizeMode="contain"
						/>
						<Text style={styles.logoutLabel}>Log Out</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	// ── Backdrop ──
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
	},

	// ── Sheet ──
	sheet: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 560,
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		flexDirection: "column",
		alignItems: "flex-start",
	},

	// ── Drag handle ──
	dragHandle: {
		width: 40,
		height: 4,
		borderRadius: 100,
		backgroundColor: "#E5E7EB",
		alignSelf: "center",
		marginTop: 10,
		marginBottom: 8,
	},

	// ── Container 1: Profile ──
	profileRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 0.8,
		borderBottomColor: "#F3F4F6",
		alignSelf: "stretch",
		gap: 12,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	avatarPlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	avatarPlaceholderIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	profileInfo: {
		flex: 1,
	},
	profileName: {
		color: "#111827",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 15,
		fontWeight: "600",
		lineHeight: 22,
	},
	profileEmail: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 13,
		fontWeight: "400",
		lineHeight: 19,
		marginTop: 2,
	},

	// ── Container 2: Menu ──
	menuContainer: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 8,
		alignSelf: "stretch",
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 14,
		borderRadius: 14,
		gap: 12,
	},
	menuIcon: {
		width: 22,
		height: 22,
	},
	menuLabel: {
		flex: 1,
		color: "#111827",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 22,
	},
	arrowIcon: {
		width: 16,
		height: 16,
		tintColor: "#9CA3AF",
	},
	logoutLabel: {
		flex: 1,
		color: "#EF4444",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 15,
		fontWeight: "600",
		lineHeight: 22,
	},
});

export default SettingsModal;
