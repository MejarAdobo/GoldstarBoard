import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

import WeatherCondition from "./weatherCondition";

export default function WeatherToggle({ data, theme }) {
	const [open, setOpen] = useState(false);
	const rotation = useSharedValue(0);

	const toggleOpen = () => {
		setOpen(!open);
		rotation.value = withTiming(open ? 0 : 180, { duration: 300 });
	};

	const animatedChevron = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<View className="mt-4">
			<TouchableOpacity
				onPress={toggleOpen}
				className={`flex-row items-center justify-between p-4 ${
					open ? "rounded-t-[20px]" : "rounded-[20px]"
				}`}
				style={{ backgroundColor: theme.weatherBg }}
				activeOpacity={0.7}
			>
				<View className="flex-row items-center gap-2">
					<SymbolView name={{ android: "cloud", web: "cloud" }} size={24} tintColor={theme.icon} />
					<Text className={`text-sm font-semibold`} style={{ color: theme.containerText }}>
						Weather Conditions
					</Text>
				</View>

				<Animated.View style={animatedChevron}>
					<SymbolView
						name={{ android: "keyboard_arrow_down", web: "keyboard_arrow_down" }}
						size={24}
						tintColor={theme.icon}
					/>
				</Animated.View>
			</TouchableOpacity>

			{open && data?.temperature && (
				<Animated.View entering={FadeIn.duration(100)} exiting={FadeOut.duration(50)}>
					<WeatherCondition data={data} theme={theme} />
				</Animated.View>
			)}
		</View>
	);
}
