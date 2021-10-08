import { LOG_ACTIVITY } from '@modules/activityLogs/types';

export interface LogActivity {
	type: LOG_ACTIVITY;
	activityLogs: ActivityLogs[];
}

export interface ActivityLogs {
	_id: string;
	actionDesc: string;
	createdAt: string;
}
