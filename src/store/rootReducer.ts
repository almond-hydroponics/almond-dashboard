import { AnyAction, combineReducers } from 'redux';
// reducers
import activityLogs from '@modules/activityLogs';
import analytics from '@modules/analytics';
import authentication from '@modules/authentication';
import device from '@modules/device';
import internalServerError from '@modules/internalServerError';
import people from '@modules/people';
import sensorData from '@modules/sensorData';
import snack from '@modules/snack';
import timeSchedules from '@modules/timeSchedules';
import user from '@modules/user';
import userRoles from '@modules/userRoles';
import redirect from '@modules/redirect';
// types
import { State as TimeSchedules } from '@modules/timeSchedules/types';
import { State as User, LOG_OUT_USER } from '@modules/user/types';
import { State as Authentication } from '@modules/authentication/types';
import { State as Analytics } from '@modules/analytics/types';
import { State as Devices } from '@modules/device/types';
import { State as SensorData } from '@modules/sensorData/types';
import { State as People } from '@modules/people/types';
import { State as UserRoles } from '@modules/userRoles/types';
import { State as Redirect } from '@modules/redirect/types';

export type IRootState = {
	internalServerError: any;
	timeSchedules: TimeSchedules;
	snack: any;
	user: User;
	device: Devices;
	userRoles: UserRoles;
	people: People;
	activityLogs: any;
	sensorData: SensorData;
	authentication: Authentication;
	analytics: Analytics;
	redirect: Redirect;
};

const appReducer = combineReducers({
	internalServerError,
	timeSchedules,
	snack,
	user,
	device,
	userRoles,
	people,
	activityLogs,
	sensorData,
	authentication,
	analytics,
	redirect,
});

const rootReducer = (
	state: ReturnType<typeof appReducer> | any,
	action: AnyAction,
) => {
	if (action.type === LOG_OUT_USER) {
		return {
			...state,
			internalServerError: {
				error: false,
			},
		};
	}

	return appReducer(state, action);
};

export type OurStore = IRootState;

export default rootReducer;
