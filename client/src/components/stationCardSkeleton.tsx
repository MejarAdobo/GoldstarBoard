import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	Easing,
} from "react-native-reanimated";

export default function StationCardSkeleton() {
	const opacity = useSharedValue(0.3);

	useEffect(() => {
		opacity.value = withRepeat(
			withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
			-1,
			true,
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<View className="py-4 px-5 bg-neutral-300 rounded-[2em] my-2">
			{/* Top row: rank + name placeholders */}
			<Animated.View style={animatedStyle} className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-2">
					<View className="w-10 h-10 bg-neutral-400 rounded-lg" />
					<View className="w-32 h-6 bg-neutral-400 rounded-lg" />
				</View>
				<View className="w-24 h-6 bg-neutral-400 rounded-full" />
			</Animated.View>

			{/* Bottom row: streak + gold stars placeholders */}
			<Animated.View style={animatedStyle} className="flex-row gap-4 my-1">
				<View
					className="bg-slate-400 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-neutral-300 rounded-lg" />
					<View className="w-10 h-6 bg-neutral-300 rounded-lg" />
				</View>
				<View
					className="bg-slate-400 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-neutral-300 rounded-lg" />
					<View className="w-10 h-6 bg-neutral-300 rounded-lg" />
				</View>
			</Animated.View>
		</View>
	);
}
