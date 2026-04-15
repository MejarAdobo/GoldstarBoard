import { colors } from "$lib/utils/theme";
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
		<View className={`p-6 rounded-[1.75em] my-2`} style={{ backgroundColor: colors.surface }}>
			{/* Top row: rank badge + name */}
			<Animated.View style={animatedStyle} className="flex-row items-center gap-5 mb-2">
				<View className={`w-16 h-14 rounded-[16px]`} style={{ backgroundColor: colors.border }} />
				<View className={`w-32 h-7 rounded-lg`} style={{ backgroundColor: colors.border }} />
			</Animated.View>

			{/* Stats row: streak + gold stars */}
			<Animated.View
				style={animatedStyle}
				className="flex-row gap-4 my-1 items-center justify-center"
			>
				<View
					className={`rounded-[16px] flex-row gap-2 items-center px-6 py-4`}
					style={{ backgroundColor: colors.surfaceMuted }}
				>
					<View className={`w-7 h-7 rounded-full`} style={{ backgroundColor: colors.surfaceAlt }} />
					<View className="flex-col items-start gap-1">
						<View
							className={`w-16 h-5 rounded-lg`}
							style={{ backgroundColor: colors.surfaceAlt }}
						/>
						<View
							className={`w-10 h-4 rounded-lg`}
							style={{ backgroundColor: colors.surfaceAlt }}
						/>
					</View>
				</View>
				<View
					className={`rounded-[16px] flex-row gap-2 items-center px-6 py-4`}
					style={{ backgroundColor: colors.surfaceMuted }}
				>
					<View className={`w-7 h-7 rounded-full`} style={{ backgroundColor: colors.surfaceAlt }} />
					<View className="flex-col items-start gap-1">
						<View
							className={`w-12 h-5 rounded-lg`}
							style={{ backgroundColor: colors.surfaceAlt }}
						/>
						<View
							className={`w-16 h-4 rounded-lg`}
							style={{ backgroundColor: colors.surfaceAlt }}
						/>
					</View>
				</View>
			</Animated.View>

			{/* Weather toggle placeholder */}
			<Animated.View style={animatedStyle} className="mt-4">
				<View
					className={`flex-row items-center justify-between p-4 rounded-[20px]`}
					style={{ backgroundColor: colors.surfaceAlt }}
				>
					<View className="flex-row items-center gap-2">
						<View className={`w-6 h-6 rounded-full`} style={{ backgroundColor: colors.border }} />
						<View className={`w-36 h-4 rounded-lg`} style={{ backgroundColor: colors.border }} />
					</View>
					<View className={`w-6 h-6 rounded-full`} style={{ backgroundColor: colors.border }} />
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
