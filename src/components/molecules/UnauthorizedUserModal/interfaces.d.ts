import { UserDetails } from '@modules/user/interfaces';

export interface UnauthorizedUserModalProps {
	user: UserDetails;
	isModalOpen: boolean;
	logoutUser: () => void;
}
