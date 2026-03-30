import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

type StationCardProps = {
  rank: number;
  name: string;
  streak: number;
  gold_stars: number;
  gold_star_status?: "Gained" | "Streak Lost" | `Since ${string}`;
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

const rankBorderColors: Record<number, string> = {
  1: "border-[#D4A827]",
  2: "border-[#8892A0]",
  3: "border-[#C48E5E]",
};

export default function StationCard({
  rank,
  name,
  streak,
  gold_stars,
  gold_star_status,
}: StationCardProps) {
  // got claude to refactor it and this allow me to apply different style toward different status message
  const renderStatus = () => {
    if (!gold_star_status) return null;
    const config = statusConfig[gold_star_status] ?? statusConfig.default;
    return (
      <View className={`flex-row items-center ${config.bg} px-3 py-1 rounded-full gap-1`}>
        <SymbolView name={{ android: "star", web: "star" }} size={18} tintColor={config.tint} />
        <Text className={`font-semibold text-sm ${config.text}`}>{gold_star_status}</Text>
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

      <View className="flex-row gap-4 my-1">
        {/* Streak Container */}
        <View
          className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em]"
          style={{ flex: 1 }}
        >
          <Text className={`text-lg ${rankColors[rank] ?? "text-zinc-200"}`}>Streak</Text>
          <Text className={`text-xl font-semibold ${rankColors[rank] ?? "text-zinc-200"}`}>
            {streak}
          </Text>
        </View>
        {/* Gold Star Container */}
        <View
          className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em]"
          style={{ flex: 1 }}
        >
          <Text className={`text-lg ${rankColors[rank] ?? "text-zinc-200"}`}>Gold Stars</Text>
          <Text className={`text-xl font-semibold ${rankColors[rank] ?? "text-zinc-200"}`}>
            {gold_stars}
          </Text>
        </View>
      </View>
    </View>
  );
}
