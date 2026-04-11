import { Text, View } from "react-native";

const LEGEND = [
	{ color: "bg-[#34D399]", label: "Gained" },
	{ color: "bg-[#FBBF24]", label: "Maintained" },
	{ color: "bg-[#F87171]", label: "Lost Streak" },
	{ color: "bg-[#D4C4A8]", label: "No star" },
];

const STAT_ITEMS = [
	{ key: "gained", label: "Gained", bg: "bg-[#D4F5D0]", text: "text-[#1A6B18]" },
	{ key: "maintained", label: "Kept", bg: "bg-[#FFF4D6]", text: "text-[#7A5200]" },
	{ key: "lost", label: "Lost", bg: "bg-[#FDDDD6]", text: "text-[#BA1A1A]" },
	{ key: "nostar", label: "None", bg: "bg-[#E8DCC8]", text: "text-[#8B7355]" },
];

export function StarLegend() {
	return (
		<View className="flex-row flex-wrap gap-3 px-4 mx-auto mt-4 mb-6">
			{LEGEND.map((item) => (
				<View key={item.label} className="flex-row items-center gap-1.5">
					<View className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
					<Text className="text-[10px] font-medium text-[#6B5D3F]">{item.label}</Text>
				</View>
			))}
		</View>
	);
}

export default function StarSummary({ starData }) {
	const stats = Object.values(starData).reduce(
		(acc, status) => {
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		},
		{ gained: 0, maintained: 0, lost: 0, nostar: 0 },
	);

	return (
		<View className="mx-4 mt-3 bg-[#F5EDE0] rounded-[22px] p-6">
			<Text className="text-[15px] font-semibold text-[#6B5D3F] mb-3">
				{new Date().getFullYear()} Summary
			</Text>
			<View className="flex-row gap-1.5">
				{STAT_ITEMS.map((item) => (
					<View
						key={item.key}
						className={`flex-1 items-center py-3 px-2 rounded-[14px] ${item.bg}`}
					>
						<Text className={`text-lg font-bold font-mono ${item.text}`}>{stats[item.key]}</Text>
						<Text className="text-[10px] font-semibold text-[#6B5D3F] uppercase tracking-wider">
							{item.label}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}
