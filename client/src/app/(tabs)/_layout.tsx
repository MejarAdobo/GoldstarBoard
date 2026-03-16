import { SymbolView } from "expo-symbols";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 105,
          paddingTop: 15,
          // backgroundColor: "#1a1a1a",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarAccessibilityLabel: "Leaderboard",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ android: "social_leaderboard", web: "social_leaderboard" }} size={28} tintColor={color} />
          ),
          // tabBarActiveTintColor: "red",
        }}
      />
      <Tabs.Screen
        name="stations"
        options={{
          title: "Stations",
          tabBarAccessibilityLabel: "Stations",
          tabBarIcon: ({ color }) => <SymbolView name={{ android: "location_on", web: "location_on" }} size={28} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: "Records",
          tabBarAccessibilityLabel: "Records",
          tabBarIcon: ({ color }) => <SymbolView name={{ android: "leaderboard", web: "leaderboard" }} size={28} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarAccessibilityLabel: "Settings",
          tabBarIcon: ({ color }) => <SymbolView name={{ android: "settings", web: "settings" }} size={28} tintColor={color} />,
        }}
      />
    </Tabs>
  );
}
