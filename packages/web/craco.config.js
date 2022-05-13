const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "../common"));

module.exports = {
	webpack: {
		configure: (webpackConfig, arg) => {
			const { isFound, match } = getLoader(
				webpackConfig,
				loaderByName("babel-loader")
			);
			if (isFound) {
				const include = Array.isArray(match.loader.include)
					? match.loader.include
					: [match.loader.include];

				match.loader.include = include.concat(packages);
			}

			return webpackConfig;
		},
		alias: {
			"@": path.resolve(__dirname, ".src/"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@enums": path.resolve(__dirname, "./src/enums"),
			"@mockdata": path.resolve(__dirname, "./src/mockdata"),
			"@constant": path.resolve(__dirname, "./src/constant"),
			"@containers": path.resolve(__dirname, "./src/containers"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@validationSchema": path.resolve(
				__dirname,
				"./src/validationSchema"
			),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@api": path.resolve(__dirname, "./src/api"),
		},
	},
};
