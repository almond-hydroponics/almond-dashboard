import { UserDetails } from '@modules/user/interfaces';
import { UserRole } from '@modules/userRoles/interfaces';

export interface PeoplePageProps {
	getAllPeople: () => Promise<any>;
	getUserRoles: () => Promise<any>;
	updatePerson: (id, role) => Promise<any>;
	displaySnackMessage: (message) => Promise<any>;
	people: UserDetails[];
	roles: UserRole[];
}

export interface PeoplePageState {
	people: any;
	isFetchingRoles: boolean;
	isSelectOpen: boolean;
	roleSelect: string;
	userId: string;
	roleId: string;
}
