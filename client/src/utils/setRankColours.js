export const getRankColours = (rank) => {
	switch (rank) {
		case 1:
			return {
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
		case 2:
			return {
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
		case 3:
			return {
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
		default:
			return {
				container: "bg-[#F5EDE0]",
				containerText: "text-[#2C1F00]",
				badge: "bg-[#E8DCC8]",
				badgeText: "text-[#5C4D33]",
				statBg: "bg-[#FAF4E8]",
				accentText: "text-[#7A6B50]",
				weatherBg: "bg-[#EAE0CE]",
				weatherTiles: "bg-[#F2EADB]",
				icon: "#7A6B50",
			};
	}
};
