// ── Base palette (single source of truth) ──
export const colors = {
	// Backgrounds
	pageBg: "#FFF9F0",
	surface: "#F5EDE0",
	surfaceMuted: "#FAF4E8",
	surfaceAlt: "#EAE0CE",
	surfaceSubtle: "#F2EADB",
	border: "#E8DCC8",
	activePressHighlight: "#FFE7A0",

	// Text
	textPrimary: "#2C1F00",
	textSecondary: "#6B5D3F",
	textMuted: "#7A6B50",
	textSubtle: "#8B7355",
	badgeText: "#5C4D33",

	// Skeleton
	skeletonShimmer: "#D9CFBC",

	// Calendar
	calendarNoDay: "#C4B89A",
	calendarTodayBorder: "#8B5E00",

	// Status
	statusGainedBg: "#D4F5D0",
	statusGainedText: "#1A6B18",
	statusMaintainedBg: "#FFF4D6",
	statusMaintainedText: "#7A5200",
	statusLostBg: "#FDDDD6",
	statusLostText: "#BA1A1A",
	goldStarDefaultText: "#6B4A00",

	// Legend dots (saturated variants)
	legendGained: "#34D399",
	legendMaintained: "#FBBF24",
	legendLost: "#F87171",
	legendNostar: "#D4C4A8",

	// Streak icons
	streakHot: "#D84315",
	streakCold: "#1565C0",
};

// ── Rank palettes ──

const goldRank = {
	container: "#FFEDB8",
	containerText: "#271900",
	badge: "#8B5E00",
	badgeText: "#FFFFFF",
	statBg: "#FFF4D6",
	accentText: "#B07800",
	weatherBg: "#FFE7A0",
	weatherTiles: "#FFF0CC",
	icon: "#B07800",
};

const silverRank = {
	container: "#E0E2EC",
	containerText: "#191C23",
	badge: "#44474F",
	badgeText: "#FFFFFF",
	statBg: "#EBEDF5",
	accentText: "#5A5D66",
	weatherBg: "#D3D6E0",
	weatherTiles: "#E4E6EF",
	icon: "#5A5D66",
};

const bronzeRank = {
	container: "#FFDCC5",
	containerText: "#2C1600",
	badge: "#8B4513",
	badgeText: "#FFFFFF",
	statBg: "#FFEEDD",
	accentText: "#A05218",
	weatherBg: "#FFD4B0",
	weatherTiles: "#FFE8D5",
	icon: "#A05218",
};

const defaultRank = {
	container: colors.surface,
	containerText: colors.textPrimary,
	badge: colors.border,
	badgeText: colors.badgeText,
	statBg: colors.surfaceMuted,
	accentText: colors.textMuted,
	weatherBg: colors.surfaceAlt,
	weatherTiles: colors.surfaceSubtle,
	icon: colors.textMuted,
};

export const getRankColors = (rank) => {
	switch (rank) {
		case 1:
			return goldRank;
		case 2:
			return silverRank;
		case 3:
			return bronzeRank;
		default:
			return defaultRank;
	}
};

// ── Pre-built consumer objects ──

// For starCalendar.jsx
export const statusColors = {
	gained: { bg: colors.statusGainedBg, text: colors.statusGainedText },
	maintained: { bg: colors.statusMaintainedBg, text: colors.statusMaintainedText },
	lost: { bg: colors.statusLostBg, text: colors.statusLostText },
	nostar: { bg: colors.border, text: colors.textSubtle },
};

// For goldStarStatus.jsx
export const goldStarStatusColors = {
	"Streak Lost": {
		bg: colors.statusLostBg,
		text: colors.statusLostText,
		icon: colors.statusLostText,
	},
	Gained: {
		bg: colors.statusGainedBg,
		text: colors.statusGainedText,
		icon: colors.statusGainedText,
	},
	default: {
		bg: colors.statusMaintainedBg,
		text: colors.goldStarDefaultText,
		icon: colors.goldStarDefaultText,
	},
};

// For starSummary.jsx legend
export const legend = [
	{ color: colors.legendGained, label: "Gained" },
	{ color: colors.legendMaintained, label: "Maintained" },
	{ color: colors.legendLost, label: "Lost Streak" },
	{ color: colors.legendNostar, label: "No star" },
];

// For starSummary.jsx stat items
export const statItems = [
	{ key: "gained", label: "Gained", bg: colors.statusGainedBg, text: colors.statusGainedText },
	{
		key: "maintained",
		label: "Kept",
		bg: colors.statusMaintainedBg,
		text: colors.statusMaintainedText,
	},
	{ key: "lost", label: "Lost", bg: colors.statusLostBg, text: colors.statusLostText },
	{ key: "nostar", label: "None", bg: colors.border, text: colors.textSubtle },
];
