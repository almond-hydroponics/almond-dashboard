import { createContext } from 'react';

const UserContext = createContext({
	_id: '',
	name: '',
	email: '',
	photo: '',
	isVerified: true,
	devices: [
		{
			_id: '',
			id: '',
			verified: false,
			enabled: false,
			user: '',
			updatedAt: '',
		},
	],
	activeDevice: {
		id: '',
		_id: '',
	},
	isAdmin: false,
});

export { UserContext };
