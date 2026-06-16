import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import { useAuth } from "../context/AuthContext";
import SettingsModal from "./SettingsModal";
import NotificationsModal from "./NotificationsModal";

const { width: SW } = Dimensions.get("window");
const CARD_WIDTH = (SW - 48 - 12) / 2;

const getGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning";
	if (hour < 17) return "Good afternoon";
	return "Good evening";
};

const QUICK_ACTIONS = [
	{
		id: "shop",
		label: "Shop Items",
		sub: "We shop, you relax.",
		iconBg: "#FFF7ED",
		icon: require("../../assets/images/shop-icon.png"),
		textColor: COLORS.primary,
		cardBg: "#FFF",
		btnBg: "#16A34A",
		btnColor: "#FFF",
		dark: false,
	},
	{
		id: "errand",
		label: "Request Errand",
		sub: "We'll run it for you.",
		iconBg: "rgba(255,255,255,0.2)",
		icon: require("../../assets/images/plus.png"),
		textColor: "#FFF",
		cardBg: COLORS.primary,
		btnBg: "#FFF",
		btnColor: COLORS.primary,
		dark: true,
		hasEllipse: true,
	},
	{
		id: "delivery",
		label: "Send Delivery",
		sub: "Fast & Reliable Delivery.",
		iconBg: "#FAF5FF",
		icon: require("../../assets/images/Send.png"),
		textColor: COLORS.primary,
		cardBg: "#FFF",
		btnBg: "#16A34A",
		btnColor: "#FFF",
		dark: false,
	},
	{
		id: "track",
		label: "Track Orders",
		sub: "Track all your orders.",
		iconBg: "#EFF6FF",
		icon: require("../../assets/images/location.png"),
		textColor: COLORS.primary,
		cardBg: "#FFF",
		btnBg: "#16A34A",
		btnColor: "#FFF",
		dark: false,
	},
];

const NAV_ITEMS = [
	{ key: "home", label: "Home", icon: require("../../assets/images/home.png") },
	{
		key: "activity",
		label: "Activity",
		icon: require("../../assets/images/activity.png"),
	},
	{
		key: "create",
		label: "Create",
		icon: require("../../assets/images/plus.png"),
		isCenter: true,
	},
	{
		key: "orders",
		label: "Orders",
		icon: require("../../assets/images/order.png"),
	},
	{
		key: "profile",
		label: "Profile",
		icon: require("../../assets/images/profile.png"),
	},
];

