if (!self.define) {
	const e = (e) => {
			'require' !== e && (e += '.js');
			let s = Promise.resolve();
			return (
				a[e] ||
					(s = new Promise(async (s) => {
						if ('document' in self) {
							const a = document.createElement('script');
							(a.src = e), document.head.appendChild(a), (a.onload = s);
						} else importScripts(e), s();
					})),
				s.then(() => {
					if (!a[e]) throw new Error(`Module ${e} didn’t register its module`);
					return a[e];
				})
			);
		},
		s = (s, a) => {
			Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e));
		},
		a = { require: Promise.resolve(s) };
	self.define = (s, n, i) => {
		a[s] ||
			(a[s] = Promise.resolve().then(() => {
				let a = {};
				const c = { uri: location.origin + s.slice(1) };
				return Promise.all(
					n.map((s) => {
						switch (s) {
							case 'exports':
								return a;
							case 'module':
								return c;
							default:
								return e(s);
						}
					}),
				).then((e) => {
					const s = i(...e);
					return a.default || (a.default = s), a;
				});
			}));
	};
}
define('./sw.js', ['./workbox-4a677df8'], function (e) {
	'use strict';
	importScripts(
		'worker-gSRGxbGuFoWPvbcyab6jL.js',
		'fallback-gSRGxbGuFoWPvbcyab6jL.js',
	),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/server/middleware-manifest.json',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/0f1ac474-cfe9ac1423aa35cb.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/202-659ffd3bc727caab.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/254-90cd94ba9a3ca600.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/29e84a2a-1b3bd363734f7df2.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/36bcf0ca-b2fbda51e8b25a0f.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/4b358913-c43f657fd595c9a6.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/616-d058c11ed0b8e456.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/780-7352023c9ae8efeb.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/828-be75c5e3f4eed1cb.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/875-815a778e143b8028.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/984-572f184e27d9111a.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/991-bf2fd196a651be01.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/framework-9f6bd8490fd3814a.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/main-6cd72e900bbf83ab.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/404-dbbf057685d411e1.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/_app-6ac859797d292a3b.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/_error-beb5a8e52ee791c5.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/_offline-e02603405ade5670.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/account-cf3536998abb1bad.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/dashboard-8cf47b275ec3b5ea.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/index-e5da98adb1540b99.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/pages/setup-device-8811f070b4781f9b.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/chunks/webpack-920d248bbb187189.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/css/351d4020faf408f5.css',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/gSRGxbGuFoWPvbcyab6jL/_buildManifest.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/gSRGxbGuFoWPvbcyab6jL/_middlewareManifest.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/gSRGxbGuFoWPvbcyab6jL/_ssgManifest.js',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/ajax-loader.0b80f665.gif',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-bold-webfont.6c9eaeff.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-medium-webfont.c31d5d9e.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-regular-webfont.5a0b539f.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-semibold-webfont.fb92d598.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-thin-webfont.2dce2483.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-ultralight-webfont.0087e0b0.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/slick.25572f22.eot',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/slick.653a4cbb.woff',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/slick.6aa1ee46.ttf',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{
					url: '/_next/static/media/slick.f895cfdf.svg',
					revision: 'gSRGxbGuFoWPvbcyab6jL',
				},
				{ url: '/_offline', revision: 'gSRGxbGuFoWPvbcyab6jL' },
				{ url: '/favicon.ico', revision: '67ce0ba915fb6292b5895ed92888d7ca' },
				{
					url: '/firebase-messaging-sw.js',
					revision: 'f15c736d0fd1ff9ddd6d482114e41a85',
				},
				{
					url: '/img/readme.png',
					revision: '1bc868835610f32abe3c0d8f09b95998',
				},
				{ url: '/logo.png', revision: '5d1cafaef3836c84909371b8db8edbc1' },
				{
					url: '/manifest.json',
					revision: 'adbca4e7fbd033c39233bfae9b2fc8d2',
				},
				{ url: '/robots.txt', revision: '466f5d83d25c9578375e389c93e4cac5' },
				{
					url: '/static/images/fallback.png',
					revision: '38e7c435a0fe48df4e951a158f1d213c',
				},
				{
					url: '/swEnvBuild.js',
					revision: '3960e07944d7d441e69f17db65ae02c2',
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
							event: a,
							state: n,
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
