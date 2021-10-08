export const peopleResponse = {
	success: true,
	message: 'User fetched successfully',
	data: [
		{
			roles: [
				{ _id: '5e4703d62faee61d8ede2d65', title: 'Random' },
				{
					_id: '5e555801465ca301b1143b90',
					title: 'Random',
				},
			],
			photo: 'photo',
			isVerified: true,
			devices: [{ _id: '5e4a57ffa04a6d8445b5885b', id: 'TEST' }],
			_id: '5ef359a217b19792a3f19ddc',
			name: 'Random User',
			email: 'random.user@gmail.com',
			currentRole: { _id: '5e555801465ca301b1143b90', title: 'Random' },
			createdAt: '2020-06-24T13:48:18.041Z',
			updatedAt: '2020-06-26T09:42:32.719Z',
			activeDevice: '5e4a57ffa04a6d8445b5885b',
		},
	],
};

export const personToUpdate = {
	_id: '5ef359a217b19792a3f19ddc',
	currentRole: {
		_id: '5e555801465ca301b1143b90',
		title: 'Test',
	},
};
