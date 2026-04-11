import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

import { getRankColours } from "../utils/setRankColours";
import StationStatCard from "./stationStatCard";
import WeatherToggle from "./weatherToggle";

const statusConfig = {
	"Streak Lost": { bg: "bg-[#FDDDD6]", text: "text-[#BA1A1A]", tint: "#BA1A1A" },
	Gained: { bg: "bg-[#D4F5D0]", text: "text-[#1A6B18]", tint: "#1A6B18" },
	default: { bg: "bg-[#E2E2EA]", text: "text-[#44464F]", tint: "#44464F" },
};

export default function StationCard({
	rank,
	name,
	hotStreak,
	coldStreak,
	goldStars,
	goldStarStatus,
	weatherData,
}) {
	const theme = getRankColours(rank);

	const renderStatus = () => {
		if (!goldStarStatus) return null;
		const config = statusConfig[goldStarStatus] ?? statusConfig.default;
		return (
			<View className={`flex-row items-center ${config.bg} px-3 py-1 rounded-full gap-1`}>
				<SymbolView name={{ android: "star", web: "star" }} size={18} tintColor={config.tint} />
				<Text className={`font-semibold text-sm ${config.text}`}>{goldStarStatus}</Text>
			</View>
		);
	};

	return (
		<View className={`p-6 rounded-[1.75em] my-2 ${theme.container}`}>
			{/* card title and rank*/}
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-5 mb-2">
					<Text
						className={`text-4xl px-6 py-4 font-bold rounded-[16px] ${theme.badge} ${theme.badgeText}`}
					>
						{rank}
					</Text>
					<Text className={`text-2xl font-bold ${theme.containerText}`}>{name}</Text>
				</View>
			</View>

			{/* display the streak and gold stars */}
			<StationStatCard
				statBg={theme.statBg}
				containerText={theme.containerText}
				accentText={theme.accentText}
				icon={theme.icon}
				hotStreak={hotStreak}
				coldStreak={coldStreak}
				goldStars={goldStars}
			/>

			{/* Display Weather Data */}

			<WeatherToggle data={weatherData} theme={theme} />

			{/* <View className="flex-row gap-4 mb-2">
				<StationInfoCard title="Temp" data={weatherData.temperature.c} rank={rank} />
				<StationInfoCard title="Humidity" data={weatherData.humidity.value} rank={rank} />
			</View>

			<View className="flex-row gap-4 mb-1">
				<StationInfoCard title="Rainfall" data={weatherData.precip_rate.in} rank={rank} />
				<StationInfoCard title="Dewpoint" data={weatherData.dewpoint.c} rank={rank} />
			</View>*/}
		</View>
	);
}
