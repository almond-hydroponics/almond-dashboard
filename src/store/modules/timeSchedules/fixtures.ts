const timeSchedules = {
	status: 'success',
	message: 'Schedule added successfully',
	data: [
		{
			_id: '5ede17f7184ccf003a2da68f',
			createdAt: '2020-06-08T10:50:31.797Z',
			device: '5e4a5815a04a6d8445b5885d',
			enabled: false,
			schedule: '2020-06-08T18:00:46.817Z',
			updatedAt: '2020-06-08T10:58:28.731Z',
			user: '5ede1715184ccf003a2da68e',
		},
	],
};

const timeSchedulesWithoutData = {
	...timeSchedules,
	data: [],
};

const id = '5e4a5815a04a6d8445b5885d';
const schedulePayload = {
	schedule: '2019-10-30T08:00:42.767Z',
	device: '5e4a5815a04a6d8445b5885d',
};
const editSchedulePayload = {
	_id: '5ede17f7184ccf003a2da68f',
	schedule: {
		schedule: '2019-10-30T08:00:42.767Z',
		device: '5e4a5815a04a6d8445b5885d',
	},
};
const enabledStatus = {
	enabled: true,
	device: '5e4a5815a04a6d8445b5885d',
};

export {
	id,
	schedulePayload,
	enabledStatus,
	timeSchedules,
	timeSchedulesWithoutData,
	editSchedulePayload,
};
