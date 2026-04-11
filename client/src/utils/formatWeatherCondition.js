export const formatWeatherCondition = (data) => {
	return {
		temp: {
			metric: `${data.temperature.c}°C`,
			imperial: `${data.temperature.f}°F`,
			icon: "thermostat",
			title: "Temp",
		},
		humidity: { value: `${data.humidity.value}%`, icon: "humidity_percentage", title: "Humidity" },
		dewpoint: {
			metric: `${data.dewpoint.c}°C`,
			imperial: `${data.dewpoint.f}°F`,
			icon: "dew_point",
			title: "Dew Point",
		},
		uv: { value: data.uv, icon: "sunny", title: "UV Index" },
		wind_speed: {
			metric: `${data.wind.speed.kmh} kph`,
			imperial: `${data.wind.speed.mph} mph`,
			icon: "air",
			title: "Wind",
		},
		gust: {
			metric: `${data.wind.gust.kmh} kph`,
			imperial: `${data.wind.gust.mph} mph`,
			icon: "cyclone",
			title: "Gust",
		},
		precip_accum: {
			metric: `${data.precip_accum.mm} mm`,
			imperial: `${data.precip_accum.in} in`,
			icon: "water_drop",
			title: "Precip Accum",
		},
		precip_rate: {
			metric: `${data.precip_rate.mm} mm`,
			imperial: `${data.precip_rate.in} in`,
			icon: "rainy",
			title: "Precip Rate",
		},
		pressure: {
			metric: `${Math.round(data.pressure.hpa)} hPa`,
			imperial: `${data.pressure.inhg} in`,
			icon: "speed",
			title: "Pressure",
		},
	};
};
