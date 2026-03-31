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
	}, [opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<View className="py-4 px-5 bg-[#faf7f5] rounded-[2em] my-2 border-2 border-[#e7e2df]">
			{/* Top row: rank + name placeholders */}
			<Animated.View style={animatedStyle} className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-2">
					<View className="w-10 h-10 bg-neutral-300 rounded-lg" />
					<View className="w-32 h-6 bg-neutral-300 rounded-lg" />
				</View>
				<View className="w-24 h-6 bg-neutral-300 rounded-full" />
			</Animated.View>

			{/* Bottom row: streak + gold stars placeholders */}
			<Animated.View style={animatedStyle} className="flex-row gap-4 my-1">
				<View
					className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-zinc-600 rounded-lg" />
					<View className="w-10 h-6 bg-zinc-600 rounded-lg" />
				</View>
				<View
					className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-zinc-600 rounded-lg" />
					<View className="w-10 h-6 bg-zinc-600 rounded-lg" />
				</View>
			</Animated.View>

			{/* Divider placeholder */}
			<Animated.View style={animatedStyle}>
				<View className="h-1 mt-4 mb-2 rounded bg-neutral-300" />
			</Animated.View>

			{/* Weather Conditions title placeholder */}
			<Animated.View style={animatedStyle}>
				<View className="w-40 h-5 bg-neutral-300 rounded-lg mb-2" />
			</Animated.View>

			{/* First weather row: temp + humidity placeholders */}
			<Animated.View style={animatedStyle} className="flex-row gap-4 mb-2">
				<View
					className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-zinc-600 rounded-lg" />
					<View className="w-10 h-6 bg-zinc-600 rounded-lg" />
				</View>
				<View
					className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-zinc-600 rounded-lg" />
					<View className="w-10 h-6 bg-zinc-600 rounded-lg" />
				</View>
			</Animated.View>

			{/* Second weather row: rainfall + dewpoint placeholders */}
			<Animated.View style={animatedStyle} className="flex-row gap-4 mb-1">
				<View
					className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-zinc-600 rounded-lg" />
					<View className="w-10 h-6 bg-zinc-600 rounded-lg" />
				</View>
				<View
					className="bg-zinc-800 px-6 py-4 flex-col items-center rounded-[1.5em] gap-1"
					style={{ flex: 1 }}
				>
					<View className="w-16 h-5 bg-zinc-600 rounded-lg" />
					<View className="w-10 h-6 bg-zinc-600 rounded-lg" />
				</View>
			</Animated.View>
		</View>
	);
}
