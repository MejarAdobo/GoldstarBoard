import { colors } from "$lib/utils/theme";
import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

export default function StationStatCard({
	statBg,
	containerText,
	accentText,
	icon,
	hotStreak,
	coldStreak,
	goldStars,
}) {
	return (
		<View className="flex-row gap-4 my-1 items-center justify-center">
			{/* Streak Container */}
			{hotStreak > 0 ? (
				<View
					className={`rounded-[16px] flex-row gap-2 items-center px-6 py-4`}
					style={{ backgroundColor: statBg }}
				>
					<SymbolView
						name={{ android: "mode_heat", web: "mode_heat" }}
						size={28}
						tintColor={colors.streakHot}
					/>
					<View className="flex-col items-start">
						<Text className={`text-lg font-bold `} style={{ color: containerText }}>
							{hotStreak} Days
						</Text>
						<Text className={`text-sm font-semibold text-left`} style={{ color: accentText }}>
							Streak
						</Text>
					</View>
				</View>
			) : coldStreak > 0 ? (
				<View
					className={`rounded-[16px] flex-row gap-2 items-center px-6 py-4`}
					style={{ backgroundColor: statBg }}
				>
					<SymbolView
						name={{ android: "mode_cool", web: "mode_cool" }}
						size={28}
						tintColor={colors.streakCold}
					/>
					<View className="flex-col items-start">
						<Text className={`text-lg font-bold `} style={{ color: containerText }}>
							{coldStreak} Days
						</Text>
						<Text className={`text-sm font-semibold text-left`} style={{ color: accentText }}>
							Streak
						</Text>
					</View>
				</View>
			) : (
				<View
					className={`self-stretch rounded-[16px] flex-row gap-2 items-center px-6 py-4`}
					style={{ backgroundColor: statBg }}
				>
					<SymbolView
						name={{ android: "mode_standby", web: "mode_standby" }}
						size={28}
						tintColor={icon}
					/>
					<Text className={`text-lg font-bold `} style={{ color: containerText }}>
						No Streak
					</Text>
				</View>
			)}

			{/* Gold Star Container */}
			<View
				className={`rounded-[16px] flex-row gap-2 items-center px-6 py-4`}
				style={{ backgroundColor: statBg }}
			>
				<SymbolView name={{ android: "kid_star", web: "kid_star" }} size={28} tintColor={icon} />
				<View className="flex-col items-start">
					<Text className={`text-lg font-bold`} style={{ color: containerText }}>
						{goldStars}
					</Text>
					<Text className={`text-sm font-semibold text-left`} style={{ color: accentText }}>
						Gold Stars
					</Text>
				</View>
			</View>
		</View>
	);
}
