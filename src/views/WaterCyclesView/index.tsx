import { useState, useEffect, useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// third-party libraries
import {
	Grid,
	Stack,
	Button,
	IconButton,
	InputAdornment,
	Switch,
	TextField,
	Typography,
	SwitchProps,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileTimePicker } from '@mui/lab';
import { styled, useTheme } from '@mui/material/styles';
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridOverlay,
	GridSortDirection,
} from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
// components
import { Modal, LinearProgressBar } from '@components/atoms';
import { GeneralCardInfo, DashboardCard } from '@components/molecules';
import { LineChartCard, DonutDisplay } from '@components/organisms';
// icons
import { BlurCircular, AddAlarmTwoTone, Add } from '@mui/icons-material';
// import { ComponentContext } from '@context/ComponentContext';
import { UserContext } from '@context/UserContext';
// thunks
import {
	addNewSchedule,
	deleteSingleSchedule,
	editSchedule,
	getAllSchedules,
	getPumpStatus,
	togglePump,
	toggleScheduleStatus,
} from '@modules/timeSchedules';
import { getAirTemperatureTrend } from '@modules/sensorData';
// utils
import {
	validateNewOneHourTime,
	validateEditOneHourTime,
} from '@utils/validateTimeOneHour';
import roundDigit from '@utils/roundDigit';
import dayjs from '@utils/dayjsTime';
import { DateRanges } from '@components/molecules/DateRangePicker/interfaces';
import getDateRange from '@utils/DateRangeSelect';
// interfaces
import {
	dateSelectOptions,
	timeWindowRange,
} from '@components/organisms/LineChartCard/fixtures';
import { WaterCyclesPageState } from './interfaces';
import { IRootState } from '../../store/rootReducer';

export const BlankContent = ({
	message,
}: {
	message: string;
}): JSX.Element => {
	return (
		<Typography
			variant="h6"
			color="textSecondary"
			sx={{
				fontFamily: 'San Francisco, serif !important',
				fontSize: 30,
				fontWeight: 300,
				letterSpacing: -2,
				wordSpacing: 2,
			}}
		>
			{message}
		</Typography>
	);
};

export const CustomLoadingOverlay = () => {
	return (
		<GridOverlay>
			<div style={{ position: 'absolute', top: 0, width: '100%' }}>
				<LinearProgressBar />
			</div>
		</GridOverlay>
	);
};

const ToggleSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
	root: {
		color: theme.palette.primary.main,
		'&$checked': {
			color: theme.palette.primary.main,
		},
	},
	switchBase: {
		color: '#FFFFFF',
		'&$checked': {
			color: theme.palette.primary.main,
		},
		'&$checked + $track': {
			backgroundColor: theme.palette.primary.main,
		},
	},
	checked: {},
	track: {},
}));

