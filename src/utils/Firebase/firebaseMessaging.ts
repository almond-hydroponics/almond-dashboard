/* eslint-disable no-console */
import {
	getMessaging,
	getToken,
	onMessage,
	deleteToken,
} from 'firebase/messaging';
import localforage from 'localforage';

const getMessagingObject = () => getMessaging();

const receiveMessage = () => {
	onMessage(getMessagingObject(), (payload) => {
		console.log(payload); // eslint-disable-line no-console
	});
};

const fetchToken = () => {
	getToken(getMessagingObject(), {
		vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR,
	})
		.then(async (currentToken) => {
			if (currentToken) {
				await localforage.setItem('fcm_token', currentToken);
				console.log('fcm token', currentToken);
			} else {
				console.log(
					'No registration token available. Request permission to generate one.',
				);
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
		});
};

const requestPermission = () => {
	Notification.requestPermission().then((permission) => {
		if (permission === 'granted') {
			console.log('Notification permission granted.');
			// TODO(developer): Retrieve a registration token for use with FCM.
			// ...
		} else {
			console.log('Unable to get permission to notify.');
		}
	});
};

const deleteFCMToken = () => {
	deleteToken(getMessagingObject())
		.then(() => {
			console.log('Token deleted.');
		})
		.catch((err) => {
			console.log('Unable to delete token. ', err);
		});
};

export { receiveMessage, fetchToken, requestPermission, deleteFCMToken };
