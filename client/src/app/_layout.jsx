import "../../global.css";
import { Stack } from "expo-router";
import { UnitsProvider } from "$lib/contexts/unitsContext";

export default function Layout() {
	return (
		<UnitsProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</UnitsProvider>
	);
}
