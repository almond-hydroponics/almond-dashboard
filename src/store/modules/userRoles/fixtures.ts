export const permissions = [
	{
		_id: '5e439f32fd05da507ca0161e',
		type: 'Add',
	},
	{
		_id: '5e456d694df0c437590ebc3e',
		type: 'Edit',
	},
	{
		_id: '5e45bc5228c0d70f4a9363a3',
		type: 'Delete',
	},
	{
		_id: '5e44f86b2eeeee195403efcb',
		type: 'View',
	},
	{
		_id: '5e439ea3fd05da507ca0161a',
		type: 'No Access',
	},
	{
		_id: '5e439ed9fd05da507ca0161c',
		type: 'Full Access',
	},
];

export const resources = [
	{
		_id: '5db373875e38b20ae991710d',
		name: 'People',
	},
	{
		_id: '5e16d15fffb6541b5b909d3e',
		name: 'Requests',
	},
	{
		_id: '5db42955b21bb9ce0cd93f25',
		name: 'Roles',
	},
	{
		_id: '5db373445e38b20ae991710b',
		name: 'Devices',
	},
];

export const newUserRole = {
	_id: '5e439ea3fd05da507ca0161a',
	title: 'Random User',
	description: 'Almond regular user with limited privileges',
	resourceAccessLevels: [
		{
			resourceId: '5db373875e38b20ae991710d',
			permissionIds: ['5e439ed9fd05da507ca0161c'],
		},
	],
};

export const userRolesResponse = {
	success: true,
	message: 'User roles fetched successfully',
	permissions: [
		{ _id: '5e439ea3fd05da507ca0161a', type: 'No Access' },
		{
			_id: '5e439f32fd05da507ca0161e',
			type: 'Add',
		},
		{ _id: '5e456d694df0c437590ebc3e', type: 'Edit' },
		{
			_id: '5e45bc5228c0d70f4a9363a3',
			type: 'Delete',
		},
		{ _id: '5e44f86b2eeeee195403efcb', type: 'View' },
		{
			_id: '5e439ed9fd05da507ca0161c',
			type: 'Full Access',
		},
	],
	resources: [
		{ _id: '5db373445e38b20ae991710b', name: 'Devices' },
		{
			_id: '5db373875e38b20ae991710d',
			name: 'People',
		},
		{ _id: '5db42955b21bb9ce0cd93f25', name: 'Roles' },
		{
			_id: '5e17d95fffb6541b6b909d3e',
			name: 'Analytics',
		},
		{ _id: '5e16d15fffb6541b5b909d3e', name: 'Requests' },
	],
	data: [
		{
			userCount: 1,
			deleted: false,
			_id: '5e4703d62faee61d8ede2d65',
			title: 'User',
			description: 'Almond regular user with limited privileges',
			resourceAccessLevels: [
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5e17d95fffb6541b6b909d3e', name: 'Analytics' },
					_id: '5e4703d62faee61d8ede2d66',
				},
			],
		},
		{
			userCount: 0,
			deleted: false,
			_id: '5e555801465ca301b1143b90',
			title: 'Admin',
			description: 'Almond administrator with full permissions',
			resourceAccessLevels: [
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5e17d95fffb6541b6b909d3e', name: 'Analytics' },
					_id: '5e4703d62faee61d8ede2d66',
				},
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5db42955b21bb9ce0cd93f25', name: 'Roles' },
					_id: '5e555801465ca301b1143b91',
				},
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5e17d95fffb6541b6b909d3e', name: 'Analytics' },
					_id: '5e4703d62faee61d8ede2d66',
				},
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5db373445e38b20ae991710b', name: 'Devices' },
					_id: '5e555801465ca301b1143b92',
				},
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5db373875e38b20ae991710d', name: 'People' },
					_id: '5e555801465ca301b1143b93',
				},
				{
					permissions: [
						{ _id: '5e439ed9fd05da507ca0161c', type: 'Full Access' },
					],
					resource: { _id: '5e16d15fffb6541b5b909d3e', name: 'Requests' },
					_id: '5e555801465ca301b1143b94',
				},
			],
		},
	],
};
