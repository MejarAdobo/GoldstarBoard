import { useState, useEffect } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import StationCard from "$lib/components/stationCard";
import StationCardSkeleton from "$lib/components/stationCardSkeleton";
import { loadStations } from "$lib/services/loadStations";

export default function Leaderboard() {
	const [stations, setStations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchData = async () => {
		try {
			const data = await loadStations();
			setStations(data);
		} catch (err) {
			console.error(err);
		} finally {
			setTimeout(() => {
				setLoading(false);
				setRefreshing(false);
			}, 1100);
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
			<View className="flex-1 px-4 py-1 bg-[#FFF9F0]">
				<SafeAreaView className="flex-1">
					<View className="p-2">
						<Text className="font-bold text-4xl py-1 text-[#2C1F00]">Leaderboard</Text>
						<Text className="text-lg text-[#6B5D3F] font-semibold">{stations.length} Stations</Text>
					</View>

					{loading || refreshing ? (
						<StationCardSkeleton />
					) : stations.length === 0 ? (
						<Text className="text-[#2C1F00] font-bold Text-4xl py-4 text-center">
							No stations found.
						</Text>
					) : (
						<FlatList
							data={stations}
							keyExtractor={(item) => item.name}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 60 }}
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							renderItem={({ item }) => (
								<StationCard
									rank={item.rank}
									name={item.name}
									hotStreak={item.hotStreak}
									coldStreak={item.coldStreak}
									goldStars={item.goldStars}
									goldStarStatus={item.goldStarStatus}
									weatherData={item.weatherData}
								/>
							)}
						/>
					)}
				</SafeAreaView>
			</View>
		</SafeAreaProvider>
	);
}
