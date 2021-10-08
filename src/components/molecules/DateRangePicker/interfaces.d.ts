export interface DateRanges {
	startDate: Date | null;
	endDate: Date | null;
}

export interface DateRangePickerProps {
	onChange: (range: DateRanges) => void;
	isOpen: boolean;
	onClose: (e?) => void;
	onDismiss: (e?) => void;
}

export interface DateRangePickerState {
	selection: {
		startDate: Date;
		endDate: Date;
		key?: string;
	};
}

export type Param =
	| 'Pick a date'
	| '30 second window'
	| '1 minutes window'
	| '5 minute window'
	| '30 minutes window'
	| '1 hour window'
	| 'All time'
	| 'Today'
	| 'Week to date'
	| 'Month to date'
	| 'Year to date'
	| 'Yesterday'
	| 'Previous week'
	| 'Previous month'
	| 'Previous year'
	| 'Last 15 minutes'
	| 'Last 60 minutes'
	| 'Last 4 hours'
	| 'Last 24 hours'
	| 'Last 7 days'
	| 'Last 30 days';
