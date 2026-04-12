// ── Helpers: build Tailwind classes from hex ──
export const bg = (hex) => `bg-[${hex}]`;
export const text = (hex) => `text-[${hex}]`;

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
	container: "bg-[#FFEDB8]",
	containerText: "text-[#271900]",
	badge: "bg-[#8B5E00]",
	badgeText: "text-[#FFFFFF]",
	statBg: "bg-[#FFF4D6]",
	accentText: "text-[#B07800]",
	weatherBg: "bg-[#FFE7A0]",
	weatherTiles: "bg-[#FFF0CC]",
	icon: "#B07800",
};

const silverRank = {
	container: "bg-[#E0E2EC]",
	containerText: "text-[#191C23]",
	badge: "bg-[#44474F]",
	badgeText: "text-[#FFFFFF]",
	statBg: "bg-[#EBEDF5]",
	accentText: "text-[#5A5D66]",
	weatherBg: "bg-[#D3D6E0]",
	weatherTiles: "bg-[#E4E6EF]",
	icon: "#5A5D66",
};

const bronzeRank = {
	container: "bg-[#FFDCC5]",
	containerText: "text-[#2C1600]",
	badge: "bg-[#8B4513]",
	badgeText: "text-[#FFFFFF]",
	statBg: "bg-[#FFEEDD]",
	accentText: "text-[#A05218]",
	weatherBg: "bg-[#FFD4B0]",
	weatherTiles: "bg-[#FFE8D5]",
	icon: "#A05218",
};

const defaultRank = {
	container: bg(colors.surface),
	containerText: text(colors.textPrimary),
	badge: bg(colors.border),
	badgeText: text(colors.badgeText),
	statBg: bg(colors.surfaceMuted),
	accentText: text(colors.textMuted),
	weatherBg: bg(colors.surfaceAlt),
	weatherTiles: bg(colors.surfaceSubtle),
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

// For starCalendar.jsx (bg is raw hex for style prop, text is Tailwind class)
export const statusColors = {
	gained: { bg: colors.statusGainedBg, text: text(colors.statusGainedText) },
	maintained: { bg: colors.statusMaintainedBg, text: text(colors.statusMaintainedText) },
	lost: { bg: colors.statusLostBg, text: text(colors.statusLostText) },
	nostar: { bg: colors.border, text: text(colors.textSubtle) },
};

// For goldStarStatus.jsx (bg and text are Tailwind classes, icon is raw hex)
export const goldStarStatusColors = {
	"Streak Lost": { bg: bg(colors.statusLostBg), text: text(colors.statusLostText), icon: colors.statusLostText },
	Gained: { bg: bg(colors.statusGainedBg), text: text(colors.statusGainedText), icon: colors.statusGainedText },
	default: { bg: bg(colors.statusMaintainedBg), text: text(colors.goldStarDefaultText), icon: colors.goldStarDefaultText },
};

// For starSummary.jsx legend
export const legend = [
	{ color: bg(colors.legendGained), label: "Gained" },
	{ color: bg(colors.legendMaintained), label: "Maintained" },
	{ color: bg(colors.legendLost), label: "Lost Streak" },
	{ color: bg(colors.legendNostar), label: "No star" },
];

// For starSummary.jsx stat items
export const statItems = [
	{ key: "gained", label: "Gained", bg: bg(colors.statusGainedBg), text: text(colors.statusGainedText) },
	{ key: "maintained", label: "Kept", bg: bg(colors.statusMaintainedBg), text: text(colors.statusMaintainedText) },
	{ key: "lost", label: "Lost", bg: bg(colors.statusLostBg), text: text(colors.statusLostText) },
	{ key: "nostar", label: "None", bg: bg(colors.border), text: text(colors.textSubtle) },
];
