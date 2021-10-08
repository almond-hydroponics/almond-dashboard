import {
	reducer,
	activityLogsInitialState,
	logActivity,
} from '@modules/activityLogs';

describe('Activity logs reducer', () => {
	const activityLogs = [
		{
			_id: 'Blah',
			actionDesc: 'Blah',
			createdAt: 'Blah',
		},
	];
	it("should return initial state if action type doesn't match", () => {
		const newState = reducer(activityLogsInitialState, { type: 'fakeType' });
		expect(newState).toEqual(activityLogsInitialState);
	});

	it('should dispatch LOG_ACTIVITY', () => {
		const activityLogsAction = logActivity(activityLogs);
		const activityLogsState = reducer(
			activityLogsInitialState,
			activityLogsAction,
		);

		expect(activityLogsState).toEqual(activityLogs);
	});
});
