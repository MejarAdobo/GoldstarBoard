import { goldStarStatusColors } from "$lib/utils/theme";
import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

export default function GoldStarStatus({ goldStarStatus }) {
	const theme = goldStarStatusColors[goldStarStatus] ?? goldStarStatusColors.default;
	return (
		<View className={`flex-row items-start ${theme.bg} px-6 py-4 mt-4 rounded-full`}>
			{goldStarStatus === "Gained" ? (
				<View className="flex-row items-start gap-3">
					<SymbolView
						name={{ android: "star_shine", web: "star_shine" }}
						size={20}
						tintColor={theme.icon}
					/>
					<Text className={`font-semibold text-sm ${theme.text}`}>Gained a Star</Text>
				</View>
			) : goldStarStatus === "Streak Lost" ? (
				<View className="flex-row items-start gap-3">
					<SymbolView
						name={{ android: "trending_down", web: "trending_down" }}
						size={20}
						tintColor={theme.icon}
					/>
					<Text className={`font-semibold text-sm ${theme.text}`}>Lost the Streak</Text>
				</View>
			) : (
				<View className="flex-row items-start gap-3">
					<SymbolView
						name={{ android: "event_busy", web: "event_busy" }}
						size={20}
						tintColor={theme.icon}
					/>
					<Text className={`font-semibold text-sm ${theme.text}`}>Last Star {goldStarStatus}</Text>
				</View>
			)}
		</View>
	);
}
