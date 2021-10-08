import { ActivityLogs, LogActivity } from '@modules/activityLogs/interfaces';
import { LOG_ACTIVITY } from '@modules/activityLogs/types';
import { AnyAction } from 'redux';

/**
 * Log activities
 *
 * @returns {LogActivity}
 */
export const logActivity = (activityLogs: ActivityLogs[]): LogActivity => ({
	activityLogs,
	type: LOG_ACTIVITY,
});

export const activityLogsInitialState = [];

export const reducer = (
	state: never[] = activityLogsInitialState,
	action: AnyAction,
) => {
	if (action.type === LOG_ACTIVITY) {
		return action.activityLogs;
	}
	return state;
};

export default reducer;
