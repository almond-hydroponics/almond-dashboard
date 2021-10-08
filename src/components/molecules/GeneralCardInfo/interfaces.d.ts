import { ReactNode } from 'react';

export interface GeneralCardInfoProps {
	mainHeader: string;
	subHeader?: string;
	actionItem?: ReactNode;
	icon?: ReactNode | string;
}
