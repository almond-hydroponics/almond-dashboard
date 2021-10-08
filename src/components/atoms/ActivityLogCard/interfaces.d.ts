import { ReactNode } from 'react';

export interface ActivityLogCardProps {
	log: string | ReactNode;
	date?: Date | string;
	type: string;
}
