import { createContext, useContext, useState } from "react";

const UnitsContext = createContext(undefined);

export function UnitsProvider({ children }) {
	const [units, setUnits] = useState("metric");

	return (
		<UnitsContext.Provider value={{ units, setUnits }}>
			{children}
		</UnitsContext.Provider>
	);
}

export function useUnits() {
	const context = useContext(UnitsContext);
	if (!context) {
		throw new Error("useUnits must be used within a UnitsProvider");
	}
	return context;
}
