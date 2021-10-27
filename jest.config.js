module.exports = {
	verbose: true,
	roots: ['<rootDir>/src'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.json',
		},
	},
	moduleDirectories: ['utils', 'modules', 'node_modules'],
	coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
	collectCoverage: true,
	collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
	// coverageThreshold: {
	// 	global: {
	// 		branches: 10,
	// 		functions: 15,
	// 		lines: 25,
	// 		statements: 20,
	// 	},
	// },
	moduleNameMapper: {
		// Handle CSS imports (with CSS modules)
		// https://jestjs.io/docs/webpack#mocking-css-modules
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

		// Handle image imports
		// https://jestjs.io/docs/webpack#handling-static-assets
		'^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

		// Handle module aliases
		// '^@/components/(.*)$': '<rootDir>/components/$1',
		'@utils/(.*)$': '<rootDir>/src/utils/$1',
		'@modules/(.*)$': '<rootDir>/src/store/modules/$1',
		'@components/(.*)$': '<rootDir>src/components/$1',
		'@pages/(.*)$': '<rootDir>src/pages/$1',
		'@context/(.*)$': '<rootDir>src/context/$1',
		'@hooks/(.*)$': '<rootDir>src/hooks/$1',
		'@view/(.*)$': '<rootDir>src/view/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/.next/',
		'<rootDir>/.yarn',
	],
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	testEnvironment: 'jsdom',
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$',
		'node_modules/(?!(@material-ui)/)',
		'/.pnp.js$',
		'^.+\\.module\\.(css|sass|scss)$',
	],
};
