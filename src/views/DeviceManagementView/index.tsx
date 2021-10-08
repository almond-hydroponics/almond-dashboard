import {
	useState,
	useEffect,
	ChangeEvent,
	FormEvent,
	useCallback,
	MouseEvent,
} from 'react';
// third-party libraries
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import validate from 'validate.js';
import {
	InputAdornment,
	Chip,
	TextField,
	Button,
	IconButton,
	Stack,
	Grid,
	Typography,
	Box,
	Card,
	CardContent,
} from '@mui/material';
import { Add, PhonelinkSetupSharp } from '@mui/icons-material';
// thunks
import {
	addNewDevice,
	deleteDevice,
	editDevice,
	getAllDevices,
} from '@modules/device';
// components
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridSortDirection,
} from '@mui/x-data-grid';
import { Modal } from '@components/atoms';
import { Device } from '@modules/device/interfaces';
import { DashboardCard } from '@components/molecules';
// interfaces
import { DeviceManagementState } from './interfaces';
import { IRootState } from '../../store/rootReducer';
import { FormStateProps } from '../../types/FormStateProps';
import { red } from '@mui/material/colors';
import { alpha, useTheme } from '@mui/material/styles';
import fancyId from '@utils/fancyId';
import useMediaQuery from '@mui/material/useMediaQuery';

const schema = {
	device: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			is: 7,
			message: 'id should be 7 characters',
		},
	},
};

