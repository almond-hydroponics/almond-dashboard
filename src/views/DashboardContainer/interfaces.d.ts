import { UserDetails } from '@modules/user/interfaces';
import { UserRole } from '@modules/userRoles/interfaces';
import { ActivityLogs } from '@modules/activityLogs/interfaces';

export interface DashboardContainerProps {
	// drawerEl?: any;
	// match?: {
	// 	url: string;
	// };
	// component?: any;
	user: UserDetails;
	logoutUser: () => void;
	// title: string;
	// activateDevice: (id) => Promise<any>;
	// getUserDetails: () => Promise<any>;
	// activeDevice: {
	// 	id: string;
	// 	_id: string;
	// 	verified?: boolean;
	// 	user?: UserDetails;
	// };
	// roles: UserRole[];
	// editUserDetails: (id, role) => Promise<any>;
	// activityLogs: ActivityLogs[];
	// loading: string;
}

export interface DashboardContainerState {
	isOpen: boolean;
	isLoading: boolean;
	isFeedbackMenuOpen: boolean;
	isFeedbackModal: boolean;
	isProfileMenuOpen: boolean;
	device: string;
	// activeDevice: {
	// 	id: string;
	// 	_id: string;
	// };
	action: string;
	feedback: '';
	fields: {
		[key: string]: string | number;
	};
	anchorEl: null | HTMLElement;
	roleSelected: string;
	roleId: string;
}
