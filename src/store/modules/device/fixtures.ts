export const devices = {
	success: true,
	message: 'Devices fetched successfully',
	data: [
		{
			enabled: true,
			_id: '5dfa0dcd53890575b993eb74',
			id: 'TEST',
			updatedAt: '2020-06-24T13:48:36.027Z',
			assigned: true,
			verified: true,
			user: {
				name: 'Almond Test',
				_id: '5db36e9e169d644d72e9f27e',
			},
		},
	],
};

export const devicePayload = {
	device: 'TEST',
};

export const deviceIdPayload = {
	id: '5dfa0dcd53890575b993eb74',
};

export const activateDevicePayload = {
	id: 'TEST',
	_id: '5dfa0dcd53890575b993eb74',
	verified: true,
	user: '5db36e9e169d644d72e9f27e',
};

export const id = '5db36e9e169d644d72e9f27e';

export const addOrEditDeviceResponse = {
	success: true,
	message: 'Device has been updated successfully',
	data: {
		verified: false,
		enabled: false,
		_id: '5ef469a7f668b60ec3def7c7',
		id: 'TEST',
		createdAt: '2020-06-25T09:08:55.232Z',
		updatedAt: '2020-06-25T09:09:13.114Z',
	},
};