export const DeviceManagementView = (): JSX.Element => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const { devices, isLoading } = useSelector(
		(globalState: IRootState) => globalState.device,
		shallowEqual,
	);
	const [state, setState] = useState<DeviceManagementState & FormStateProps>({
		devices: [],
		isEditMode: false,
		showDeviceModal: false,
		isFormModalOpen: false,
		isDeleteModalOpen: false,
		deviceId: '',
		deviceToEdit: '',
		selectedDevice: '',
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllDevices());
	}, []);

	useEffect(() => {
		const errors = validate(state.values, schema);

		setState((prevState) => ({
			...prevState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [state.values]);

	const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();
		const { name, value } = event.target;
		setState((prevState) => ({
			...prevState,
			values: {
				...prevState.values,
				[name]: value,
			},
			touched: {
				...prevState.touched,
				[name]: true,
			},
		}));
	};

	const showDeviceModal = (mode) => (event) => {
		if (`show${mode}DeviceModal` && mode === 'Add') {
			setState((prevState) => ({
				...state,
				showDeviceModal: !prevState.showDeviceModal,
				isFormModalOpen: !prevState.isFormModalOpen,
				isEditMode: false,
			}));
		} else if (`show${mode}ScheduleModal` && mode === 'Edit') {
			const { id } = event.target;
			const device = devices.filter((obj) => obj._id === id);

			setState((prevState) => ({
				...state,
				deviceId: id,
				deviceToEdit: device[0].id,
				showDeviceModal: !prevState.showDeviceModal,
				isFormModalOpen: !prevState.isFormModalOpen,
				isEditMode: true,
			}));
		}
	};

	const closeDeviceModal = (): void => {
		setState((prevState) => ({
			...state,
			deviceToEdit: '',
			showDeviceModal: !prevState.showDeviceModal,
			isFormModalOpen: !prevState.isFormModalOpen,
			deviceId: '',
			device: '',
		}));
	};

	const toggleDeviceDeleteModal = (): void =>
		setState((prevState) => ({
			...prevState,
			isDeleteModalOpen: !prevState.isDeleteModalOpen,
		}));

	const handleDeviceDelete = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			event.preventDefault();
			dispatch(deleteDevice(state.deviceId));
			toggleDeviceDeleteModal();
		},
		[state.deviceId],
	);

	const onAddEditDeviceSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { isEditMode, deviceId, isValid, values } = state;

		if (isValid) {
			const deviceToSubmit = {
				id: values.device,
			};
			dispatch(
				isEditMode
					? editDevice(deviceId, deviceToSubmit)
					: addNewDevice(deviceToSubmit),
			);
		}

		setState((prevState) => ({
			...prevState,
			touched: {
				...prevState.touched,
				...prevState.errors,
			},
		}));

		closeDeviceModal();
	};

	const hasError = (field: string): boolean =>
		!!(state.touched[field] && state.errors[field]);

	const renderActionButtons = (device: Device): JSX.Element => {
		const { _id } = device;

		const handleDelete = () => {
			setState((prevState) => ({
				...prevState,
				deviceId: _id,
				isDeleteModalOpen: !prevState.isDeleteModalOpen,
			}));
		};

		return (
			<Stack direction="row" spacing={1} key={_id}>
				<Typography
					style={{ cursor: 'pointer', paddingRight: 12 }}
					id={_id}
					variant="body2"
					color="primary"
					onClick={showDeviceModal('Edit')}
					onKeyDown={showDeviceModal('Edit')}
				>
					Edit
				</Typography>
				<Typography
					style={{ cursor: 'pointer', color: red[900] }}
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

	const renderDeviceStatus = (device): JSX.Element => {
		const { verified, enabled } = device;
		if (!verified)
			return (
				<Chip
					sx={{
						color: '#1967d2',
						backgroundColor: 'rgba(66, 133, 244, 0.15)',
					}}
					label="Not Verified"
				/>
			);
		if (!enabled)
			return (
				<Chip
					sx={{ color: '#821721', backgroundColor: 'rgba(210, 43, 53, 0.15)' }}
					label="Disabled"
				/>
			);
		return (
			<Chip
				sx={{ color: '#0e5827', backgroundColor: 'rgba(14, 88, 39, 0.15)' }}
				label="Enabled"
			/>
		);
	};

	const deviceColorStatus = (device): string => {
		const { verified, enabled } = device;
		if (!verified) return '#1967d2';
		if (!enabled) return '#821721';
		return '#0e5827';
	};

	const tableStyles = {
		border: 0,
		WebkitFontSmoothing: 'auto',
		'& .MuiDataGrid-iconSeparator': {
			display: 'none',
		},
		'& .MuiDataGrid-cell:focus-within': {
			// outline: 'solid #1967D2 0.8px',
			outlineOffset: '-1px',
			outline: 'none',
		},
		// '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
		// 	paddingLeft: 2,
		// 	paddingRight: 2,
		// },
		'& .MuiPaginationItem-root': {
			borderRadius: 0,
		},
		'& .table-header': {
			color: theme.palette.primary.main,
			// fontWeight: 500,
		},
		'& .table-cell': {
			fontWeight: 500,
			fontSize: 20,
		},
		'& .MuiDataGrid-cell': {
			[theme.breakpoints.down('sm')]: {
				fontSize: 12,
			},
		},
	};

	const renderTableContent = (): JSX.Element => {
		const columns: GridColDef[] = [
			{
				field: 'deviceId',
				headerName: 'Device',
				// width: 100,
				flex: 0.1,
				headerClassName: 'table-header',
			},
			{
				field: 'id',
				headerName: 'Device ID',
				// width: 100,
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'user',
				headerName: 'User',
				flex: 0.2,
				headerClassName: 'table-header',
			},
			{
				field: 'status',
				headerName: 'Status',
				flex: 0.1,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) => renderDeviceStatus(value),
			},
			{
				field: 'actions',
				headerName: 'Actions',
				flex: 0.2,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderActionButtons(value as Device),
			},
		];

		const rows = devices.map((device) => ({
			id: device?._id ?? 'No ID',
			deviceId: device?.id ?? 'No device',
			user: device?.user
				? `${device?.user?.firstName} ${device?.user?.lastName}`
				: 'NOT ASSIGNED',
			status: device,
			actions: device,
		}));

		return (
			<div
				// className={tableClasses.root}
				style={{ height: 700, width: '100%' }}
			>
				<div style={{ display: 'flex', height: '100%' }}>
					<div style={{ flexGrow: 1 }}>
						<DataGrid
							// autoHeight
							// autoPageSize
							// pagination
							disableColumnMenu
							style={{ ...tableStyles }}
							// className={tableClasses.root}
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
							// }}
							sortModel={[
								{
									field: 'deviceId',
									sort: 'asc' as GridSortDirection,
								},
								{
									field: 'user',
									sort: 'asc' as GridSortDirection,
								},
							]}
						/>
					</div>
				</div>
			</div>
		);
	};

	const renderDeviceForm = (): JSX.Element => {
		const { isEditMode, values } = state;
		return (
			<TextField
				autoFocus
				fullWidth
				id="device"
				variant="outlined"
				type="text"
				name="device"
				// margin="dense"
				// size="small"
				label={`${isEditMode ? 'Update' : 'Add new'} device ID`}
				value={values.device ?? ''}
				onChange={handleValueChange}
				error={hasError('device')}
				helperText={hasError('device') ? state.errors.device[0] : null}
				// InputLabelProps={{
				// 	classes: {
				// 		focused: {}
				// 	},
				// }}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<IconButton>
								<PhonelinkSetupSharp />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		);
	};

	const renderAddEditDeviceModal = () => {
		const { isFormModalOpen, isEditMode, isValid } = state;
		return (
			<Modal
				isModalOpen={isFormModalOpen}
				renderContent={renderDeviceForm()}
				onClose={closeDeviceModal}
				renderDialogText={
					isEditMode
						? 'Change the device identifier for the user to configure.'
						: 'Add a 7 digit device identifier for the user to configure.'
				}
				renderHeader={isEditMode ? 'Update device' : 'Add new device'}
				submitButtonName={isEditMode ? 'Update device' : 'Create new device'}
				onSubmit={onAddEditDeviceSubmit}
				onDismiss={closeDeviceModal}
				disabled={!isValid}
			/>
		);
	};

	const renderDeleteDeviceModal = (): JSX.Element => (
		<Modal
			isModalOpen={state.isDeleteModalOpen}
			renderDialogText="Do you confirm deletion of device?"
			onClose={toggleDeviceDeleteModal}
			renderHeader="Delete Device"
			submitButtonName="Delete"
			onSubmit={handleDeviceDelete}
			onDismiss={toggleDeviceDeleteModal}
		/>
	);

	const renderDeviceCards = (): JSX.Element => (
		<Grid container spacing={1}>
			{devices.map((device) => (
				<Grid item xs={12} key={fancyId()}>
					<Box
						component={Card}
						variant={'outlined'}
						sx={{
							padding: 0,
							borderColor: alpha(deviceColorStatus(device), 0.2),
							borderLeftColor: alpha(deviceColorStatus(device), 0.8),
							borderLeftWidth: 4,
						}}
					>
						<Box
							component={CardContent}
							display={'flex'}
							alignItems={'center'}
						>
							<Box
								display={'flex'}
								flexDirection={{ xs: 'column', sm: 'row' }}
								flex={'1 1 100%'}
								justifyContent={{ sm: 'space-between' }}
								alignItems={{ sm: 'center' }}
							>
								<Typography
									variant={'body1'}
									fontWeight={600}
									fontSize={14}
									sx={{ marginBottom: { xs: 0, sm: 0 } }}
								>
									{device?.id ?? 'No device'}
								</Typography>
								<Typography
									variant={'subtitle2'}
									color={'text.secondary'}
									sx={{ marginBottom: { xs: 0, sm: 0 } }}
								>
									{device?.user
										? `${device?.user?.firstName} ${device?.user?.lastName}`
										: 'NOT ASSIGNED'}
								</Typography>
							</Box>
							<Box marginLeft={2} color={'primary.main'}>
								{renderActionButtons(device)}
							</Box>
						</Box>
					</Box>
				</Grid>
			))}
		</Grid>
	);

	return (
		<div data-testid="device-management-page">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<DashboardCard
						heading="Device Management"
						body={isSm ? renderDeviceCards() : renderTableContent()}
						actionItem={
							<Button
								color="primary"
								size="small"
								variant="outlined"
								onClick={showDeviceModal('Add')}
							>
								<Add fontSize="small" />
								Add device
							</Button>
						}
					/>
				</Grid>
			</Grid>
			{renderAddEditDeviceModal()}
			{renderDeleteDeviceModal()}
		</div>
	);
};

export default DeviceManagementView;
