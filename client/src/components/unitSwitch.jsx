import { colors } from "$lib/utils/theme";
import { useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";

export default function UnitSwitch({ value = "metric", onChange }) {
	const [isImperial, setIsImperial] = useState(value === "imperial");
	const [thumbAnim] = useState(new Animated.Value(value === "imperial" ? 1 : 0));

	const toggle = () => {
		const next = !isImperial;
		setIsImperial(next);
		Animated.spring(thumbAnim, {
			toValue: next ? 1 : 0,
			useNativeDriver: false,
			friction: 8,
			tension: 60,
		}).start();
		onChange?.(next ? "imperial" : "metric");
	};

	const thumbLeft = thumbAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [3, 25],
	});

	const trackBg = thumbAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [colors.surface, colors.activePressHighlight],
	});

	const thumbBg = thumbAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [colors.textSubtle, colors.calendarTodayBorder],
	});

	return (
		<View className="flex-row items-center gap-2.5">
			<Text
				className="text-xs font-semibold"
				style={{
					color: !isImperial ? colors.textPrimary : colors.textSubtle,
				}}
			>
				Metric
			</Text>
			<Pressable onPress={toggle}>
				<Animated.View
					className="w-[52px] h-[30px] rounded-[15px] justify-center"
					style={{ backgroundColor: trackBg }}
				>
					<Animated.View
						className="absolute w-6 h-6 rounded-full top-[3px]"
						style={{ left: thumbLeft, backgroundColor: thumbBg }}
					/>
				</Animated.View>
			</Pressable>
			<Text
				className="text-xs font-semibold"
				style={{
					color: isImperial ? colors.textPrimary : colors.textSubtle,
				}}
			>
				Imperial
			</Text>
		</View>
	);
}
