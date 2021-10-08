export const props = {
	addNewDevice: jest.fn(() => Promise.resolve()),
	displaySnackMessage: jest.fn(),
	isLoading: false,
	verifyUserDevice: jest.fn(() => Promise.resolve()),
	getUserDetails: jest.fn(() => Promise.resolve()),
};
