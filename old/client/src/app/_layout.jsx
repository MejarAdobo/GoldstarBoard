import "../../global.css";
import { UnitsProvider } from "$lib/contexts/unitsContext";
import { colors } from "$lib/utils/theme";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<UnitsProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTintColor: colors.text,
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</UnitsProvider>
	);
}
