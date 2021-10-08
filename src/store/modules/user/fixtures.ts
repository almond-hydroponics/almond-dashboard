export const userDetails = {
	status: 'success',
	message: 'User fetched successfully',
	data: {
		_id: '5edcfe1fb1ccd100710d36a3',
		firstName: 'Almond',
		lastName: 'Froyo',
		email: 'testalmond@gmail.com',
		currentRole: {
			_id: '5e4703d62faee61d8ede2d65',
			title: 'User',
		},
		activeDevice: {
			verified: true,
			enabled: true,
			_id: '5e4a57ffa04a6d8445b5885b',
			id: 'ABC123',
			updatedAt: '2020-06-07T14:48:12.258Z',
			user: '5edcfe1fb1ccd100710d36a3',
		},
		roles: [
			{
				_id: '5e4703d62faee61d8ede2d65',
				title: 'User',
				description: 'Almond regular user with limited privileges',
				resourceAccessLevels: [
					{
						permissions: [
							{
								_id: '5e439ed9fd05da507ca0161c',
								type: 'Full Access',
							},
						],
						resource: {
							_id: '5e17d95fffb6541b6b909d3e',
							name: 'Analytics',
						},
					},
				],
			},
		],
		photo: 'peek-a-boo-photo',
		isVerified: true,
		devices: [
			{
				_id: '5e4a57ffa04a6d8445b5885b',
				id: 'ABC123',
				// verified: true,
				// enabled: true,
				// updatedAt: '2020-06-07T14:48:12.258Z',
				// user: '5edcfe1fb1ccd100710d36a3',
			},
		],
	},
};

export const editedUserDetailsPayload = {
	role: '5e555801465ca301b1143b90',
};
