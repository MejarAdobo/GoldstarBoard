import { useState, useEffect } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import StationCard from "../../components/stationCard";
import StationCardSkeleton from "../../components/stationCardSkeleton";
import { fetchStations, Station, fetchHourlyData, HourlyData } from "../../services/api";

export default function Leaderboard() {
  const [stations, setStations] = useState<Station[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);

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
      <View className="flex-1 px-4 py-2 bg-[#efeae6]">
        <SafeAreaView className="flex-1">
          <View className="py-1">
            <Text className="font-bold text-4xl py-1 text-[#291334]">Leaderboard</Text>
            <Text className="text-lg text-[#291334] font-semibold">
              {/*{stations.length} Stations*/} 4 Stations
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            className="rounded-[2em]"
          >
            {/*{loading ? (
          	<StationCardSkeleton />
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
            />
          )}*/}
            <StationCard
              rank={1}
              name={"Brandon Britt"}
              streak={17}
              gold_stars={142}
              gold_star_status={"Gained"}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
