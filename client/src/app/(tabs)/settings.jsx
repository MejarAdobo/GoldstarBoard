import { Text, View, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Settings() {
	return (
		<SafeAreaProvider>
			<View className="flex-1 px-4 py-2 bg-[#FFF9F0]">
				<SafeAreaView className="flex-1">
					<View className="p-2">
						<Text className="font-bold text-4xl py-1 text-[#2C1F00]">Settings</Text>
						<Text className="text-lg text-[#2C1F00] font-semibold">Work in Progress</Text>
					</View>
				</SafeAreaView>
			</View>
		</SafeAreaProvider>
	);
}
