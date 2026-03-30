import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

import StationInfoCard from "./stationInfoCard";

type StationCardProps = {
  rank: number;
  name: string;
  streak: number;
  goldStars: number;
  goldStarStatus?: "Gained" | "Streak Lost" | `Since ${string}`;
  weatherData: { temp: string; humidity: string; rainfall: string; dewpoint: string };
};

const statusConfig: Record<string, { bg: string; text: string; tint: string }> = {
  "Streak Lost": { bg: "bg-rose-500", text: "text-rose-950", tint: "#4d0218" },
  Gained: { bg: "bg-emerald-500", text: "text-emerald-950", tint: "#002c21" },
  default: { bg: "bg-neutral-400", text: "text-neutral-700", tint: "#404040" },
};

const rankColors: Record<number, string> = {
  1: "text-[#D4A827]",
  2: "text-[#8892A0]",
  3: "text-[#C48E5E]",
};

const rankBgColors: Record<number, string> = {
  1: "bg-[#D4A827]",
  2: "bg-[#8892A0]",
  3: "bg-[#C48E5E]",
};

const rankBorderColors: Record<number, string> = {
  1: "border-[#D4A827]",
  2: "border-[#8892A0]",
  3: "border-[#C48E5E]",
};

export default function StationCard({
  rank,
  name,
  streak,
  goldStars,
  goldStarStatus,
  weatherData,
}: StationCardProps) {
  const renderStatus = () => {
    if (!goldStarStatus) return null;
    const config = statusConfig[goldStarStatus] ?? statusConfig.default;
    return (
      <View className={`flex-row items-center ${config.bg} px-3 py-1 rounded-full gap-1`}>
        <SymbolView name={{ android: "star", web: "star" }} size={18} tintColor={config.tint} />
        <Text className={`font-semibold text-sm ${config.text}`}>{goldStarStatus}</Text>
      </View>
    );
  };

  return (
    <View
      className={`py-4 px-5 bg-[#faf7f5] rounded-[2em] my-2 border-2 ${rankBorderColors[rank] ?? "border-[#e7e2df]"}`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4 mb-1">
          <Text className={`text-4xl font-bold ${rankColors[rank] ?? "text-[#291334]"}`}>
            {rank}
          </Text>
          <Text className={`text-xl font-semibold ${rankColors[rank] ?? "text-[#291334]"}`}>
            {name}
          </Text>
        </View>
        {renderStatus()}
      </View>

      {/* Display Streak and Stars */}
      <View className="flex-row gap-4 my-1">
        {/* Streak Container */}
        <StationInfoCard title="Streak" data={streak} rank={rank} />
        {/* Gold Star Container */}
        <StationInfoCard title="Gold Stars" data={goldStars} rank={rank} />
      </View>

      {/* Divider */}
      <View className={`h-1 mt-4 mb-2 rounded ${rankBgColors[rank] ?? "bg-[#e7e2df]"}`} />
      <Text className={`text-lg font-semibold mb-2 ${rankColors[rank] ?? "text-[#291334]"}`}>
        Weather Conditions
      </Text>

      {/* Display Weather Data */}

      {/* First Row */}
      <View className="flex-row gap-4 mb-2">
        <StationInfoCard title="Temp" data={weatherData.temp} rank={rank} />
        <StationInfoCard title="Humidity" data={weatherData.humidity} rank={rank} />
      </View>

      {/* Second Row */}
      <View className="flex-row gap-4 mb-1">
        <StationInfoCard title="Rainfall" data={weatherData.rainfall} rank={rank} />
        <StationInfoCard title="Dewpoint" data={weatherData.dewpoint} rank={rank} />
      </View>
    </View>
  );
}
