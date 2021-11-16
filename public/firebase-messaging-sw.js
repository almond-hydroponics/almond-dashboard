/* eslint-disable no-console */
importScripts(
	'https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js',
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: 'AIzaSyCukzXnPUBXARLloFWK8_72Y4aryTegW1A',
	authDomain: 'almond-re.firebaseapp.com',
	databaseURL: 'https://almond-re.firebaseio.com',
	projectId: 'almond-re',
	storageBucket: 'almond-re.appspot.com',
	messagingSenderId: '181012282167',
	appId: '1:181012282167:web:ffea9d24e6328d8eb278b2',
	measurementId: 'G-FSPYN0BC07',
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (payload) {
	console.log(
		'[firebase-messaging-sw.js] Received background message ',
		payload,
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo.png',
	};

	return self.registration.showNotification(
		notificationTitle,
		notificationOptions,
	);
});
