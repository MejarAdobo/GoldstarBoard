import StarCalendar from "$lib/components/starCalendar";
import StarSummary, { StarLegend } from "$lib/components/starSummary";
import { colors } from "$lib/utils/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Station() {
	const { name, dailyData } = useLocalSearchParams();
	const now = new Date();
	const [currentMonth, setCurrentMonth] = useState(now.getMonth());
	const [currentYear, setCurrentYear] = useState(now.getFullYear());

	const parsedDailyData = JSON.parse(dailyData);

	// make a json with date as a key, and status as the values
	const dateData = {};
	parsedDailyData.forEach((date) => {
		if (date.gold_star_status === "Gained") {
			dateData[date.recorded_at] = "gained";
		} else if (date.gold_star_status === "Streak Lost") {
			dateData[date.recorded_at] = "lost";
		} else if (date.gold_star_status === "" && date.has_gold_star) {
			dateData[date.recorded_at] = "maintained";
		} else {
			dateData[date.recorded_at] = "nostar";
		}
	});

	const handleChangeMonth = (delta) => {
		let newMonth = currentMonth + delta;
		let newYear = currentYear;
		if (newMonth < 0) {
			newMonth = 11;
			newYear -= 1;
		} else if (newMonth > 11) {
			newMonth = 0;
			newYear += 1;
		}
		setCurrentMonth(newMonth);
		setCurrentYear(newYear);
	};

	return (
		<>
			<Stack.Screen
				options={{
					title: name,
					headerStyle: { backgroundColor: colors.pageBg },
					headerTitleStyle: { fontSize: 30, fontWeight: "700" },
					headerTintColor: colors.textPrimary,
					headerShadowVisible: false,
				}}
			/>
			<SafeAreaProvider>
				<View className={`flex-1 px-4 py-1 bg-[${colors.pageBg}]`}>
					<SafeAreaView className="flex-1">
						<StarSummary starData={dateData} />
						<StarLegend />
						<View className={`mx-4 rounded-[22px] p-4 bg-[${colors.surface}]`}>
							<StarCalendar
								starData={dateData}
								currentMonth={currentMonth}
								currentYear={currentYear}
								onChangeMonth={handleChangeMonth}
							/>
						</View>
					</SafeAreaView>
				</View>
			</SafeAreaProvider>
		</>
	);
}
