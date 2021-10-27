module.exports = {
	assetsDir: 'public/',
	skipComponentsWithoutExample: true,
	ignore: ['**/*index.tsx'],
	pagePerSection: true,
	usageMode: 'expand',
	template: {
		head: {
			scripts: [
				{
					src: 'https://kit.fontawesome.com/4c273e6d43.js',
				},
			],
			links: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css?family=Google+Sans:400,400i,500,500i,700,700i|Google+Sans+Display:400,400i,500,500i,700,700i&amp;subset=all',
				},
			],
		},
	},
	sections: [
		{
			name: 'Introduction',
			content: './.github/readme.md',
			sectionDepth: 1,
			exampleMode: 'hide',
			usageMode: 'hide',
		},
		{
			name: 'Atoms',
			sectionDepth: 2,
			exampleMode: 'collapse',
			usageMode: 'expand',
			components: './src/components/atoms/**/*.tsx',
		},
		{
			name: 'Molecules',
			sectionDepth: 2,
			exampleMode: 'collapse',
			usageMode: 'expand',
			components: './src/components/molecules/**/*.tsx',
		},
		{
			name: 'Organisms',
			sectionDepth: 2,
			exampleMode: 'collapse',
			usageMode: 'expand',
			components: './src/components/organisms/**/*.tsx',
		},
	],
};
