export const userRoles = [
	{
		description: 'default description',
		_id: '5e439f32fd05da507edn3k49',
		resourceAccessLevels: [
			{
				permissions: [
					{
						_id: '5e439ed9fd05da507ca0161c',
						type: 'Full Access',
					},
					{
						_id: '5e44f86b2eeeee195403efcb',
						type: 'View',
					},
					{
						_id: '5e456d694df0c437590ebc3e',
						type: 'Edit',
					},
					{
						_id: '5e439f32fd05da507ca0161e',
						type: 'Add',
					},
					{
						_id: '5e45bc5228c0d70f4a9363a3',
						type: 'Delete',
					},
				],
				resource: {
					_id: '5e45bc5228c0d70f4a9363ae',
					name: 'People',
				},
				_id: '5e45bc5228c0d70f4a93g3a3',
			},
		],
		title: 'User',
		users: 1,
		userCount: 1,
		deleted: false,
	},
	{
		description: 'default description',
		_id: '5e439f32fd05da507cdk3k49',
		resourceAccessLevels: [
			{
				permissions: [
					{
						_id: '5e439ed9fd05da507ca0161c',
						type: 'Full Access',
					},
					{
						_id: '5e44f86b2eeeee195403efcb',
						type: 'View',
					},
					{
						_id: '5e456d694df0c437590ebc3e',
						type: 'Edit',
					},
					{
						_id: '5e439f32fd05da507ca0161e',
						type: 'Add',
					},
					{
						_id: '5e45bc5228c0d70f4a9363a3',
						type: 'Delete',
					},
				],
				resource: {
					_id: '-LPQEUR9VoWVCJVR338i',
					name: 'Devices',
				},
				_id: '5e45bc52f8c0d70f4a93g3a3',
			},
		],
		title: 'Admin',
		users: 1,
		userCount: 1,
		deleted: false,
	},
];

export const props = {
	userRoles: {
		roles: userRoles,
		permissions: userRoles[0].resourceAccessLevels[0].permissions,
		resources: [userRoles[0].resourceAccessLevels[0].resource],
	},
	getUserRoles: jest.fn(() => Promise.resolve()),
	createNewRole: jest.fn(() => Promise.resolve()),
	deleteUserRole: jest.fn(() => Promise.resolve()),
	editUserRole: jest.fn(() => Promise.resolve()),
	displaySnackMessage: jest.fn(() => Promise.resolve()),
	match: {
		url: '/',
	},
	isLoading: false,
};
