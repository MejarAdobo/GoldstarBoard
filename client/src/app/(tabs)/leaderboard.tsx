import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { fetchStations, Station } from "../../services/api";
import StationCard from "../../components/stationCard";

export default function Leaderboard() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
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
                  wu_link={item.wu_link}
                  total_yearly_gold_star={item.total_yearly_gold_star}
                  last_day_since_gold_star={item.last_day_since_gold_star}
                />
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
