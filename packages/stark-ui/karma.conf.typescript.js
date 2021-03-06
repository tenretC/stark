/**
 * Look in stark-testing for karma.conf.typescript.js
 */
const defaultKarmaCIConfig = require("./node_modules/@nationalbankbelgium/stark-testing/karma.conf.typescript.js").rawKarmaConfig;

const karmaTypescriptBundlerAliasResolution = {
	resolve: {
		alias: {
			// adapt the resolution of the stark-core module to the UMD module
			"@nationalbankbelgium/stark-core": "../../dist/packages-dist/stark-core/bundles/stark-core.umd.js",
			"@nationalbankbelgium/stark-core/testing": "../../dist/packages-dist/stark-core/bundles/stark-core-testing.umd.js",
			// adapt the resolution of the 3rd party modules used in stark-core
			"@ng-idle/core": "../stark-core/node_modules/@ng-idle/core/bundles/core.umd.js",
			"@ng-idle/keepalive": "../stark-core/node_modules/@ng-idle/keepalive/bundles/keepalive.umd.js",
			"@ngrx/store": "../stark-core/node_modules/@ngrx/store/bundles/store.umd.js",
			"@ngrx/effects": "../stark-core/node_modules/@ngrx/effects/bundles/effects.umd.js",
			"@ngx-translate/core": "../stark-core/node_modules/@ngx-translate/core/bundles/ngx-translate-core.umd.js",
			"@uirouter/angular": "../stark-core/node_modules/@uirouter/angular/_bundles/ui-router-ng2.js",
			"@uirouter/core": "../stark-core/node_modules/@uirouter/core/lib/index.js",
			"@uirouter/rx": "../stark-core/node_modules/@uirouter/rx/lib/index.js",
			cerialize: "../stark-core/node_modules/cerialize/index.js",
			"class-validator": "../stark-core/node_modules/class-validator/index.js",
			moment: "../stark-core/node_modules/moment/moment.js",
			ibantools: "../stark-core/node_modules/ibantools/build/ibantools.js"
		}
	}
};

// start customizing the KarmaCI configuration from stark-testing
const starkUiSpecificConfiguration = Object.assign({}, defaultKarmaCIConfig, {
	// change the module resolution for the KarmaTypescript bundler
	karmaTypescriptConfig: Object.assign(defaultKarmaCIConfig.karmaTypescriptConfig, {
		bundlerOptions: Object.assign(defaultKarmaCIConfig.karmaTypescriptConfig.bundlerOptions, karmaTypescriptBundlerAliasResolution)
	})
});

// export the configuration function that karma expects and simply return the stark configuration
module.exports = {
	default: function(config) {
		return config.set(starkUiSpecificConfiguration);
	},
	karmaTypescriptBundlerAliasResolution: karmaTypescriptBundlerAliasResolution
};
