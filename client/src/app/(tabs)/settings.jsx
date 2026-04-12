import { colors, bg, text } from "$lib/utils/theme";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Settings() {
	return (
		<SafeAreaProvider>
			<View className={`flex-1 px-4 py-2 ${bg(colors.pageBg)}`}>
				<SafeAreaView className="flex-1">
					<View className="p-2">
						<Text className={`font-bold text-4xl py-1 ${text(colors.textPrimary)}`}>Settings</Text>
					</View>
				</SafeAreaView>
			</View>
		</SafeAreaProvider>
	);
}
