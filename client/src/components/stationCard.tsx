import { Text, View } from "react-native";

type StationCardProps = {
	name: string;
	wu_id: string;
	has_gold_star: boolean;
};


export default function StationCard({name, wu_id, has_gold_star}: StationCardProps ){
  return (
    <View className="py-3 px-6 bg-neutral-300 rounded-[2em] my-1">
			<Text className="text-xl font-semibold">{name}</Text>
			<Text className="text-lg">{wu_id}</Text>
			{has_gold_star && <Text className="text-sm font-semibold text-yellow-500">Has a Gold Star</Text>}
    </View>
  );
}
