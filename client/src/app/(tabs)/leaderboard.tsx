import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { fetchStations, Station, fetchHourlyData, HourlyData } from "../../services/api";
import StationCard from "../../components/stationCard";

export default function Leaderboard() {
	const [stations, setStations] = useState<Station[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);

    const hourlyMap = new Map(hourlyData.map((h) => [h.station, h]));

  useEffect(() => {
    const loadStations = async () => {
      try {
				const stationData = await fetchStations();
				const hourlyData = await fetchHourlyData();
				setStations(stationData);
				setHourlyData(hourlyData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStations();
  }, []);

  return (
    <SafeAreaProvider>
      <View className="flex-1 px-6 py-2 rounded-[2em]">
        <SafeAreaView className="flex-1">
          <Text className="font-bold text-4xl">Leaderboard</Text>
          <Text className="text-lg text-neutral-500 font-semibold">
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
          )}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
