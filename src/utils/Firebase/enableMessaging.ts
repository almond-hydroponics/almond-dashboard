import firebase from 'firebase/compat/app';
import { getMessaging, getToken } from 'firebase/messaging';
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

const enableFirebaseMessaging = {
	//checking whether token is available in indexed DB
	tokenInLocalForage: async () => {
		return localforage.getItem('fcm_token');
	},
	//initializing firebase app
	init: async function () {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);

			try {
				const messaging = getMessaging();
				const tokenFoundInLocalForage = await this.tokenInLocalForage();
				//if FCM token is already there just return the token
				if (tokenFoundInLocalForage !== null) {
					return tokenFoundInLocalForage;
				}

				//requesting notification permission from browser
				const status = await Notification.requestPermission();

				if (status && status === 'granted') {
					//getting token from FCM
					const fcm_token = await getToken(messaging, {
						vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR,
					});
					if (fcm_token) {
						//setting FCM token in indexed db using localforage
						await localforage.setItem('fcm_token', fcm_token);
						console.log('fcm token', fcm_token); // eslint-disable-line no-console
						//return the FCM token after saving it
						return fcm_token;
						//TODO: Send the token to your server and update the UI if necessary
					}
				}
			} catch (error) {
				console.error(error); // eslint-disable-line no-console
				return null;
			}
		}
	},
};

export { enableFirebaseMessaging };
