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
				className="py-8 px-6 my-2 bg-[#EAE0CE] active:bg-[#FFE7A0] rounded-[16px] flex-row justify-between items-center"
				activeOpacity={0.7}
			>
				<Text className="text-2xl font-semibold text-[#2C1F00]">{name}</Text>
				<SymbolView
					name={{ android: "chevron_right", web: "chevron_right" }}
					size={28}
					tintColor={"#6B5D3F"}
				/>
			</TouchableOpacity>
		</Link>
	);
}
