import { Text, View } from "react-native";

const rankColors = {
	1: "text-[#D4A827]",
	2: "text-[#8892A0]",
	3: "text-[#C48E5E]",
};

export default function StationInfoCard({ title, data, rank }) {
	return (
		<View
			className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em]"
			style={{ flex: 1 }}
		>
			<Text className={`text-lg ${rankColors[rank] ?? "text-zinc-200"}`}>{title}</Text>
			<Text className={`text-xl font-semibold ${rankColors[rank] ?? "text-zinc-200"}`}>{data}</Text>
		</View>
	);
}
