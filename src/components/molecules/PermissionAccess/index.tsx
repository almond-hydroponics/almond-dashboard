// react libraries
import { useEffect, useState } from 'react';
// components
import { Checkbox, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
// helpers
import capitalize from '@utils/capitalize';
// interfaces
import { Permission, Resource } from '@modules/userRoles/interfaces';
// styles
import './PermissionAccess.scss';
import { PermissionAccessProps, PermissionAccessState } from './interfaces';
import { styled, useTheme } from '@mui/material/styles';

const PermissionAccess = ({
	resources,
	permissions,
	getResources,
}: PermissionAccessProps): JSX.Element => {
	const theme = useTheme();
	/*
	 * This stores a permission to permissionId mapping e.g { 'Full Access': 5e439f32fd05da507ca0161e, ... }
	 */
	const mappedPermissions = {
		'full access': '',
		view: '',
		add: '',
		edit: '',
		delete: '',
	};

	const [state, setState] = useState<PermissionAccessState>({
		permissions: [],
		resources: [],
		mappedPermissions: {
			'full access': '',
			view: '',
			add: '',
			edit: '',
			delete: '',
		},
		isResourcesUpdates: false,
	});

	// const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
	// const [allResources, setAllResources] = useState<Resource[]>([...resources]);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			resources,
			permissions,
		}));

		if (state.resources.length && state.permissions.length) {
			/*
			 * Force the order of the permissions to start with full access
			 * and end with delete
			 */
			Object.keys(mappedPermissions).forEach((permissionString: string) => {
				mappedPermissions[permissionString] = state.permissions.find(
					(permissionObject: Permission) =>
						permissionObject.type.toLowerCase() === permissionString,
				)?._id;
			});
		}
	}, []);

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			resources,
			permissions,
		}));

		Object.keys(mappedPermissions).forEach((permissionString: string) => {
			const permissionKey = permissions.find(
				(permissionObject: Permission) =>
					permissionObject.type.toLowerCase() === permissionString,
			);

			if (permissionKey) {
				setState((prevState) => ({
					...prevState,
					mappedPermissions: {
						...mappedPermissions,
						permissionString: permissionKey._id,
					},
				}));
				mappedPermissions[permissionString] = permissionKey._id;
			}
		});
	}, [resources]);

	/**
	 * Toggle a permission on or off for each of the resources
	 * @param {string} resourceId
	 * @param {string} permissionType
	 * @returns {void}
	 */
	const togglePermission = (resourceId, permissionType) => () => {
		const permissionId = state.mappedPermissions[permissionType];
		// this takes the current permission Ids for the given resource and toggles the value within that array
		let getNewPermissionIds;
		// if this is the full access permission
		if (state.mappedPermissions['full access'] === permissionId) {
			getNewPermissionIds = (currentPermissionIds) => {
				// switch off all permissions if the user toggles off 'full access' otherwise make it the only one
				return currentPermissionIds.includes(permissionId)
					? []
					: [permissionId];
			};
		} else {
			getNewPermissionIds = (currentPermissionIds) => {
				/*
				 * if current permissions contain 'full access', it should be removed and every other permission
				 * asides the one that was clicked, should be added
				 */
				if (
					currentPermissionIds.includes(state.mappedPermissions['full access'])
				) {
					return Object.values(state.mappedPermissions).filter(
						(currentPermissionId) =>
							currentPermissionId !== permissionId &&
							currentPermissionId !== state.mappedPermissions['full access'],
					);
				}

				return currentPermissionIds.includes(permissionId)
					? currentPermissionIds.filter(
							(currentPermissionId) => currentPermissionId !== permissionId,
					  )
					: [...currentPermissionIds, permissionId];
			};
		}

		setState((prevState) => ({
			...prevState,
			resources: state.resources.map((resource) =>
				resource._id === resourceId
					? {
							...resource,
							permissionIds: getNewPermissionIds(resource.permissionIds || []),
					  }
					: resource,
			),
			isResourcesUpdates: true,
		}));
	};

	useEffect(() => {
		if (state.isResourcesUpdates) {
			getResources(state.resources);
		}
	}, [state.isResourcesUpdates]);

	/**
	 * Checks if a particular permission for
	 * a given resource has been toggled on or off
	 * @param {string} resourceId
	 * @param {string} permissionId
	 * @returns {boolean}
	 */
	const isResourcePermissionActive = (resourceId, permissionId) => {
		let isActive = false;
		// get the resource in question
		const resource = state.resources.filter(
			(res) => res._id === resourceId,
		)[0];

		/*
		 * it's active if it has the 'full access' toggled on or
		 * if the permission for this checkbox has been toggled on
		 */
		if (
			resource.permissionIds &&
			(resource.permissionIds.includes(
				state.mappedPermissions['full access'],
			) ||
				resource.permissionIds.includes(permissionId))
		) {
			isActive = true;
		}
		return isActive;
	};

	const headerPermissions = Object.keys(mappedPermissions).map(
		(permission) => {
			return {
				field: permission,
				headerName: capitalize(permission),
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) => (
					<Checkbox
						key={`${value}-${permission}}`}
						color="primary"
						size="small"
						icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
						checkedIcon={<CheckBoxIcon fontSize="small" />}
						checked={
							resources &&
							isResourcePermissionActive(
								value,
								state.mappedPermissions[permission],
							)
						}
						name={`${value}-${permission}`}
						onChange={togglePermission(value, permission)}
					/>
				),
			};
		},
	);

	const columns: GridColDef[] = [
		{
			field: 'access_levels',
			headerName: 'Access levels',
			flex: 0.4,
			headerClassName: 'table-header',
		},
		...headerPermissions,
	];

	const rows = state.resources.map((resource: Resource) => ({
		id: resource.name,
		access_levels: resource.name,
		'full access': resource._id,
		view: resource._id,
		add: resource._id,
		edit: resource._id,
		delete: resource._id,
	}));

	const CustomDataGrid = styled(DataGrid)({
		'& .MuiDataGrid-columnSeparator': {
			display: 'none !important',
		},
		'& .MuiDataGridCell:focusWithin': {
			// outline: 'solid #1967D2 0.8px',
			outlineOffset: '-1px',
			outline: 'none',
		},
		'& .MuiPaginationItemRoot': {
			borderRadius: 0,
		},
		'& .MuiDataGrid-columnHeaderTitleContainer': {
			padding: '0 !important',
		},
		'& .MuiDataGrid-columnHeaderTitle': {
			color: theme.palette.primary.main,
			fontSize: 12,
			// fontWeight: 500,
		},
	});

	return (
		<>
			<Typography
				variant="body2"
				color="textSecondary"
				style={{ paddingLeft: 6 }}
			>
				Permission access
			</Typography>
			<div style={{ height: 400, width: '100%' }}>
				<div style={{ display: 'flex', height: '100%' }}>
					<div style={{ flexGrow: 1 }}>
						<CustomDataGrid
							disableColumnMenu
							pagination={undefined}
							rows={rows}
							columns={columns.map((column) => ({
								...column,
								disableClickEventBubbling: true,
								sortable: false,
							}))}
							// components={{
							// 	LoadingOverlay: CustomLoadingOverlay,
							// }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default PermissionAccess;
