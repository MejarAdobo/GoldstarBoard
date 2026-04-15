import { colors } from "$lib/utils/theme";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function StationLink({ name, data }) {
	const [pressed, setPressed] = useState(false);
	return (
		<Link
			href={{
				pathname: `/station/${name}`,
				params: { dailyData: JSON.stringify(data) },
			}}
			asChild
		>
			<TouchableOpacity
				activeOpacity={0.7}
				onPressIn={() => setPressed(true)}
				onPressOut={() => setPressed(false)}
				className="py-8 px-6 my-2 rounded-[16px] flex-row justify-between items-center"
				style={{
					backgroundColor: pressed ? colors.activePressHighlight : colors.surfaceAlt,
				}}
			>
				<Text className={`text-2xl font-semibold text-[${colors.textPrimary}]`}>{name}</Text>
				<SymbolView
					name={{ android: "chevron_right", web: "chevron_right" }}
					size={28}
					tintColor={colors.textSecondary}
				/>
			</TouchableOpacity>
		</Link>
	);
}
