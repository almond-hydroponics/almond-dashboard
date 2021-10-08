import { ChartDataTrend } from '@modules/sensorData/interfaces';

export interface LineChartCardProps {
	heading: string;
	selectedValue: string;
	handleDateSelect: any;
	isDateRangeHidden: boolean;
	onDateRangeChange: any;
	handleDateRangeModal: any;
	data: any;
	duration?: number;
}
