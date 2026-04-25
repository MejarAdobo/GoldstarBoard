import StarCalendar from "$lib/components/starCalendar";
import StarSummary, { StarLegend } from "$lib/components/starSummary";
import { colors } from "$lib/utils/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Station() {
	const { name, dailyData } = useLocalSearchParams();
	const now = new Date();
	const [currentMonth, setCurrentMonth] = useState(now.getMonth());
	const [currentYear, setCurrentYear] = useState(now.getFullYear());

	const dateData = useMemo(() => {
		const parsed = JSON.parse(dailyData);
		const out = {};
		parsed.forEach((d) => {
			if (d.gold_star_status === "Gained") out[d.recorded_at] = "gained";
			else if (d.gold_star_status === "Streak Lost") out[d.recorded_at] = "lost";
			else if (d.gold_star_status === null && d.has_gold_star) out[d.recorded_at] = "maintained";
			else out[d.recorded_at] = "nostar";
		});
		return out;
	}, [dailyData]);

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
			<View
				className={`flex-1 px-4 py-1 `}
				style={{ color: colors.textPrimary, backgroundColor: colors.pageBg }}
			>
				<SafeAreaView className="flex-1">
					<StarSummary starData={dateData} />
					<StarLegend />
					<View className={`mx-4 rounded-[22px] p-4`} style={{ color: colors.textPrimary }}>
						<StarCalendar
							starData={dateData}
							currentMonth={currentMonth}
							currentYear={currentYear}
							onChangeMonth={handleChangeMonth}
						/>
					</View>
				</SafeAreaView>
			</View>
		</>
	);
}
