import dayjs from '@utils/dayjsTime';
import { Schedule } from '@modules/timeSchedules/interfaces';

/**
 * This function validates the new time schedules to be one hour apart
 * @returns boolean
 */
const validateNewOneHourTime = (
	schedules: string[],
	newTime: string,
): boolean => {
	if (schedules.length === 0) return true;

	return schedules.every(
		(schedule) => Math.abs(getDiff(newTime, schedule)) >= 3_600_000,
	);
};

/**
 * This function validates the edited time schedules to be one hour apart
 * @returns boolean
 */
const validateEditOneHourTime = (
	schedules: Schedule[],
	scheduleId: string,
	editTime: string,
): boolean => {
	const editScheduleIndex = schedules.findIndex(
		(item) => item._id === scheduleId,
	);
	const timeBefore =
		editScheduleIndex === 0 ? null : schedules[editScheduleIndex - 1].schedule;
	const timeAfter =
		editScheduleIndex === schedules.length - 1
			? null
			: schedules[editScheduleIndex + 1].schedule;

	if (timeBefore) {
		if (Math.abs(getDiff(editTime, timeBefore)) > 3_600_000) return false;
	}
	if (timeAfter) {
		if (Math.abs(getDiff(editTime, timeAfter)) < 3_600_000) return false;
	}
	return true;
};

/**
 * This function gets the time difference between the times passed in milliseconds
 * @returns number
 */
const getDiff = (newTime: any, scheduleTime: string): number => {
	const newTimeToSet = dayjs(newTime).second(0).millisecond(0);
	const [h, m] = scheduleTime.split(':');
	const scheduleTimeToCompare = dayjs()
		.hour(Number(h))
		.minute(Number(m))
		.second(0)
		.millisecond(0);
	return scheduleTimeToCompare.diff(newTimeToSet);
};

export { validateEditOneHourTime, validateNewOneHourTime, getDiff };
