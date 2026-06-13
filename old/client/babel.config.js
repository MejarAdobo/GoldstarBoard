module.exports = function (api) {
	api.cache(true);
	return {
		presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						$lib: "./src", // this how svelte does it which I really like
					},
				},
			],
			"react-native-reanimated/plugin",
		],
	};
};
