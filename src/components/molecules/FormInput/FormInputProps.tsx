import { ReactNode } from 'react';

export interface FormInputProps {
	name: string;
	control: any;
	label: string;
	setValue?: any;
	Icon?: ReactNode;
	iconPosition?: 'start' | 'end';
	[x: string]: any;
}
