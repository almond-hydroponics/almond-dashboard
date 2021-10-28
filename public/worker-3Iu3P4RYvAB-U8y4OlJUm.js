(() => {
	'use strict';
	var e = [
			,
			(e, t, n) => {
				function o() {}
				n.r(t), n.d(t, { util: () => o });
			},
		],
		t = {};
	function n(o) {
		var i = t[o];
		if (void 0 !== i) return i.exports;
		var l = (t[o] = { exports: {} });
		return e[o](l, l.exports, n), l.exports;
	}
	(n.d = (e, t) => {
		for (var o in t)
			n.o(t, o) &&
				!n.o(e, o) &&
				Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
	}),
		(n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
		(n.r = (e) => {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(e, '__esModule', { value: !0 });
		});
	var o = {};
	n.r(o),
		(0, n(1).util)(),
		self.addEventListener('message', (e) => {
			console.log(null == e ? void 0 : e.data);
		}),
		self.addEventListener('push', (e) => {
			const t = JSON.parse((null == e ? void 0 : e.data.text()) || '{}');
			null == e ||
				e.waitUntil(
					self.registration.showNotification(t.title, {
						body: t.message,
						icon: '/icons/android-chrome-192x192.png',
					}),
				);
		}),
		self.addEventListener('notificationclick', (e) => {
			null == e || e.notification.close(),
				null == e ||
					e.waitUntil(
						self.clients
							.matchAll({ type: 'window', includeUncontrolled: !0 })
							.then(function (e) {
								if (e.length > 0) {
									let t = e[0];
									for (let n = 0; n < e.length; n++)
										e[n].focused && (t = e[n]);
									return t.focus();
								}
								return self.clients.openWindow('/');
							}),
					);
		});
})();
