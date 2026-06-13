import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Pressable,
	FlatList,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

// ── Mock notifications — replace with API data once backend adds endpoint ──
const INITIAL_NOTIFICATIONS = [
	{
		id: "1",
		title: "Your grocery run is in progress",
		body: "Your delivery is on the way. Track it live.",
		time: "Just now",
		unread: true,
		iconBg: "#F0FDF4",
	},
	{
		id: "2",
		title: "Grocery run complete",
		body: "Your order was delivered.",
		time: "1 hour ago",
		unread: true,
		iconBg: "#F0FDF4",
	},
	{
		id: "3",
		title: "New runner near you",
		body: "A runner is available in your area.",
		icon: require("../../assets/images/notification-bell.png"),

		time: "3 hours ago",
		unread: false,
		iconBg: "#F0FDF4",
	},
	{
		id: "4",
		title: "Rate your errand",
		body: "Did we do a good delivery yesterday?",
		time: "Yesterday",
		unread: false,
		iconBg: "#FFFBEB",
	},
];

const NotificationsModal = ({ visible, onClose }) => {
	const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

	const handleMarkAllRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
	};

	const handleMarkOneRead = (id) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
		);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.notifItem}
			onPress={() => handleMarkOneRead(item.id)}
			activeOpacity={0.7}>
			{/* Bell icon with colored background */}
			<View style={[styles.notifIconWrap, { backgroundColor: item.iconBg }]}>
				<Image
					source={require("../../assets/images/notification-bell.png")}
					style={styles.notifIcon}
					resizeMode="contain"
				/>
			</View>

			<View style={styles.notifTextBlock}>
				<Text style={styles.notifTitle}>{item.title}</Text>
				<Text style={styles.notifBody}>{item.body}</Text>
				<Text style={styles.notifTime}>{item.time}</Text>
			</View>

			{/* Unread green dot */}
			{item.unread && <View style={styles.unreadDot} />}
		</TouchableOpacity>
	);

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}>
			<Pressable style={styles.backdrop} onPress={onClose} />

			{/* ── Modal sheet ── */}
			<View style={styles.sheet}>
				<View style={styles.dragHandle} />

				{/* ── Container 1: Header row ── */}
				<View style={styles.headerRow}>
					<Text style={styles.headerTitle}>Notifications</Text>

					<TouchableOpacity
						onPress={handleMarkAllRead}
						accessibilityLabel="Mark all as read">
						<Text style={styles.markAllText}>Mark all read</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={onClose}
						style={styles.closeBtn}
						accessibilityLabel="Close notifications">
						<View style={styles.closeCircle}>
							<Text style={styles.closeX}>×</Text>
						</View>
					</TouchableOpacity>
				</View>

				{/* ── Container 2: Notification list ── */}
				<FlatList
					data={notifications}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					style={styles.notifList}
					contentContainerStyle={styles.notifListContent}
					showsVerticalScrollIndicator={false}
				/>

				<TouchableOpacity
					style={styles.seeAllRow}
					onPress={() => {
						onClose();
					}}>
					<Text style={styles.seeAllText}>See all notifications</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
	},

	sheet: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 422,
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		flexDirection: "column",
		alignItems: "center",
	},

	dragHandle: {
		width: 40,
		height: 4,
		borderRadius: 100,
		backgroundColor: "#E5E7EB",
		alignSelf: "center",
		marginTop: 10,
		marginBottom: 4,
	},

	// ── Container 1: Header ──
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		alignSelf: "stretch",
	},
	headerTitle: {
		flex: 1,
		color: "#111827",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 15,
		fontWeight: "700",
		lineHeight: 22.5,
	},
	markAllText: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 12,
		fontWeight: "600",
		lineHeight: 18,
		marginRight: 12,
	},
	closeBtn: {
		padding: 2,
	},
	closeCircle: {
		width: 24,
		height: 24,
		borderRadius: 10,
		backgroundColor: "#F3F4F6",
		alignItems: "center",
		justifyContent: "center",
	},
	closeX: {
		color: "#6B7280",
		fontSize: 20,
		fontWeight: "600",
		lineHeight: 16,
		marginTop: -1,
	},

	// ── Container 2: List ──
	notifList: {
		alignSelf: "stretch",
	},
	notifListContent: {
		paddingHorizontal: 16,
	},
	notifItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingVertical: 12,
		alignSelf: "stretch",
		borderBottomWidth: 0,
	},
	notifIconWrap: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
		flexShrink: 0,
	},
	notifIcon: {
		width: 18,
		height: 18,
	},
	notifTextBlock: {
		flex: 1,
	},
	notifTitle: {
		color: "#111827",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 13,
		fontWeight: "600",
		lineHeight: 19,
		marginBottom: 2,
	},
	notifBody: {
		color: COLORS.textMuted,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 12,
		fontWeight: "400",
		lineHeight: 17,
		marginBottom: 2,
	},
	notifTime: {
		color: "#9CA3AF",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 11,
		fontWeight: "400",
		lineHeight: 16,
	},
	unreadDot: {
		width: 8,
		height: 8,
		borderRadius: 268435456,
		backgroundColor: COLORS.primary,
		marginTop: 6,
		flexShrink: 0,
	},

	// ── Container 3: See all ──
	seeAllRow: {
		paddingVertical: 12,
		alignSelf: "stretch",
		alignItems: "center",
		justifyContent: "center",
		borderTopWidth: 1,
		borderTopColor: "#F3F4F6",
	},
	seeAllText: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 13,
		fontWeight: "600",
		lineHeight: 19.5,
	},
});

export default NotificationsModal;
