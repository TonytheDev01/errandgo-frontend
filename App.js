import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@context/AuthContext";
import AppNavigator from "@navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Gabarito_700Bold } from "@expo-google-fonts/gabarito";
import {
	Poppins_500Medium,
	Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Mulish_700Bold } from "@expo-google-fonts/mulish";

export default function App() {
	const [fontsLoaded] = useFonts({
		Gabarito_700Bold,
		Poppins_500Medium,
		Poppins_800ExtraBold,
		Mulish_700Bold,
	});

	if (!fontsLoaded) return null;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<AuthProvider>
					<NavigationContainer>
						<AppNavigator />
					</NavigationContainer>
				</AuthProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