const DashboardScreen = ({ navigation }) => {
	const { user } = useAuth();
	const [greeting, setGreeting] = useState(getGreeting());
	const [activeNav, setActiveNav] = useState("home");
	const [showSettings, setShowSettings] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => setGreeting(getGreeting()), 7200000);
		return () => clearInterval(interval);
	}, []);

	const displayName = user?.full_name?.split(" ")[0] || user?.name || "there";

	const handleProfilePress = () => {
		if (navigation.getState().routeNames.includes("Profile")) {
			navigation.navigate("Profile");
		}
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top"]}>
			<StatusBar style="dark" />

			<ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				{/* ── Header ── */}
				<View style={styles.headerRow}>
					<TouchableOpacity
						onPress={handleProfilePress}
						accessibilityLabel="View profile">
						{user?.avatar ? (
							<Image
								source={{ uri: user.avatar }}
								style={styles.avatar}
								resizeMode="cover"
							/>
						) : (
							<View style={styles.avatarPlaceholder}>
								<Ionicons name="person" size={22} color="#FFF" />
							</View>
						)}
					</TouchableOpacity>

					<View style={styles.greetingBlock}>
						<Text style={styles.greetingText}>{greeting}</Text>
						<Text style={styles.greetingName}>Hello {displayName}</Text>
					</View>

					<View style={styles.headerIcons}>
						<TouchableOpacity
							style={styles.headerIconBtn}
							onPress={() => setShowNotifications(true)}
							accessibilityLabel="Notifications">
							<Image
								source={require("../../assets/images/notification-bell.png")}
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.headerIconBtn}
							onPress={() => setShowSettings(true)}
							accessibilityLabel="Settings">
							<Image
								source={require("../../assets/images/settings.png")}
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				</View>

				{/* ── LIVE TRACKING CARD ── */}
				<View style={styles.trackingCard}>
					<View style={styles.trackingHeader}>
						<View style={styles.trackingLabelRow}>
							<Image
								source={require("../../assets/images/ellipse-dot.png")}
								style={{ width: 10, height: 10 }}
								resizeMode="contain"
							/>
							<Text style={styles.trackingLabel}>Live tracking</Text>
						</View>
						<TouchableOpacity style={styles.viewAllRow}>
							<Text style={styles.viewAllText}>View all</Text>
							<Image
								source={require("../../assets/images/arrow-rightt.png")}
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.mapWrap}>
						<Image
							source={require("../../assets/images/Dash-map.png")}
							style={{ width: 318.539, height: 94.382 }}
							resizeMode="contain"
						/>
					</View>

					<View style={styles.runnerRow}>
						<View style={styles.runnerAvatarWrap}>
							<Image
								source={require("../../assets/images/headshot.png")}
								style={{ width: 38, height: 38 }}
								resizeMode="contain"
							/>
						</View>
						<View style={styles.runnerInfo}>
							<Text style={styles.runnerName}>Nelly</Text>
							<View style={styles.ratingRow}>
								<Image
									source={require("../../assets/images/Star.png")}
									style={{ width: 15, height: 15 }}
									resizeMode="contain"
								/>
								<Text style={styles.ratingText}>4.8</Text>
							</View>
						</View>
						<View style={styles.runnerActions}>
							<TouchableOpacity
								style={styles.runnerActionBtn}
								accessibilityLabel="Chat with runner">
								<Image
									source={require("../../assets/images/Chat.png")}
									style={{ width: 16, height: 16 }}
									resizeMode="contain"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.runnerActionBtn}
								accessibilityLabel="Call runner">
								<Image
									source={require("../../assets/images/Phone.png")}
									style={{ width: 16, height: 14.4 }}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* ── QUICK ACTIONS ── */}
				<View style={styles.sectionWrap}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Quick actions</Text>
						<TouchableOpacity>
							<Text style={styles.seeAll}>See all</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.cardsGrid}>
						{QUICK_ACTIONS.map((card) => (
							<View
								key={card.id}
								style={[styles.actionCard, { backgroundColor: card.cardBg }]}>
								{card.hasEllipse && <View style={styles.cardEllipse} />}

								<View
									style={[
										styles.cardIconWrap,
										{ backgroundColor: card.iconBg },
									]}>
									<Image
										source={card.icon}
										style={{ width: 28, height: 28 }}
										resizeMode="contain"
									/>
								</View>

								<Text style={[styles.cardLabel, { color: card.textColor }]}>
									{card.label}
								</Text>
								<Text
									style={[
										styles.cardSub,
										{ color: card.dark ? "rgba(255,255,255,0.8)" : "#6B7280" },
									]}>
									{card.sub}
								</Text>

								<View
									style={[
										styles.comingSoonBadge,
										{ backgroundColor: card.btnBg },
									]}>
									<Text
										style={[styles.comingSoonText, { color: card.btnColor }]}>
										Coming Soon
									</Text>
								</View>
							</View>
						))}
					</View>
				</View>

				{/* ── RECENT ACTIVITY ── */}
				<View style={styles.sectionWrap}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Recent Activity</Text>
						<TouchableOpacity>
							<Text style={styles.seeAll}>View all</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.activityCard}>
						<Image
							source={require("../../assets/images/Activity-icon.png")}
							style={{ width: 26, height: 26 }}
							resizeMode="contain"
						/>
						<Text style={styles.activityEmptyTitle}>No activities yet</Text>
						<Text style={styles.activityEmptySub}>
							{"Your completed errands and\norders will appear here."}
						</Text>
					</View>
				</View>

				{/* ── CTA BANNER ── */}
				<TouchableOpacity style={styles.ctaBanner} activeOpacity={0.9}>
					<View style={styles.ctaTextBlock}>
						<Text style={styles.ctaTitle}>Need something done today?</Text>
						<Text style={styles.ctaSub}>
							Post an errand and get matched in minutes.
						</Text>
					</View>
					<View style={styles.ctaIconBtn}>
						<Image
							source={require("../../assets/images/arrow-rit.png")}
							style={{ width: 23.59, height: 23.59 }}
							resizeMode="contain"
						/>
					</View>
				</TouchableOpacity>


				<View style={{ height: 100 }} />
			</ScrollView>

			{/* ── BOTTOM NAVIGATION BAR ── */}
			<View style={styles.navBar}>
				{NAV_ITEMS.map((item) => {
					const isActive = activeNav === item.key;

					if (item.isCenter) {
						return (
							<TouchableOpacity
								key={item.key}
								style={styles.navCenterBtn}
								onPress={() => setActiveNav(item.key)}
								accessibilityLabel={item.label}>
								<View style={styles.navPlusCircle}>
									<Image
										source={require("../../assets/images/plus.png")}
										style={{ width: 24.37, height: 24.37 }}
										resizeMode="contain"
									/>
								</View>
								<Text style={styles.navCenterLabel}>{item.label}</Text>
							</TouchableOpacity>
						);
					}

					return (
						<TouchableOpacity
							key={item.key}
							style={styles.navItem}
							onPress={() => setActiveNav(item.key)}
							accessibilityLabel={item.label}>
							<Image
								source={item.icon}
								style={[
									{ width: 21, height: 21 },
									isActive && { tintColor: COLORS.primary },
								]}
								resizeMode="contain"
							/>
							<Text
								style={[styles.navLabel, isActive && styles.navLabelActive]}>
								{item.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			<SettingsModal
				visible={showSettings}
				onClose={() => setShowSettings(false)}
				navigation={navigation}
			/>
			<NotificationsModal
				visible={showNotifications}
				onClose={() => setShowNotifications(false)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: "#F5F0EB" },
	scroll: { flex: 1 },
	scrollContent: { paddingHorizontal: 24, paddingTop: 16 },

	// ── Header ──
	headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#FFF",
	},
	avatarPlaceholder: {
		width: 50,
		height: 50,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#FFF",
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	greetingBlock: { flex: 1, marginLeft: 10 },
	greetingText: {
		color: "#64748B",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 16,
		fontWeight: "400",
		lineHeight: 24,
	},
	greetingName: {
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 20,
		fontWeight: "600",
		lineHeight: 24,
	},
	headerIcons: { flexDirection: "row", alignItems: "center" },
	headerIconBtn: {
		marginLeft: 12,
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
	},

	// ── Live tracking card ──
	trackingCard: {
		width: "100%",
		borderRadius: 23.6,
		backgroundColor: "#FFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
		padding: 16,
		marginBottom: 20,
	},
	trackingHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	trackingLabelRow: { flexDirection: "row", alignItems: "center" },
	liveDot: {
		width: 8,
		height: 8,
		borderRadius: 5,
		backgroundColor: COLORS.primary,
		borderWidth: 1,
		borderColor: "#FFF",
		marginRight: 8,
	},
	trackingLabel: {
		color: "#374151",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 13.76,
		fontWeight: "600",
		lineHeight: 19.66,
	},
	viewAllRow: { flexDirection: "row", alignItems: "center" },
	viewAllText: {
		color: "#374151",
		fontFamily: FONTS.poppinsBold,
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 19.66,
		marginRight: 2,
	},
	mapWrap: {
		width: "100%",
		height: 95,
		borderRadius: 15.73,
		overflow: "hidden",
		marginBottom: 12,
	},
	mapPlaceholder: {
		flex: 1,
		backgroundColor: "#E5E7EB",
		alignItems: "center",
		justifyContent: "center",
	},
	runnerRow: { flexDirection: "row", alignItems: "center" },
	runnerAvatarWrap: { marginRight: 8 },
	runnerAvatarPlaceholder: {
		width: 24,
		height: 24,
		borderRadius: 15,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	runnerInfo: { flex: 1 },
	runnerName: {
		color: "#111827",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 11.8,
		fontWeight: "600",
		lineHeight: 15.73,
	},
	ratingRow: { flexDirection: "row", alignItems: "center" },
	ratingText: {
		color: "#000",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 9.83,
		fontWeight: "400",
		lineHeight: 14.75,
		marginLeft: 3,
	},
	runnerActions: { flexDirection: "row", alignItems: "center" },
	runnerActionBtn: {
		marginLeft: 12,
		width: 32,
		height: 32,
		alignItems: "center",
		justifyContent: "center",
	},

	// ── Section wrapper ──
	sectionWrap: { marginBottom: 20 },
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	sectionTitle: {
		color: "#111827",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 18,
		fontWeight: "700",
		lineHeight: 28,
	},
	seeAll: {
		color: "#6B7280",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 20,
	},

	// ── Quick action cards ──
	cardsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	actionCard: {
		width: CARD_WIDTH,
		minHeight: 173,
		borderRadius: 23.6,
		padding: 14,
		marginBottom: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	cardEllipse: {
		position: "absolute",
		right: -20,
		top: -20,
		width: 80,
		height: 80,
		borderRadius: 47,
		backgroundColor: "rgba(12,12,12,0.15)",
	},
	cardIconWrap: {
		width: 39,
		height: 39,
		borderRadius: 9.83,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	cardLabel: {
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 13.76,
		fontWeight: "700",
		lineHeight: 19.66,
		marginBottom: 4,
	},
	cardSub: {
		fontFamily: FONTS.poppinsMedium,
		fontSize: 11.8,
		fontWeight: "400",
		lineHeight: 15.73,
		marginBottom: 12,
	},
	comingSoonBadge: {
		alignSelf: "center",
		paddingTop: 7.865,
		paddingBottom: 7.596,
		paddingLeft: 28.66,
		paddingRight: 27.98,
		borderRadius: 11.798,
	},
	comingSoonText: {
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 10,
		fontWeight: "600",
	},

	// ── Recent activity ──
	activityCard: {
		width: "100%",
		minHeight: 229,
		borderRadius: 13.46,
		borderWidth: 0.841,
		borderColor: "#F3F4F6",
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	activityIconWrap: {
		width: 56,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	activityEmptyTitle: {
		color: "#000",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 11.78,
		fontWeight: "700",
		lineHeight: 16.83,
		textAlign: "center",
		marginBottom: 4,
	},
	activityEmptySub: {
		color: "#6B7280",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 10.1,
		fontWeight: "400",
		lineHeight: 13.46,
		textAlign: "center",
	},

	// ── CTA banner ──
	ctaBanner: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.primary,
		borderRadius: 23.6,
		padding: 19.66,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
	},
	ctaTextBlock: { flex: 1, paddingRight: 24 },
	ctaTitle: {
		color: "#FFF",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 15.73,
		fontWeight: "700",
		lineHeight: 19.66,
		marginBottom: 3,
	},
	ctaSub: {
		color: "#FFF",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 11.8,
		fontWeight: "400",
		lineHeight: 15.73,
	},
	ctaIconBtn: {
		width: 47.19,
		height: 47.19,
		borderRadius: 15.73,
		backgroundColor: "#FFAC33",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},

	// ── DEV ONLY button — remove before production ──
	devBtn: {
		backgroundColor: "#FF384A",
		padding: 12,
		borderRadius: 8,
		marginHorizontal: 16,
		marginBottom: 16,
	},
	devBtnText: {
		color: "#FFF",
		textAlign: "center",
		fontFamily: FONTS.poppinsExtraBold,
		fontSize: 14,
	},

	// ── Bottom nav ──
	navBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 70,
		backgroundColor: "#FFF",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		paddingHorizontal: 18,
		paddingBottom: 12,
		borderTopWidth: 1,
		borderTopColor: "#F3F4F6",
	},
	navItem: { alignItems: "center", justifyContent: "center", paddingBottom: 4 },
	navLabel: {
		color: "#9CA3AF",
		fontFamily: FONTS.poppinsMedium,
		fontSize: 10,
		marginTop: 3,
	},
	navLabelActive: { color: COLORS.primary },
	navCenterBtn: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	navPlusCircle: {
		width: 48,
		height: 48,
		borderRadius: 544,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 4,
	},
	navCenterLabel: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsMedium,
		fontSize: 10,
		marginTop: 3,
	},
});

export default DashboardScreen;
