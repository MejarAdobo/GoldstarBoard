import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import StationCard from "../../components/stationCard";
import StationCardSkeleton from "../../components/stationCardSkeleton";
import { fetchStations, Station } from "../../services/api";

export default function Leaderboard() {
  const [stations, setStations] = useState<
    {
      rank: number;
      name: string;
      hotStreak: number;
      coldStreak: number;
      goldStars: number;
      goldStarStatus: "Gained" | "Streak Lost" | `Since ${string}` | null;
      weatherData: { temp: string; humidity: string; rainfall: string; dewpoint: string };
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // after finish polishing this, make it into a seperate component
    const loadStations = async () => {
      try {
        // fetching from the apis
        const stations = await fetchStations();

        // sort station
        const getMomentum = (s: Station) =>
          s.streak.current_hot_streak - s.streak.current_cold_streak;

        const sortedStations = stations
          .sort((a, b) => getMomentum(b) - getMomentum(a))
          .map((station, i, arr) => {
            station.rank =
              i === 0 || getMomentum(station) !== getMomentum(arr[i - 1]) ? i + 1 : arr[i - 1].rank;
            return station;
          });

        const stationStatsArr: {
          rank: number;
          name: string;
          hotStreak: number;
          coldStreak: number;
          goldStars: number;
          goldStarStatus: "Gained" | "Streak Lost" | `Since ${string}` | null;
          weatherData: { temp: string; humidity: string; rainfall: string; dewpoint: string };
        }[] = [];

        // assign the needed info
        sortedStations.forEach((station) => {
          stationStatsArr.push({
            rank: station.rank!,
            name: station.name,
            hotStreak: station.streak.current_hot_streak,
            coldStreak: station.streak.current_cold_streak,
            goldStars: station.total_yearly_gold_star,
            goldStarStatus: (station.latest_daily?.gold_star_status as "Gained" | "Streak Lost" | `Since ${string}`) ?? null,
            weatherData: station.hourly_data.weather_data as { temp: string; humidity: string; rainfall: string; dewpoint: string },
          });
        });
        setStations(stationStatsArr);
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
            <Text className="text-lg text-[#291334] font-semibold">{stations.length} Stations</Text>
          </View>
          {loading ? (
            <StationCardSkeleton />
          ) : (
            <FlatList
              data={stations}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
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
