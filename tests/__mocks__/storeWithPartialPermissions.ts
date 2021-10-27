import store from '../../src/store';

jest.mock('../../src/store');

const mockState = {
	user: {
		permissions: {
			analytics: {
				fullAccess: true,
				edit: true,
				delete: true,
				view: true,
				add: true,
			},
			people: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: false,
				add: false,
			},
			devices: {
				fullAccess: false,
				edit: true,
				delete: false,
				view: true,
				add: false,
			},
			roles: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: true,
				add: true,
			},
			requests: {
				fullAccess: false,
				edit: false,
				delete: false,
				view: true,
				add: true,
			},
		},
	},
};

store.getState = () => mockState;
