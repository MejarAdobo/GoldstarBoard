import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	Easing,
} from "react-native-reanimated";

function SkeletonCard({ opacity }) {
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<View className="p-6 rounded-[1.75em] my-2 bg-[#F5EDE0]">
			{/* Top row: rank badge + name */}
			<Animated.View style={animatedStyle} className="flex-row items-center gap-5 mb-2">
				<View className="w-16 h-14 bg-[#E8DCC8] rounded-[16px]" />
				<View className="w-32 h-7 bg-[#E8DCC8] rounded-lg" />
			</Animated.View>

			{/* Stats row: streak + gold stars */}
			<Animated.View
				style={animatedStyle}
				className="flex-row gap-4 my-1 items-center justify-center"
			>
				<View className="rounded-[16px] flex-row gap-2 items-center px-6 py-4 bg-[#FAF4E8]">
					<View className="w-7 h-7 bg-[#EAE0CE] rounded-full" />
					<View className="flex-col items-start gap-1">
						<View className="w-16 h-5 bg-[#EAE0CE] rounded-lg" />
						<View className="w-10 h-4 bg-[#EAE0CE] rounded-lg" />
					</View>
				</View>
				<View className="rounded-[16px] flex-row gap-2 items-center px-6 py-4 bg-[#FAF4E8]">
					<View className="w-7 h-7 bg-[#EAE0CE] rounded-full" />
					<View className="flex-col items-start gap-1">
						<View className="w-12 h-5 bg-[#EAE0CE] rounded-lg" />
						<View className="w-16 h-4 bg-[#EAE0CE] rounded-lg" />
					</View>
				</View>
			</Animated.View>

			{/* Weather toggle placeholder */}
			<Animated.View style={animatedStyle} className="mt-4">
				<View className="flex-row items-center justify-between p-4 rounded-[20px] bg-[#EAE0CE]">
					<View className="flex-row items-center gap-2">
						<View className="w-6 h-6 bg-[#E8DCC8] rounded-full" />
						<View className="w-36 h-4 bg-[#E8DCC8] rounded-lg" />
					</View>
					<View className="w-6 h-6 bg-[#E8DCC8] rounded-full" />
				</View>
			</Animated.View>
		</View>
	);
}

export default function StationCardSkeleton() {
	const opacity = useSharedValue(0.3);

	useEffect(() => {
		opacity.value = withRepeat(
			withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
			-1,
			true,
		);
	}, [opacity]);

	return (
		<View>
			<SkeletonCard opacity={opacity} />
			<SkeletonCard opacity={opacity} />
			<SkeletonCard opacity={opacity} />
		</View>
	);
}
