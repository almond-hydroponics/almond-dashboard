import { Permission, Resource } from '@modules/userRoles/interfaces';

export interface PermissionAccessProps {
	resources: Resource[];
	permissions: Permission[];
	getResources: (state) => void;
}

export interface PermissionAccessState {
	resources: any;
	permissions: any;
	mappedPermissions: {
		[key: string]: string;
	};
	isResourcesUpdates: boolean;
}
