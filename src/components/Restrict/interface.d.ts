import { ReactElement } from 'react';

export interface RestrictProps {
	authorize: string | string[];
	fallback?: ReactElement<any>;
	children: ReactElement<any>;
	strict: boolean;
}
