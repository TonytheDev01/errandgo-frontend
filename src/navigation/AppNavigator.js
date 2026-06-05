import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "@context/AuthContext";

import SplashScreen from "@screens/SplashScreen";
import SliderScreen from "@screens/SliderScreen";
import OnboardingScreen from "@screens/OnboardingScreen";
import SignUpScreen from "@screens/SignUpScreen";
import SignInScreen from "@screens/SignInScreen";
import DashboardScreen from "@screens/DashboardScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => (
	<Tab.Navigator screenOptions={{ headerShown: false }}>
		<Tab.Screen name="Home" component={DashboardScreen} />
		<Tab.Screen name="History" component={() => null} />
		<Tab.Screen name="Settings" component={() => null} />
	</Tab.Navigator>
);

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Splash" component={SplashScreen} />
				<Stack.Screen name="Slider" component={SliderScreen} />
				<Stack.Screen name="Onboarding" component={OnboardingScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="Dashboard" component={DashboardTabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