export const WaterCyclesView = (): JSX.Element => {
	const { schedules, isLoading, enabled } = useSelector(
		(globalState: IRootState) => globalState.timeSchedules,
		shallowEqual,
	);
	const { waterLevel } = useSelector(
		(globalState: IRootState) => globalState.sensorData?.sensorData,
		shallowEqual,
	);
	const { airTemperatureTrend } = useSelector(
		(globalState: IRootState) => globalState.sensorData,
		shallowEqual,
	);

	const dispatch = useDispatch();
	const theme = useTheme();
	const [state, setState] = useState<WaterCyclesPageState>({
		isEditMode: false,
		isDeleteModalOpen: false,
		scheduleId: '',
		statusClass: '',
		isEnabled: false,
		isAddEditModalOpen: false,
		scheduleToEdit: '',
		isActionDone: false,
		isLoading: false,
		isDateRangeHidden: false,
		currentDateInView: '',
		waterCardDateRange: 'Last 4 hours',
		selectedTimeSchedule: dayjs(),
		hasError: false,
		schedules: [
			{
				_id: '',
				schedule: '',
				enabled: false,
				createdAt: '',
				updatedAt: '',
				user: '',
			},
		],
	});

	// const { setDeviceModalOpen } = useContext(ComponentContext);
	const { activeDevice } = useContext(UserContext);

	// const sensorData = useSelector(selectTemperatureData)
	// const timeSchedules = useSelector(state => state)
	// const schedules = [{
	//   _id: '',
	//   id: '',
	//   schedule: '',
	//   enabled: false,
	//   createdAt: '',
	//   updatedAt: '',
	//   user: '',
	// }]
	// const enabled = true
	// const waterTemperatureTrend = []
	// const data = useMemo(sensorDataSelector, [])
	// const dataSensor = useSelector((state: IRootState) => data(state))
	// console.log('Class: , Function: WaterCyclesPage, Line 152 sensorDate():', dataSensor);

	useEffect(() => {
		dispatch(getAllSchedules(activeDevice?._id));
	}, [activeDevice?._id]);

	useEffect(() => {
		dispatch(getPumpStatus(activeDevice?._id));
	}, [activeDevice?._id]);

	useEffect(() => {
		// const ranges = getDateRange('Today');

		// http://localhost:8081/api/range-data?start=-1d&measurement=temperature&type=window&window=10h

		const queryParams = {
			start: '-1d',
			type: 'window',
			window: '10h',
			// stop: ranges.endDate,
			measurement: 'temperature',
		};
		dispatch(getAirTemperatureTrend(queryParams));
	}, []);

	// useEffect(() => {
	//   props.getWaterData();
	// }, []);

	// React.useEffect(() => {
	//   const { scheduleToEdit } = state;
	//   const schedules = [...new Set(props.schedules.map(item => item.schedule))];
	//   const validateEdit = validateOneHourTime(schedules, scheduleToEdit);
	//   if (validateEdit) {
	//     setState({ ...state, hasError: true });
	//   } else if (validateEdit === false || undefined) {
	//     setState({ ...state, hasError: false });
	//   }
	// },              [state.scheduleToEdit]);

	const heightOfTank = 600; // units in centimeters
	const waterLevelData = heightOfTank
		? waterLevel || heightOfTank
		: heightOfTank;
	const heightOfWater = roundDigit(
		((heightOfTank - waterLevelData) / heightOfTank) * 100,
		0,
	);

	const PumpSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
		switchBase: {
			color: '#FFFFFF',
			'&$checked': {
				color: theme.palette.primary.main,
			},
			'&$checked + $track': {
				backgroundColor: theme.palette.primary.main,
			},
		},
		thumb: {
			width: 20,
			height: 20,
			animation: '$blink 1s ease infinite',
		},
		checked: {},
		track: {
			borderRadius: 20,
		},
		'@keyframes blink': {
			'50%': {
				transform: 'scale (1)',
				backgroundColor: theme.palette.primary.main,
			},
		},
	}));

	// eslint-disable-next-line no-console
	const handleClick = (message: string) => console.log(message);
	// mqtt?.publish('almond/pump', message);

	const handleTogglePumpOnChange = async (event) => {
		const { checked } = event.target;
		await handleClick(checked ? '1' : '0');
		await dispatch(
			togglePump({
				enabled: checked,
				device: activeDevice?._id,
			}),
		);
	};

	const handleToggleStatusChange = async (event, schedule) => {
		const { checked } = event.target;
		await dispatch(
			toggleScheduleStatus(schedule, {
				enabled: checked,
				device: activeDevice._id,
			}),
		);
	};

	const handleAddTimeSchedule = (value) => {
		validateNewTime(value);
		setState((prevState) => ({
			...prevState,
			selectedTimeSchedule: value,
		}));
	};

	const validateNewTime = (value) => {
		const timeSchedules = schedules.map((schedule) => schedule?.schedule);
		const isNotWithinOneHour = validateNewOneHourTime(timeSchedules, value);
		if (isNotWithinOneHour) {
			setState((prevState) => ({ ...prevState, hasError: false }));
		} else {
			setState((prevState) => ({ ...prevState, hasError: true }));
		}
	};

	const validateScheduleOnOpen = (): void => {
		const { selectedTimeSchedule } = state;
		validateNewTime(selectedTimeSchedule);
	};

	const handleEditTimeChange = (value): void => {
		setState((prevState) => ({
			...prevState,
			scheduleToEdit: value,
		}));
		validateEditTime(value);
	};

	const validateEditTime = (value): void => {
		const { scheduleId } = state;
		const isNotWithinOneHour = validateEditOneHourTime(
			schedules,
			scheduleId,
			value,
		);

		if (isNotWithinOneHour) {
			setState((prevState) => ({ ...prevState, hasError: false }));
		} else {
			setState((prevState) => ({ ...prevState, hasError: true }));
		}
	};

	const showScheduleModal =
		(mode: string) =>
		(event): void => {
			event.preventDefault();
			const { id } = event.target;
			const schedule = schedules.filter((obj) => obj._id === id);
			const setEditTimeValue = (time) => {
				const [hour, minute] = time.split(':');
				return dayjs().hour(hour).minute(minute).format();
			};

			switch (mode) {
				case 'Add':
					setState((prevState) => ({
						...prevState,
						isAddEditModalOpen: !prevState.isAddEditModalOpen,
						isEditMode: false,
					}));
					break;
				case 'Edit':
					setState((prevState) => ({
						...prevState,
						scheduleId: id,
						scheduleToEdit: setEditTimeValue(schedule[0].schedule),
						isAddEditModalOpen: !prevState.isAddEditModalOpen,
						isEditMode: true,
					}));
					break;
				default:
					setState((prevState) => ({
						...prevState,
					}));
			}
			validateScheduleOnOpen();
		};

	const closeScheduleModal = (): void => {
		setState((prevState) => ({
			...prevState,
			isAddEditModalOpen: !prevState.isAddEditModalOpen,
		}));

		setTimeout(
			() =>
				setState((prevState) => ({
					...prevState,
					selectedTimeSchedule: dayjs(),
					hasError: false,
					isEditMode: false,
					scheduleId: '',
				})),
			1000,
		);
	};

	const toggleScheduleDeleteModal = (): void => {
		setState((prevState) => ({
			...prevState,
			isDeleteModalOpen: !prevState.isDeleteModalOpen,
		}));
	};

	const handleScheduleDelete = async (event): Promise<void> => {
		event.preventDefault();
		await dispatch(deleteSingleSchedule(state.scheduleId));
		toggleScheduleDeleteModal();
	};

	const onAddEditScheduleSubmit = (event): void => {
		event.preventDefault();
		const { isEditMode, scheduleId, scheduleToEdit, selectedTimeSchedule } =
			state;
		const timeValueString = (value) => dayjs(value).format('HH:mm');

		const schedule = {
			schedule: isEditMode
				? timeValueString(scheduleToEdit)
				: timeValueString(selectedTimeSchedule),
			device: activeDevice._id,
		};

		dispatch(
			isEditMode
				? editSchedule(scheduleId, schedule)
				: addNewSchedule(schedule),
		);

		isLoading === false && closeScheduleModal();
	};

	const handleDateRangeModal = () => {
		setState((prevState) => ({
			...prevState,
			isDateRangeHidden: !prevState.isDateRangeHidden,
		}));
	};

	const onDateRangeChange = (range: DateRanges) => {
		handleDateRangeModal();
	};

	const handleDateSelect = (index) => {
		const value = dateSelectOptions[index.group][index.item];

		setState((prevState) => ({
			...prevState,
			waterCardDateRange: value,
		}));

		if (value === 'Pick a date') {
			setState((prevState) => ({
				...prevState,
				isDateRangeHidden: !prevState.isDateRangeHidden,
			}));
		}

		const ranges = getDateRange(value);

		const queryParams = {
			start: ranges.startDate,
			stop: ranges.endDate,
			measurement: 'temperature',
		};

		dispatch(getAirTemperatureTrend(queryParams));
	};

	const renderTimeScheduleForm = (): JSX.Element => {
		const { isEditMode, selectedTimeSchedule, scheduleToEdit, hasError } =
			state;

		return (
			<>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<MobileTimePicker
						label="time schedule"
						value={isEditMode ? scheduleToEdit : selectedTimeSchedule}
						onChange={
							isEditMode ? handleEditTimeChange : handleAddTimeSchedule
						}
						renderInput={(params) => (
							<TextField
								{...params}
								fullWidth
								style={{ marginTop: 12 }}
								name="time_schedule"
								{...(hasError ? { error: true } : {})}
								{...(hasError
									? {
											helperText:
												'Schedule time has to be at least one hour apart',
									  }
									: {})}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IconButton>
												<AddAlarmTwoTone
													color={hasError ? 'error' : 'primary'}
												/>
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</LocalizationProvider>
			</>
		);
	};

	const renderAddEditScheduleModal = (): JSX.Element => {
		const { isAddEditModalOpen, isEditMode, hasError } = state;
		return (
			<Modal
				isModalOpen={isAddEditModalOpen}
				isRequesting={isLoading}
				loadingText="Creating..."
				renderContent={renderTimeScheduleForm()}
				onClose={closeScheduleModal}
				renderDialogText={`${
					isEditMode ? 'Change the' : 'Add a'
				} time schedule as per your preference for pumping.`}
				renderHeader={
					isEditMode ? 'Edit time schedule' : 'Create a new time schedule'
				}
				submitButtonName={
					isEditMode ? 'Update schedule' : 'Create new schedule'
				}
				onSubmit={onAddEditScheduleSubmit}
				onDismiss={closeScheduleModal}
				disabled={hasError}
			/>
		);
	};

	const renderDeleteScheduleModal = (): JSX.Element => (
		<Modal
			isModalOpen={state.isDeleteModalOpen}
			renderDialogText="Do you confirm deletion of time schedule?"
			onClose={toggleScheduleDeleteModal}
			renderHeader="Delete Time Schedule"
			submitButtonName="Delete schedule"
			onSubmit={handleScheduleDelete}
			onDismiss={toggleScheduleDeleteModal}
		/>
	);

	const renderActionButtons = (schedule: string): JSX.Element => {
		const handleDelete = () =>
			setState((prevState) => ({
				...prevState,
				scheduleId: schedule,
				isDeleteModalOpen: !prevState.isDeleteModalOpen,
			}));

		return (
			<div key={schedule}>
				<Stack direction="row" spacing={1}>
					<Typography
						style={{ cursor: 'pointer', paddingRight: 12 }}
						id={schedule}
						variant="body2"
						color="primary"
						onClick={showScheduleModal('Edit')}
						onKeyDown={showScheduleModal('Edit')}
					>
						Edit
					</Typography>
					<Typography
						style={{ cursor: 'pointer', color: red[900] }}
						id={schedule}
						variant="body2"
						onClick={handleDelete}
						onKeyDown={handleDelete}
					>
						Delete
					</Typography>
				</Stack>
			</div>
		);
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
			fontSize: 20,
		},
		'& .MuiDataGridCell': {
			[theme.breakpoints.down('sm')]: {
				fontSize: 12,
			},
		},
	};

	const renderTableContent = (): JSX.Element => {
		const columns: GridColDef[] = [
			{
				field: 'time',
				headerName: 'Time',
				flex: 0.3,
				headerClassName: 'table-header',
				cellClassName: 'table-cell',
			},
			{
				field: 'actions',
				headerName: 'Actions',
				flex: 0.4,
				headerClassName: 'table-header',
				renderCell: ({ value }: GridCellParams) =>
					renderActionButtons(value as string),
			},
			{
				field: 'status',
				headerName: 'Status',
				flex: 0.3,
				headerClassName: 'table-header',
				renderCell: ({ value, getValue }: GridCellParams) => (
					<ToggleSwitch
						checked={value as boolean}
						onChange={(e) =>
							handleToggleStatusChange(e, getValue('actions', 'status'))
						}
					/>
				),
			},
		];

		const rows = schedules.map((schedule) => ({
			id: schedule._id,
			time: schedule.schedule,
			actions: schedule._id,
			status: schedule.enabled,
		}));

		return (
			<div style={{ width: '100%', height: 400, ...tableStyles }}>
				<DataGrid
					disableColumnMenu
					style={{ ...tableStyles }}
					loading={isLoading}
					rows={rows}
					autoPageSize
					pagination
					columns={columns.map((column) => ({
						...column,
						disableClickEventBubbling: true,
					}))}
					components={{
						LoadingOverlay: CustomLoadingOverlay,
					}}
					sortModel={[
						{
							field: 'time',
							sort: 'asc' as GridSortDirection,
						},
					]}
				/>
			</div>
		);
	};

	const firstColumn = () => (
		<Grid item xs={12} md={4}>
			<GeneralCardInfo
				mainHeader="Manual Override"
				subHeader="Pump water directly into the system"
				icon={<BlurCircular />}
				actionItem={
					<PumpSwitch
						className="manual-override"
						onChange={handleTogglePumpOnChange}
						checked={enabled}
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
				}
			/>
			<DashboardCard
				heading="Water Schedules"
				body={renderTableContent()}
				actionItem={
					<Button
						color="primary"
						size="small"
						variant="outlined"
						onClick={showScheduleModal('Add')}
					>
						<Add fontSize="small" />
						Add schedule
					</Button>
				}
			/>
		</Grid>
	);

	const secondColumn = () => (
		<Grid item xs={12} md={5}>
			<LineChartCard
				heading="Water Temperature"
				selectedValue={state.waterCardDateRange}
				handleDateSelect={handleDateSelect}
				isDateRangeHidden={state.isDateRangeHidden}
				onDateRangeChange={onDateRangeChange}
				handleDateRangeModal={handleDateRangeModal}
				data={airTemperatureTrend}
				duration={timeWindowRange[state.waterCardDateRange]}
			/>
		</Grid>
	);

	const thirdColumn = () => (
		<Grid item xs={12} md={3}>
			<DashboardCard
				heading="Water Tank Level"
				body={<DonutDisplay data={heightOfWater} />}
			/>
		</Grid>
	);

	return (
		<div data-testid="water-cycles-page">
			<Grid container spacing={1}>
				{firstColumn()}
				{secondColumn()}
				{thirdColumn()}
				{renderAddEditScheduleModal()}
				{renderDeleteScheduleModal()}
			</Grid>
		</div>
	);
};

export default WaterCyclesView;
