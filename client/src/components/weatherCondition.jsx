import { SymbolView } from "expo-symbols";
import { View, Text } from "react-native";

export default function WeatherCondition({ data, theme }) {
	return (
		<View className={`rounded-b-[20px] py-4 px-2 ${theme.weatherBg}`}>
			<View className="flex-row flex-wrap gap-2 justify-center">
				{/* temp */}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "thermostat", web: "thermostat" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.temperature.c}°C</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Temp</Text>
				</View>
				{/* humidity */}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "humidity_percentage", web: "humidity_percentage" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.humidity.value}%</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Humidity</Text>
				</View>
				{/* dewpoint */}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "dew_point", web: "dew_point" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.dewpoint.c}°C</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Dewpoint</Text>
				</View>
				{/* uv index*/}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "sunny", web: "sunny" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.uv}</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>UV Index</Text>
				</View>
				{/* wind speed */}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "air", web: "air" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.wind.speed.kmh} kph</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Wind</Text>
				</View>
				{/* gust */}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "cyclone", web: "cyclone" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.wind.gust.kmh} kph</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Gust</Text>
				</View>
				{/* precip accum*/}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "water_drop", web: "water_drop" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.precip_accum.in} mm</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Precip Accum</Text>
				</View>
				{/* precip rate*/}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "rainy", web: "rainy" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.precip_rate.in} mm</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Precip Rate</Text>
				</View>
				{/* pressure*/}
				<View className={`items-center py-3.5 px-2 rounded-[14px] ${theme.weatherTiles}`}  style={{ width: '31%' }}>
					<SymbolView
						name={{ android: "speed", web: "speed" }}
						size={26}
						tintColor={theme.icon}
					/>
					<Text className={`text-[11px] font-bold mt-1 ${theme.containerText}`}>{data.pressure.hpa} hPa</Text>
					<Text className={`text-[9px] font-semibold mt-0.5 ${theme.accentText}`}>Pressure</Text>
				</View>


				{/* {weather.map((w, i) => (
        <View
          key={i}
          className={`items-center p-2 rounded-[14px] ${theme.weatherItem}`}
          style={{ width: '31%' }}
        >
          <SymbolView name={{ android: w.icon, web: w.icon }} size={20} tintColor={theme.accentColor} />
          <Text className={`text-sm font-bold mt-1 ${theme.containerText}`}>{w.value}</Text>
          <Text className={`text-[10px] font-medium mt-0.5 ${theme.accentText}`}>{w.label}</Text>
        </View>
      ))}*/}
			</View>
		</View>
	);
}
