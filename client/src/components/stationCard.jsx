import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

import { getRankColours } from "../utils/setRankColours";
import StationStatCard from "./stationStatCard";
import WeatherToggle from "./weatherToggle";
import GoldStarStatus from "./goldStarStatus";


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

			{/* display status */}
			{goldStarStatus ? <GoldStarStatus goldStarStatus={goldStarStatus} /> : null}
		</View>
	);
}
