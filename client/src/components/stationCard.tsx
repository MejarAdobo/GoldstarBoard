import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

type StationCardProps = {
	rank: number;
	name: string;
	streak: number;
	gold_stars: number;
	gold_star_status?: "Gained a Star Today" | "Lost a Star Today" | `Last Star since ${string}`;
};

export default function StationCard({
	rank,
	name,
	streak,
	gold_stars,
	gold_star_status,
}: StationCardProps) {
	const renderStatus = () => {
		if (gold_star_status === "Lost a Star Today") {
			return (
				<View className="flex-row items-center bg-red-400 px-3 py-1 rounded-full gap-1">
					<SymbolView
						name={{
							android: "remove",
							web: "remove",
						}}
						size={12}
						tintColor={"red"}
					/>
					<Text className="font-semibold text-sm text-red-700">{gold_star_status}</Text>
				</View>
			);
		}
		if (gold_star_status === "Gained a Star Today") {
			return (
				<View className="flex-row items-center bg-green-400 px-3 py-1 rounded-full gap-1">
					<SymbolView
						name={{
							android: "add",
							web: "add",
						}}
						size={12}
						tintColor={"green"}
					/>
					<Text className="font-semibold text-sm text-green-700">{gold_star_status}</Text>
				</View>
			);
		}
		if (gold_star_status) {
			return (
				<Text className="font-semibold text-sm text-neutral-700 bg-neutral-400 px-3 py-1 rounded-full">
					{gold_star_status}
				</Text>
			);
		}
		return null;
	};

	return (
		<View className="py-4 px-5 bg-neutral-300 rounded-[2em] my-2">
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-2">
					<Text className="text-4xl font-bold">{rank}</Text>
					<Text className="text-xl font-semibold">{name}</Text>
				</View>
				{renderStatus()}
			</View>

			<View className="flex-row gap-4 my-1">
				{/* Streak Container */}
				<View
					className="bg-slate-400 px-6 py-4 flex-col items-center rounded-[1.5em]"
					style={{ flex: 1 }}
				>
					<Text className="text-lg">Streak</Text>
					<Text className="text-xl font-bold">{streak}</Text>
				</View>
				{/* Gold Star Container */}
				<View
					className="bg-slate-400 px-6 py-4 flex-col items-center rounded-[1.5em]"
					style={{ flex: 1 }}
				>
					<Text className="text-lg">Gold Stars</Text>
					<Text className="text-xl font-bold">{gold_stars}</Text>
				</View>
			</View>
		</View>
	);
}
