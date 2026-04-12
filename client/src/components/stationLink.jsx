import { colors, bg, text } from "$lib/utils/theme";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Text, TouchableOpacity } from "react-native";

export default function StationLink({ name, data }) {
	return (
		<Link
			href={{
				pathname: `/station/${name}`,
				params: { dailyData: JSON.stringify(data) },
			}}
			asChild
		>
			<TouchableOpacity
				className={`py-8 px-6 my-2 ${bg(colors.surfaceAlt)} active:${bg(colors.activePressHighlight)} rounded-[16px] flex-row justify-between items-center`}
				activeOpacity={0.7}
			>
				<Text className={`text-2xl font-semibold ${text(colors.textPrimary)}`}>{name}</Text>
				<SymbolView
					name={{ android: "chevron_right", web: "chevron_right" }}
					size={28}
					tintColor={colors.textSecondary}
				/>
			</TouchableOpacity>
		</Link>
	);
}
