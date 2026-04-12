import StationLink from "$lib/components/stationLink";
import StationLinkSkeleton from "$lib/components/stationLinkSkeleton";
import { loadDailyData } from "$lib/services/loadDailyData";
import { loadStations } from "$lib/services/loadStations";
import { colors, bg, text } from "$lib/utils/theme";
import { useState, useEffect } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Stations() {
	const [stations, setStations] = useState([]);
	const [dailyData, setDailyData] = useState({});
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchData = async () => {
		try {
			const stationData = await loadStations();
			const dailyData = await loadDailyData();
			setStations(stationData);
			setDailyData(dailyData);
		} catch (err) {
			console.error(err);
		} finally {
			setTimeout(() => {
				setLoading(false);
				setRefreshing(false);
			}, 1050);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onRefresh = () => {
		setRefreshing(true);
		fetchData();
	};

	return (
		<SafeAreaProvider>
			<View className={`flex-1 px-4 py-1 ${bg(colors.pageBg)}`}>
				<SafeAreaView className="flex-1">
					<View className="p-2">
						<Text className={`font-bold text-4xl py-1 ${text(colors.textPrimary)}`}>Stations</Text>
						<Text className={`text-lg font-semibold ${text(colors.textSecondary)}`}>{stations.length} Stations</Text>
					</View>

					{loading || refreshing ? (
						<StationLinkSkeleton />
					) : stations.length === 0 ? (
						<Text className={`font-bold Text-4xl py-4 text-center ${text(colors.textPrimary)}`}>
							No stations found.
						</Text>
					) : (
						<FlatList
							data={stations}
							keyExtractor={(item) => item.name}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 60 }}
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							renderItem={({ item }) => <StationLink name={item.name} data={dailyData[item.id]} />}
						/>
					)}
				</SafeAreaView>
			</View>
		</SafeAreaProvider>
	);
}
