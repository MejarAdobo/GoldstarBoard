import { Text, View, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Leaderboard() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 px-6 py-4">
        <ScrollView className="flex-1">
          <SafeAreaView className="flex-1">
            {/*Page Title*/}
						<Text className="font-bold text-4xl">Settings</Text>
						<Text className="text-lg text-neutral-500 font-semibold">Work in Progress</Text>
          </SafeAreaView>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}
