import { useUnits } from "$lib/contexts/unitsContext";
import { formatWeatherCondition } from "$lib/utils/formatWeatherCondition";
import { SymbolView } from "expo-symbols";
import { View, Text } from "react-native";

export default function WeatherCondition({ data, theme }) {
	const formattedWeather = formatWeatherCondition(data);
	const { units: measurementType } = useUnits();

	return (
		<View className={`rounded-b-[20px] py-4 px-2`} style={{ backgroundColor: theme.weatherBg }}>
			<View className="flex-row flex-wrap gap-2 justify-center">
				{Object.values(formattedWeather).map((item, i) => (
					<View
						key={i}
						className={`items-center py-3.5 px-2 rounded-[14px]`}
						style={{ width: "31%", backgroundColor: theme.weatherTiles }}
					>
						<SymbolView
							name={{ android: item.icon, web: item.icon }}
							size={26}
							tintColor={theme.icon}
						/>
						<Text className={`text-[11px] font-bold mt-1`} style={{ color: theme.containerText }}>
							{measurementType === "metric"
								? (item.metric ?? item.value)
								: measurementType === "imperial"
									? (item.imperial ?? item.value)
									: item.value}
						</Text>
						<Text className={`text-[9px] font-semibold mt-0.5`} style={{ color: theme.accentText }}>
							{item.title}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}
