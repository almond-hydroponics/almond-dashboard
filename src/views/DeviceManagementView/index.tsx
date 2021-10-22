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
import * as Highcharts from 'highcharts/highcharts.js';
import HighchartsReact from 'highcharts-react-official';
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
import { IRootState } from '../../store/rootReducer';
import { FormStateProps } from '../../types/FormStateProps';
import { red } from '@mui/material/colors';
import { alpha, useTheme } from '@mui/material/styles';
import fancyId from '@utils/fancyId';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DevicesTileMap } from '@views/DeviceManagementView/components';
// interfaces
import { DeviceManagementState } from './interfaces';

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
						backgroundColor: '#e8f0fe',
						fontWeight: 500,
					}}
					label="Not Verified"
				/>
			);
		if (!enabled)
			return (
				<Chip
					sx={{
						color: '#980910',
						backgroundColor: '#F9E3E3',
						fontWeight: 500,
					}}
					label="Disabled"
				/>
			);
		return (
			<Chip
				sx={{ backgroundColor: '#D9E9BA', color: '#3E4E56', fontWeight: 500 }}
				label="Enabled"
			/>
		);
	};

	const deviceColorStatus = (device): string[] => {
		const { verified, enabled } = device;
		if (!verified) return ['#1967d2', '#e8f0fe'];
		if (!enabled) return ['#980910', '#F9E3E3'];
		return ['#3E4E56', '#D9E9BA'];
	};

	const tableStyles = {
		border: 0,
		WebkitFontSmoothing: 'auto',
		'& .MuiDataGridIconSeparator': {
			display: 'none',
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
		'& .tableHeader': {
			color: theme.palette.primary.main,
			// fontWeight: 500,
		},
		'& .tableCell': {
			fontWeight: 500,
			fontSize: 14,
		},
		'& .MuiDataGridCell': {
			fontSize: 12,
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
				flex: 0.15,
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
				flex: 0.1,
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
			<div style={{ height: 700, width: '100%' }}>
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
				<Grid item xs={6} md={4} key={fancyId()}>
					<Box
						component={Card}
						variant={'outlined'}
						sx={{
							padding: 0,
							borderColor: alpha(deviceColorStatus(device)[0], 0.2),
							color: deviceColorStatus(device)[0],
							backgroundColor: deviceColorStatus(device)[1],
						}}
					>
						<Box
							component={CardContent}
							display={'flex'}
							alignItems={'center'}
							paddingBottom="16px !important"
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
									color={'text.primary'}
									sx={{ marginBottom: { xs: 0, sm: 0 } }}
								>
									{device?.user
										? `${device?.user?.firstName} ${device?.user?.lastName}`
										: 'NOT ASSIGNED'}
								</Typography>
							</Box>
							{/*<Box marginLeft={2} color={'primary.main'}>*/}
							{/*	{renderActionButtons(device)}*/}
							{/*</Box>*/}
						</Box>
					</Box>
				</Grid>
			))}
		</Grid>
	);

	const renderDevicesHealth = () => {
		const options: Highcharts.Options = {
			chart: {
				type: 'tilemap',
				inverted: true,
				height: '80%',
			},

			accessibility: {
				description:
					'A tile map represents the states of the USA by population in 2016. The hexagonal tiles are positioned to geographically echo the map of the USA. A color-coded legend states the population levels as below 1 million (beige), 1 to 5 million (orange), 5 to 20 million (pink) and above 20 million (hot pink). The chart is interactive, and the individual state data points are displayed upon hovering. Three states have a population of above 20 million: California (39.3 million), Texas (27.9 million) and Florida (20.6 million). The northern US region from Massachusetts in the Northwest to Illinois in the Midwest contains the highest concentration of states with a population of 5 to 20 million people. The southern US region from South Carolina in the Southeast to New Mexico in the Southwest contains the highest concentration of states with a population of 1 to 5 million people. 6 states have a population of less than 1 million people; these include Alaska, Delaware, Wyoming, North Dakota, South Dakota and Vermont. The state with the lowest population is Wyoming in the Northwest with 584,153 people.',
				// screenReaderSection: {
				// 	beforeChartFormat:
				// 		'<h5>{chartTitle}</h5>' +
				// 		'<div>{chartSubtitle}</div>' +
				// 		'<div>{chartLongdesc}</div>' +
				// 		'<div>{viewTableButton}</div>',
				// },
				point: {
					valueDescriptionFormat: '{index}. {xDescription}, {point.value}.',
				},
			},

			title: {
				text: 'U.S. states by population in 2016',
			},

			xAxis: {
				visible: false,
			},

			yAxis: {
				visible: false,
			},

			colorAxis: {
				dataClasses: [
					{
						from: 0,
						to: 1000000,
						color: '#F9EDB3',
						name: '< 1M',
					},
					{
						from: 1000000,
						to: 5000000,
						color: '#FFC428',
						name: '1M - 5M',
					},
					{
						from: 5000000,
						to: 20000000,
						color: '#FF7987',
						name: '5M - 20M',
					},
					{
						from: 20000000,
						color: '#FF2371',
						name: '> 20M',
					},
				],
			},

			tooltip: {
				headerFormat: '',
				pointFormat:
					'The population of <b> {point.name}</b> is <b>{point.value}</b>',
			},

			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '{point.hc-a2}',
						color: '#000000',
						style: {
							textOutline: undefined,
						},
					},
				},
			},

			series: [
				{
					name: '',
					data: [
						{
							//@ts-expect-error
							'hc-a2': 'AL',
							name: 'Alabama',
							region: 'South',
							x: 6,
							y: 7,
							value: 4849377,
						},
					],
				},
			],
		};

		return <HighchartsReact highcharts={Highcharts} options={options} />;
	};

	return (
		<div data-testid="device-management-page">
			<Grid container spacing={1}>
				<Grid item md={3} xs={12}>
					<DashboardCard
						heading="Devices Health"
						body={<DevicesTileMap devices={devices.length} />}
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
				<Grid item md={9} xs={12}>
					<DashboardCard
						heading="Device Management"
						body={isSm ? renderDeviceCards() : renderDeviceCards()}
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
