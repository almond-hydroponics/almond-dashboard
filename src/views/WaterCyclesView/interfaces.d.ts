import { Schedule } from '@modules/timeSchedules/interfaces';

export interface WaterCyclesPageState {
	isEditMode: boolean;
	isDeleteModalOpen: boolean;
	scheduleId: string;
	statusClass: string;
	isEnabled: boolean;
	// isFormModalOpen: boolean;
	isAddEditModalOpen: boolean;
	scheduleToEdit: string;
	isActionDone: boolean;
	isLoading: boolean;
	isDateRangeHidden: boolean;
	currentDateInView: string;
	waterCardDateRange: string;
	selectedTimeSchedule: any;
	hasError: boolean;
	schedules: Schedule[];
	isRangeData: boolean;
}
