// next.config.js
const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const securityHeaders = [
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
];

module.exports = withPWA({
	swcMinify: true,
	reactStrictMode: true,
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development',
		runtimeCaching,
		// fallbacks: {
		//   image: '/static/images/fallback.png',
		// }
	},
	devIndicators: {
		autoPrerender: false,
	},
	images: {
		// disableStaticImages: true,
		domains: ['static.almondhydroponics.com', 'assets.maccarianagency.com'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/assets/scss/styles')],
	},
	eslint: {
		// Warning: If set to true, this allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	poweredByHeader: false,
	staticPageGenerationTimeout: 900,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
	experimental: {
		outputStandalone: true,
	},
	// async rewrites() {
	//   return [
	//     {
	//       source: '/api/:path*',
	//       destination: 'http://127.0.0.1:8060/api/:path*', // The :path parameter isn't used here so will be automatically passed in the query
	//     },
	//   ]
	// },
});
