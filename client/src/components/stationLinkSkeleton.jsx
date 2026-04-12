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

function SkeletonLink({ opacity }) {
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View
			style={[animatedStyle, { backgroundColor: colors.surfaceAlt }]}
			className={`py-8 px-6 my-2 rounded-[16px] flex-row justify-between items-center`}
		>
			<View className={`w-40 h-7 rounded-lg`} style={{ backgroundColor: colors.skeletonShimmer }} />
			<View
				className={`w-7 h-7 rounded-full`}
				style={{ backgroundColor: colors.skeletonShimmer }}
			/>
		</Animated.View>
	);
}

export default function StationLinkSkeleton() {
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
			<SkeletonLink opacity={opacity} />
			<SkeletonLink opacity={opacity} />
			<SkeletonLink opacity={opacity} />
			<SkeletonLink opacity={opacity} />
			<SkeletonLink opacity={opacity} />
		</View>
	);
}
