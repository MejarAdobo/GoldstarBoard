import { Text, View } from "react-native";

type StationCardProps = {
	name: string;
	wu_id: string;
	wu_link: string;
	total_yearly_gold_star: number;
	last_day_since_gold_star: string | null;
};


export default function StationCard({name, wu_id, wu_link, total_yearly_gold_star, last_day_since_gold_star}: StationCardProps ){
  return (
    <View className="py-2 px-4 bg-neutral-300 rounded-[2em]">
			<Text className="text-xl font-semibold">{name}</Text>
			<Text className="text-lg">{wu_id}</Text>
			<Text className="text-sm">{wu_link}</Text>
			<Text className="text-sm">Total Gold Stars: {total_yearly_gold_star}</Text>
			<Text className="text-sm">Last Day Since Gold Star: {last_day_since_gold_star}</Text>
    </View>
  );
}
