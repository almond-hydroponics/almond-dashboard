import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseCloudMessaging = {
	tokenInLocalForage: async () => {
		return localforage.getItem('fcm_token');
	},

	init: async function () {
		firebase.initializeApp(firebaseConfig);

		try {
			if ((await this.tokenInLocalForage()) !== null) {
				return false;
			}

			// @ts-expect-error
			const messaging = firebase.messaging();
			await Notification.requestPermission();
			const token = await messaging.getToken();

			await localforage.setItem('fcm_token', token);
			console.log('fcm_token', token);
		} catch (error) {
			console.error(error);
		}
	},
};

export default firebaseCloudMessaging;
