export interface SelectBoxProps {
	title: string;
	defaultValue?: string;
	options: string[][];
	handleDateSelect?: any;
	selectedValue: string;
}

interface Option {
	label: string;
	value: string;
}
