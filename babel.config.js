module.exports = (api) => {
	// This caches the Babel config
  api.cache(true);
	return {
		presets: ['@babel/preset-env', '@babel/preset-react'],
		// Applies the react-refresh Babel plugin on non-production modes only
		// ...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
		env: {
			test: {
				plugins: ['dynamic-import-node'],
			},
		},
		plugins: [
			'add-module-exports',
			'syntax-dynamic-import',
			'dynamic-import-node',
			'@babel/plugin-proposal-class-properties',
			'@babel/syntax-dynamic-import',
			[
				'@babel/plugin-transform-react-jsx',
				{
					runtime: 'automatic',
				},
			],
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@component': './src/components/',
						'@views': './src/views/',
						'@modules': './src/store/modules/',
						'@utils': './src/utils/',
						'@context': './src/context/',
						'@hooks': './src/hooks/',
					},
				},
			],
		],
	};
};
