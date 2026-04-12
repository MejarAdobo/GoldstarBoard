import "../../global.css";
import { UnitsProvider } from "$lib/contexts/unitsContext";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<UnitsProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</UnitsProvider>
	);
}
