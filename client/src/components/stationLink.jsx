import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function StationLink({ name }) {
	return (
		<View>
			<Link href={`/station/${name}`}>
				<Text>{name}</Text>
			</Link>
		</View>
	);
}
