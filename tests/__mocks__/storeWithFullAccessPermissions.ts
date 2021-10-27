jest.mock('../../src/store', () => {
	const fullAccessPermissions = {
		fullAccess: true,
		edit: true,
		delete: true,
		view: true,
		add: true,
	};

	return {
		default: {
			getState: () => ({
				user: {
					permissions: {
						analytics: fullAccessPermissions,
						people: fullAccessPermissions,
						devices: fullAccessPermissions,
						roles: fullAccessPermissions,
						requests: fullAccessPermissions,
					},
				},
			}),
		},
	};
});
