import { useState, useEffect } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import StationCard from "../../components/stationCard";
import StationCardSkeleton from "../../components/stationCardSkeleton";
import { fetchStations, Station, fetchHourlyData, HourlyData } from "../../services/api";

export default function Leaderboard() {
	// const [stations, setStations] = useState<Station[]>([]);
	//  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
	//  const [loading, setLoading] = useState(true);

	//    const hourlyMap = new Map(hourlyData.map((h) => [h.station, h]));

	//  useEffect(() => {
	//    const loadStations = async () => {
	//      try {
	// 			const stationData = await fetchStations();
	// 			const hourlyData = await fetchHourlyData();
	// 			setStations(stationData);
	// 			setHourlyData(hourlyData);
	//      } catch (err) {
	//        console.error(err);
	//      } finally {
	//        setLoading(false);
	//      }
	//    };
	//    loadStations();
	//  }, []);

	return (
		<SafeAreaProvider>
			<View className="flex-1 px-4 py-2">
				<SafeAreaView className="flex-1">
					<Text className="font-bold text-4xl py-1">Leaderboard</Text>
					<ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
						{/*<Text className="text-lg text-neutral-500 font-semibold">
            {stations.length} Stations
          </Text>

          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={stations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <StationCard
                  name={item.name}
                  wu_id={item.wu_id}
                  has_gold_star={hourlyMap.get(item.id)?.has_gold_star ?? false}                />
							)}
							contentContainerStyle={{ paddingBottom: 50 }}
              className="mt-4"
            />
          )}*/}
						<StationCard
							rank={1}
							name={"Brandon Britt"}
							streak={17}
							gold_stars={142}
							gold_star_status={"Gained a Star Today"}
						/>
						<StationCard
							rank={2}
							name={"Darren"}
							streak={12}
							gold_stars={67}
							gold_star_status={"Last Star since March 12"}
						/>
						<StationCard
							rank={3}
							name={"ITAS"}
							streak={0}
							gold_stars={43}
							gold_star_status={"Lost a Star Today"}
						/>
						<StationCardSkeleton />
					</ScrollView>
				</SafeAreaView>
			</View>
		</SafeAreaProvider>
	);
}
