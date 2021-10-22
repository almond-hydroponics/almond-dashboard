export const props = {
	getAllPeople: jest.fn(() => Promise.resolve()),
	getUserRoles: jest.fn(() => Promise.resolve()),
	displaySnackMessage: jest.fn(() => Promise.resolve()),
	updatePerson: jest.fn(() => Promise.resolve()),
	people: [],
	roles: [],
};
