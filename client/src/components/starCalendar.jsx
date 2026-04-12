import { colors, statusColors } from "$lib/utils/theme";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Text, View, Pressable } from "react-native";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const formatDateKey = (year, month, day) => {
	return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getStartDay = (year, month) => {
	const day = new Date(year, month, 1).getDay();
	return (day + 6) % 7;
};

export default function StarCalendar({ starData, currentMonth, currentYear, onChangeMonth }) {
	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const startDay = getStartDay(currentYear, currentMonth);

	const now = new Date();
	const todayKey = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());

	const canGoNext =
		currentYear < now.getFullYear() ||
		(currentYear === now.getFullYear() && currentMonth < now.getMonth());

	const cells = [];
	for (let i = 0; i < startDay; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) cells.push(d);

	const remaining = 7 - (cells.length % 7);
	if (remaining < 7) {
		for (let i = 0; i < remaining; i++) cells.push(null);
	}

	const rows = [];
	for (let i = 0; i < cells.length; i += 7) {
		rows.push(cells.slice(i, i + 7));
	}

	return (
		<View>
			{/* Header */}
			<View className="flex-row items-center justify-between mb-2">
				<Pressable
					onPress={() => onChangeMonth(-1)}
					className={`rounded-[14px] p-2`}
					style={{ backgroundColor: colors.surfaceAlt }}
				>
					<ChevronLeft size={18} color={colors.textSecondary} />
				</Pressable>
				<View className="flex-row gap-1">
					<Text className={`font-extrabold text-base`} style={{ color: colors.textPrimary }}>
						{MONTHS[currentMonth]}
					</Text>
					<Text className={`font-extrabold text-base`} style={{ color: colors.textPrimary }}>
						{currentYear}
					</Text>
				</View>
				<Pressable
					onPress={() => canGoNext && onChangeMonth(1)}
					className={`rounded-[14px] p-2`}
					style={{ backgroundColor: colors.surfaceAlt, opacity: canGoNext ? 1 : 0.3 }}
				>
					<ChevronRight size={18} color={colors.textSecondary} />
				</Pressable>
			</View>

			{/* Weekday labels */}
			<View className="flex-row mb-1">
				{WEEKDAYS.map((wd) => (
					<View key={wd} className="flex-1 items-center py-1">
						<Text
							className={`text-[10px] font-semibold uppercase`}
							style={{ color: colors.textSubtle }}
						>
							{wd}
						</Text>
					</View>
				))}
			</View>

			{/* Day grid */}
			{rows.map((row, ri) => (
				<View key={ri} className="flex-row">
					{row.map((day, ci) => {
						if (!day) {
							return <View key={ci} className="flex-1" style={{ aspectRatio: 1 }} />;
						}

						const key = formatDateKey(currentYear, currentMonth, day);
						const dayColors = statusColors[starData[key]];
						const today = key === todayKey;

						return (
							<View
								key={ci}
								className="flex-1 items-center justify-center p-0.5"
								style={{ aspectRatio: 1 }}
							>
								<View
									// have to make it use pure css since nativewind render mess with the border radius
									style={{
										width: "100%",
										height: "100%",
										alignItems: "center",
										justifyContent: "center",
										borderRadius: 10,
										backgroundColor: dayColors?.bg,
										borderWidth: today ? 2 : 0,
										borderColor: today ? colors.calendarTodayBorder : "transparent",
									}}
								>
									<Text
										className={`text-sm ${dayColors ? `text-[${dayColors.text}] font-semibold` : `bg-[${colors.calendarNoDay}] font-semibold`} ${today ? `border-[${colors.calendarTodayBorder}] font-bold` : ""}`}
									>
										{day}
									</Text>
								</View>
							</View>
						);
					})}
				</View>
			))}
		</View>
	);
}
