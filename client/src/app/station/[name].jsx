import StarCalendar from "$lib/components/starCalendar";
import StarSummary, { StarLegend } from "$lib/components/starSummary";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

// Example data - replace with your actual data
const STAR_DATA = {
	"2026-01-05": "gained",
	"2026-01-06": "maintained",
	"2026-01-07": "maintained",
	"2026-01-08": "lost",
	"2026-01-09": "nostar",
	"2026-01-10": "gained",
	"2026-01-11": "maintained",
	"2026-01-12": "maintained",
	"2026-01-13": "maintained",
	"2026-01-14": "lost",
	// ... more dates
};

export default function Station({ starData = STAR_DATA }) {
	const { name } = useLocalSearchParams();
	const now = new Date();
	const [currentMonth, setCurrentMonth] = useState(now.getMonth());
	const [currentYear, setCurrentYear] = useState(now.getFullYear());

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
					headerStyle: { backgroundColor: "#FFF9F0" },
					headerTitleStyle: { fontSize: 30, fontWeight: "700" },
					headerTintColor: "#2C1F00",
					headerShadowVisible: false,
				}}
			/>
			<SafeAreaProvider>
				<View className="flex-1 px-4 py-1 bg-[#FFF9F0]">
					<SafeAreaView className="flex-1">
						<StarSummary starData={starData} />
						<StarLegend />
						<View className="mx-4 bg-[#F5EDE0] rounded-[22px] p-4">
							<StarCalendar
								starData={starData}
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
