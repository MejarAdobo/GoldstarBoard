import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					position: "absolute",
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					height: 100,
					paddingTop: 10,
					backgroundColor: "#F5EDE0",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Leaderboard",
					tabBarAccessibilityLabel: "Leaderboard",
					tabBarActiveTintColor: "#2C1F00",
					tabBarIcon: ({ color = "#6B5D3F" }) => (
						<SymbolView
							name={{
								android: "social_leaderboard",
								web: "social_leaderboard",
							}}
							size={28}
							tintColor={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="stations"
				options={{
					title: "Stations",
					tabBarAccessibilityLabel: "Stations",
					tabBarActiveTintColor: "#2C1F00",
					tabBarIcon: ({ color = "#6B5D3F" }) => (
						<SymbolView
							name={{ android: "location_on", web: "location_on" }}
							size={28}
							tintColor={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="records"
				options={{
					title: "Records",
					tabBarAccessibilityLabel: "Records",
					tabBarActiveTintColor: "#2C1F00",
					tabBarIcon: ({ color = "#6B5D3F" }) => (
						<SymbolView
							name={{ android: "leaderboard", web: "leaderboard" }}
							size={28}
							tintColor={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarAccessibilityLabel: "Settings",
					tabBarActiveTintColor: "#2C1F00",
					tabBarIcon: ({ color = "#6B5D3F" }) => (
						<SymbolView
							name={{ android: "settings", web: "settings" }}
							size={28}
							tintColor={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
