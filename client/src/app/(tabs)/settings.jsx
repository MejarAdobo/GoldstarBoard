import { colors, bg, text } from "$lib/utils/theme";
import { Text, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useUnits } from "$lib/contexts/unitsContext";
import UnitSwitch from "$lib/components/unitSwitch";

export default function Settings() {
	const { units, setUnits } = useUnits();

	return (
		<SafeAreaProvider>
			<View className={`flex-1 px-4 py-2 ${bg(colors.pageBg)}`}>
				<SafeAreaView className="flex-1">
					<View className="p-2">
						<Text className={`font-bold text-4xl py-1 ${text(colors.textPrimary)}`}>Settings</Text>
					</View>
					{/* units*/}
					<View className={`py-5 px-4 flex-row justify-between items-center ${bg(colors.surfaceAlt)} rounded-[16px]`}>
						<View className="flex-row gap-2 items-center">
						<SymbolView
							name={{ android: "straighten", web: "straighten" }}
							size={30}
							tintColor={colors.textSecondary}
						/>
						<Text className={`font-bold text-xl ${text(colors.textPrimary)}`}>Units</Text>
						</View>
						<UnitSwitch
							value={units}
							onChange={(unit) => setUnits(unit)}
						/>
					</View>
				</SafeAreaView>
			</View>
		</SafeAreaProvider>
	);
}
