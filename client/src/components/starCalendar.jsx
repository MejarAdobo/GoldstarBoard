import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Text, View, Pressable } from "react-native";

const STATUS_COLOURS = {
	gained: { bg: "#D4F5D0", text: "text-[#1A6B18]" },
	maintained: { bg: "#FFF4D6", text: "text-[#7A5200]" },
	lost: { bg: "#FDDDD6", text: "text-[#BA1A1A]" },
	nostar: { bg: "#E8DCC8", text: "text-[#8B7355]" },
};

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

// 0=Sun, 1=Mon ... 6=Sat — shift so Monday=0
const getStartDay = (year, month) => {
	const day = new Date(year, month, 1).getDay();
	return (day + 6) % 7;
};

export default function StarCalendar({ starData, currentMonth, currentYear, onChangeMonth }) {
	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const startDay = getStartDay(currentYear, currentMonth);

	const now = new Date();
	const todayKey = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
	const maxKey = todayKey;

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
				<Pressable onPress={() => onChangeMonth(-1)} className="bg-[#EAE0CE] rounded-[14px] p-2">
					<ChevronLeft size={18} color="#6B5D3F" />
				</Pressable>
				<View className="flex-row gap-1">
					<Text className="text-[#2C1F00] font-extrabold text-base">{MONTHS[currentMonth]}</Text>
					<Text className="text-[#2C1F00] font-extrabold text-base">{currentYear}</Text>
				</View>
				<Pressable
					onPress={() => canGoNext && onChangeMonth(1)}
					className="bg-[#EAE0CE] rounded-[14px] p-2"
					style={{ opacity: canGoNext ? 1 : 0.3 }}
				>
					<ChevronRight size={18} color="#6B5D3F" />
				</Pressable>
			</View>

			{/* Weekday labels */}
			<View className="flex-row mb-1">
				{WEEKDAYS.map((wd) => (
					<View key={wd} className="flex-1 items-center py-1">
						<Text className="text-[#8B7355] text-[10px] font-semibold uppercase">{wd}</Text>
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
						const colours = STATUS_COLOURS[starData[key]];
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
										backgroundColor: colours?.bg,
										borderWidth: today ? 2 : 0,
										borderColor: today ? "#8B5E00" : "transparent",
									}}
								>
									<Text
										className={`text-sm ${colours ? `${colours.text} font-semibold` : "text-[#C4B89A] font-semibold"} ${today ? "text-[#8B5E00] font-bold" : ""}`}
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
