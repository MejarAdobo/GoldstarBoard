import { colors, legend, statItems } from "$lib/utils/theme";
import { Text, View } from "react-native";

export function StarLegend() {
	return (
		<View className="flex-row flex-wrap gap-3 px-4 mx-auto mt-4 mb-6">
			{legend.map((item) => (
				<View key={item.label} className="flex-row items-center gap-1.5">
					<View className={`w-2.5 h-2.5 rounded-sm`} style={{ backgroundColor: item.color }} />
					<Text className={`text-[10px] font-medium`} style={{ color: item.color }}>
						{item.label}
					</Text>
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
		<View className={`mx-4 mt-3 rounded-[22px] p-6`} style={{ backgroundColor: colors.surface }}>
			<Text className={`text-[15px] font-semibold mb-3`} style={{ color: colors.textSecondary }}>
				{new Date().getFullYear()} Summary
			</Text>
			<View className="flex-row gap-1.5">
				{statItems.map((item) => (
					<View
						key={item.key}
						className={`flex-1 items-center py-3 px-2 rounded-[14px]`}
						style={{ backgroundColor: item.bg }}
					>
						<Text className={`text-lg font-bold font-mono`} style={{ color: item.text }}>
							{stats[item.key]}
						</Text>
						<Text
							className={`text-[10px] font-semibold uppercase tracking-wider`}
							style={{ color: colors.textSecondary }}
						>
							{item.label}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}
