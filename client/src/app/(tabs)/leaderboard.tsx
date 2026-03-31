import { useState, useEffect } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import StationCard from "../../components/stationCard";
import StationCardSkeleton from "../../components/stationCardSkeleton";
import { fetchStations, fetchDailyData, fetchHourlyData, fetchStreaks } from "../../services/api";

export default function Leaderboard() {
  // Task: Have a useEffect here to fetch Station, HourlyData, Streak, and DailyData
  // Task: Make a new object containing thr require information that the stationCard prop need
  // Task: Sort that station object by Streak and Total Gold Star later.
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // after finish polishing this, make it into a seperate component
    const loadStations = async () => {
      try {
        // fetching from the apis
        const stations = await fetchStations();
        const hourlyData = await fetchHourlyData();
        const dailyData = await fetchDailyData();
        const streaks = await fetchStreaks();

        // sort the stations here
        //
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
              {/*{stations.length} Stations*/}1 Station
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            className="rounded-[2em]"
          >
            {loading ? (
              <StationCardSkeleton />
            ) : (
              // put flatlist here
              <StationCard
                rank={1}
                name={"Brandon Britt"}
                streak={17}
                goldStars={142}
                goldStarStatus={"Gained"}
                weatherData={{ temp: "13", humidity: "49 %", rainfall: "0.00 mm", dewpoint: "0.6" }}
              />
            )}

            <StationCard
              rank={1}
              name={"Brandon Britt"}
              streak={17}
              goldStars={142}
              goldStarStatus={"Gained"}
              weatherData={{ temp: "13", humidity: "49 %", rainfall: "0.00 mm", dewpoint: "0.6" }}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
