import { Permission, Resource, UserRole } from '@modules/userRoles/interfaces';

export interface UserRolesPageState {
	isAddEditModalOpen: boolean;
	isDeleteModalOpen: boolean;
	resources: any[];
	permissions: any[];
	selectedRole: UserRole;
	isEditMode: boolean;
	action: string;
	roleId: string;
	[key: string]: any;
}
