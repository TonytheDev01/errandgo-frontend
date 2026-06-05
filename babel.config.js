module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./src"],
					alias: {
						"@screens": "./src/screens",
						"@components": "./src/components",
						"@navigation": "./src/navigation",
						"@services": "./src/services",
						"@context": "./src/context",
						"@constants": "./src/constants",
						"@hooks": "./src/hooks",
					},
				},
			],
		],
	};
};
