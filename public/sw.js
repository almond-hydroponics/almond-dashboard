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
				const t = { uri: location.origin + s.slice(1) };
				return Promise.all(
					n.map((s) => {
						switch (s) {
							case 'exports':
								return a;
							case 'module':
								return t;
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
		'worker-JSjkgZDVshO4SqUWGSm5B.js',
		'fallback-JSjkgZDVshO4SqUWGSm5B.js',
	),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/JSjkgZDVshO4SqUWGSm5B/_buildManifest.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/JSjkgZDVshO4SqUWGSm5B/_ssgManifest.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/0f1ac474-be488b39f34b3ab2890c.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/238-45711adbc403c54fd74d.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/29e84a2a-2f5a6ff4de93b0bc7c8b.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/36bcf0ca-3c825c098ce8db943270.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/456-50e580dcee7dd634fe22.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/4b358913-e90c3fb3fe3ab625f07b.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/526-aa08a1fd66316e5d585d.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/724-365255f657e931db39d1.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/85-9217e99e4316d288eb37.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/920-60d56f1c60678438f650.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/978-63250fdfa3d95f86f77e.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/framework-2f612445bd50b211f15a.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/main-9a97b44ee283210a0192.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/404-2ce70da664876baf6c8f.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/_app-c4a7fda3e50f6f20cee9.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/_error-43742af47c2408c771fc.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/_offline-3b3bc4ee897c5b870abd.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/account-67d2103245dc841b545a.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/dashboard-49fd3ee836df3092d607.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/index-9e4c50bd3c23a53af382.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/pages/setup-device-95e044ec9c0a5382341b.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/chunks/webpack-367a0840ac8316ee6baa.js',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/css/b81a4877fc1daea74d2b.css',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-bold-webfont.eed30cdc0177edbcd6d3104e5db90e64.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-medium-webfont.80f11b1350ed94319f6e89ab9b030797.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-regular-webfont.aaaf0ea48fc61d23c842d6343f3a7538.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-semibold-webfont.9eb20167a53cc29eb615a2fe58667132.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-thin-webfont.695e7f778788c2565df1a291209c08b0.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-ultralight-webfont.35e87e7a8451daf8d12a0a6613a42c53.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{
					url: '/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf',
					revision: 'JSjkgZDVshO4SqUWGSm5B',
				},
				{ url: '/_offline', revision: 'JSjkgZDVshO4SqUWGSm5B' },
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
