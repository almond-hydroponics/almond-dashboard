import { ReactNode } from 'react';
import { UserDetails } from '@modules/user/interfaces';

export interface UserContextProps {
	user: UserDetails;
	getUserDetails: () => Promise<any>;
	children: ReactNode;
}
