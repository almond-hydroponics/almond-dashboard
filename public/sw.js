if (!self.define) {
	const e = (e) => {
			'require' !== e && (e += '.js');
			let s = Promise.resolve();
			return (
				n[e] ||
					(s = new Promise(async (s) => {
						if ('document' in self) {
							const n = document.createElement('script');
							(n.src = e), document.head.appendChild(n), (n.onload = s);
						} else importScripts(e), s();
					})),
				s.then(() => {
					if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
					return n[e];
				})
			);
		},
		s = (s, n) => {
			Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e));
		},
		n = { require: Promise.resolve(s) };
	self.define = (s, i, a) => {
		n[s] ||
			(n[s] = Promise.resolve().then(() => {
				let n = {};
				const t = { uri: location.origin + s.slice(1) };
				return Promise.all(
					i.map((s) => {
						switch (s) {
							case 'exports':
								return n;
							case 'module':
								return t;
							default:
								return e(s);
						}
					}),
				).then((e) => {
					const s = a(...e);
					return n.default || (n.default = s), n;
				});
			}));
	};
}
define('./sw.js', ['./workbox-4a677df8'], function (e) {
	'use strict';
	importScripts(
		'worker-3Iu3P4RYvAB-U8y4OlJUm.js',
		'fallback-3Iu3P4RYvAB-U8y4OlJUm.js',
	),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/server/middleware-manifest.json',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/3Iu3P4RYvAB-U8y4OlJUm/_buildManifest.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/3Iu3P4RYvAB-U8y4OlJUm/_middlewareManifest.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/3Iu3P4RYvAB-U8y4OlJUm/_ssgManifest.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/0f1ac474-8c23a49bfe34cfc7.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/254-52b4c851062f97a2.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/29e84a2a-191ec15fae1ff987.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/36bcf0ca-b951eab3237ab9d9.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/4b358913-b7e409e688f53304.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/515-2eb9ffc60835a0b3.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/522-f6bdfd78d4d73780.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/616-604aac171b6c51fe.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/646-16516b0c697aca6c.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/712-f01846d15df51fc6.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/889-4e6fd57acaa49e57.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/framework-9f6bd8490fd3814a.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/main-bbc80f1a4cd9cd4a.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/404-1214fa238538285a.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/_app-0f6c9da552cfc910.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/_error-574d1c4eeb14dc33.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/_offline-e02603405ade5670.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/account-1095e9fe4c3e741d.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/dashboard-288c7691dafa4bf2.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/index-2b51fe69217671d3.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/pages/setup-device-5b205d35e7f3053b.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/chunks/webpack-920d248bbb187189.js',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/css/351d4020faf408f5.css',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/ajax-loader.0b80f665.gif',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-bold-webfont.6c9eaeff.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-medium-webfont.c31d5d9e.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-regular-webfont.5a0b539f.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-semibold-webfont.fb92d598.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-thin-webfont.2dce2483.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-ultralight-webfont.0087e0b0.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/slick.25572f22.eot',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/slick.653a4cbb.woff',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/slick.6aa1ee46.ttf',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{
					url: '/_next/static/media/slick.f895cfdf.svg',
					revision: '3Iu3P4RYvAB-U8y4OlJUm',
				},
				{ url: '/_offline', revision: '3Iu3P4RYvAB-U8y4OlJUm' },
				{ url: '/favicon.ico', revision: '67ce0ba915fb6292b5895ed92888d7ca' },
				{
					url: '/img/readme.png',
					revision: '1bc868835610f32abe3c0d8f09b95998',
				},
				{
					url: '/manifest.json',
					revision: 'adbca4e7fbd033c39233bfae9b2fc8d2',
				},
				{ url: '/robots.txt', revision: '466f5d83d25c9578375e389c93e4cac5' },
				{
					url: '/static/images/fallback.png',
					revision: '38e7c435a0fe48df4e951a158f1d213c',
				},
			],
			{ ignoreURLParametersMatching: [] },
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: s,
							event: n,
							state: i,
						}) =>
							s && 'opaqueredirect' === s.type
								? new Response(s.body, {
										status: 200,
										statusText: 'OK',
										headers: s.headers,
								  })
								: s,
					},
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET',
		);
});
