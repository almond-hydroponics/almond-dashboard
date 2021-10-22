import { useState, useEffect, ChangeEvent } from 'react';
// third-party libraries
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
	Grid,
	TextField,
	MenuItem,
	InputAdornment,
	Chip,
	Stack,
	Avatar,
	useMediaQuery,
	Typography,
} from '@mui/material';
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridSortDirection,
} from '@mui/x-data-grid';
// icons
import { Face, ExpandMore } from '@mui/icons-material';
// components
import { DashboardCard } from '@components/molecules';
import Modal from '@components/atoms/Modal';
// thunks
import { getAllPeople, updatePerson } from '@modules/people';
import { getUserRoles } from '@modules/userRoles';
// interfaces
import useEffectAsync from '@hooks/useEffectAsync';
import { UserDetails } from '@modules/user/interfaces';
import { IRootState } from '../../store/rootReducer';
import { PeoplePageState } from './interfaces';
import { styled, useTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const PeopleView = (): JSX.Element => {
	const { roles } = useSelector(
		(globalState: IRootState) => globalState.userRoles,
		shallowEqual,
	);
	const { people, isLoading } = useSelector(
		(globalState: IRootState) => globalState.people,
		shallowEqual,
	);
	const [state, setState] = useState<PeoplePageState>({
		people: [],
		isFetchingRoles: false,
		isSelectOpen: false,
		roleSelect: 'User',
		roleId: '',
		userId: '',
	});

	const dispatch = useDispatch();
	const theme = useTheme();

	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	useEffectAsync(async () => {
		await dispatch(getAllPeople());
	}, []);

	useEffect(() => {
		dispatch(getUserRoles());
	}, []);

	const toggleRoleSelectOpen = (event) => {
		event.persist();
		setState((prevState) => ({
			...prevState,
			isSelectOpen: !prevState.isSelectOpen,
			userId: event.target.id,
		}));
	};

	const handleRoleSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const roleTitle = event.target.value;
		const role = roles.filter((obj) => obj.title === roleTitle);
		setState({ ...state, roleId: role[0]._id, roleSelect: roleTitle });
	};

	const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { roleId, userId } = state;

		dispatch(updatePerson(userId, { role: roleId }));

		setState((prevState) => ({
			...prevState,
			isSelectOpen: !prevState.isSelectOpen,
			userId: '',
		}));
	};

	const selectRoleContent = () => (
		<TextField
			id="role"
			select
			variant="outlined"
			label="Assign user role"
			fullWidth
			size="small"
			value={state.roleSelect}
			onChange={handleRoleSelect}
			// SelectProps={{
			// 	classes: {
			// 		select: styles.selectHeight,
			// 	},
			// }}
			// InputLabelProps={{
			// 	classes: {
			// 		focused: styles.focused,
			// 		root: styles.labelColor,
			// 	},
			// }}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Face color="primary" />
					</InputAdornment>
				),
			}}
		>
			{roles.map((role) => (
				<MenuItem key={role._id} value={role.title}>
					<Typography fontSize={14} variant="body1">
						{role.title}
					</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const renderSelectRoleModal = () => (
		<Modal
			isModalOpen={state.isSelectOpen}
			renderHeader="Assign new role"
			renderDialogText="Change to a new user role with permissions."
			renderContent={selectRoleContent()}
			onClose={toggleRoleSelectOpen}
			submitButtonName="Update role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleSelectOpen}
		/>
	);

	const renderUserNamePhoto = ({ firstName, lastName, photo }) => (
		<Stack
			direction="row"
			spacing={1}
			justifyContent="center"
			alignItems="center"
		>
			<Avatar alt="avatar" sx={{ width: 30, height: 30 }} src={photo} />
			<span>{`${firstName} ${lastName}` ?? 'Anonymous'}</span>
		</Stack>
	);

	const rolesSelectMore = ({ currentRole, _id }) => (
		<div id={_id} onClick={toggleRoleSelectOpen} role="presentation">
			<Stack direction="row" spacing={1}>
				<ExpandMore id={_id} />
				<Typography
					sx={{
						cursor: 'pointer',
						paddingRight: 12,
						[theme.breakpoints.down('sm')]: {
							fontSize: 12,
						},
					}}
					id={_id}
					variant="body2"
				>
					{currentRole.title}
				</Typography>
			</Stack>
		</div>
	);

	const renderActionButtons = ({ _id }: UserDetails): JSX.Element => {
		const handleDelete = () =>
			setState((prevState) => ({
				...prevState,
				userId: _id,
				// isSelectOpen: prevState.isSelectOpen,
			}));

		return (
			<Stack direction="row" spacing={1} key={_id}>
				<Typography
					style={{ cursor: 'pointer', paddingRight: 12 }}
					id={_id}
					variant="body2"
					color="primary"
					// onClick={showDeviceModal('Edit')}
					// onKeyDown={showDeviceModal('Edit')}
				>
					Edit
				</Typography>
				<Typography
					style={{ cursor: 'pointer', color: red[900], paddingRight: 12 }}
					id={_id}
					variant="body2"
					onClick={handleDelete}
					onKeyDown={handleDelete}
				>
					Delete
				</Typography>
			</Stack>
		);
	};

	const renderUserStatus = (user: UserDetails): JSX.Element => {
		const { isVerified } = user;
		if (isVerified) {
			return (
				<Chip
					sx={{
						color: '#3E4E56',
						backgroundColor: '#D9E9BA',
						fontWeight: 500,
					}}
					label="Active"
				/>
			);
		}
		return (
			<Chip
				sx={{
					color: '#1967d2',
					backgroundColor: '#e8f0fe',
					fontWeight: 500,
				}}
				label="Inactive"
			/>
		);
	};

	const CustomDataGrid = styled(DataGrid)({
		'& .MuiDataGrid-columnSeparator': {
			display: 'none !important',
		},
		'& .MuiDataGridCell:focusWithin': {
			// outline: 'solid #1967D2 0.8px',
			outlineOffset: '-1px',
			outline: 'none',
		},
		// '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
		// 	paddingLeft: 2,
		// 	paddingRight: 2,
		// },
		'& .MuiPaginationItemRoot': {
			borderRadius: 0,
		},
		'& .MuiDataGrid-columnHeaderTitleContainer': {
			padding: '0 !important',
		},
		'& .MuiDataGrid-columnHeaderTitle': {
			color: theme.palette.primary.main,
			// fontWeight: 500,
		},
		'& .tableCell': {
			fontWeight: 500,
			fontSize: 20,
		},
		'& .MuiDataGridCell': {
			[theme.breakpoints.down('sm')]: {
				fontSize: 12,
			},
		},
	});

	const renderTableContent = () => {
		const columns: GridColDef[] = [
			{
				field: 'name',
				headerName: 'Name',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.15 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderUserNamePhoto(value as UserDetails),
			},
			{
				field: 'id',
				headerName: 'User ID',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.2 : undefined,
				// flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'devices',
				headerName: 'Devices',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.1 : undefined,
				headerClassName: 'table-header',
			},
			{
				field: 'role',
				headerName: 'Role',
				width: isSm ? 100 : undefined,
				flex: !isSm ? 0.1 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					rolesSelectMore(value as UserDetails),
			},
			{
				field: 'status',
				headerName: 'Status',
				width: isSm ? 100 : undefined,
				flex: !isSm ? 0.1 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderUserStatus(value as UserDetails),
			},
			{
				field: 'actions',
				headerName: 'Actions',
				width: isSm ? 150 : undefined,
				flex: !isSm ? 0.2 : undefined,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderActionButtons(value as UserDetails),
			},
		];

		const rows = people.map((user: UserDetails) => ({
			id: user._id,
			name: user,
			devices: user.devices[0]?.id ?? '(Device not added)',
			role: user,
			status: user,
			actions: user,
		}));

		return (
			<div style={{ height: '70vh', width: '100%' }}>
				<CustomDataGrid
					// autoHeight
					// autoPageSize
					style={{ border: 0 }}
					disableColumnMenu
					pagination
					loading={isLoading}
					rows={rows}
					pageSize={10}
					columns={columns.map((column) => ({
						...column,
						disableClickEventBubbling: true,
					}))}
					// components={{
					// 	LoadingOverlay: CustomLoadingOverlay,
					// 	NoRowsOverlay: NoDataOverlay,
					// 	// Pagination: CustomPagination,
					// }}
					sortModel={[
						{
							field: 'name',
							sort: 'asc' as GridSortDirection,
						},
					]}
				/>
			</div>
		);
	};

	return (
		<Grid data-testid="people-page" container spacing={1}>
			<Grid item xs={12}>
				<DashboardCard heading="User Management" body={renderTableContent()} />
				{renderSelectRoleModal()}
			</Grid>
		</Grid>
	);
};

export default PeopleView;
