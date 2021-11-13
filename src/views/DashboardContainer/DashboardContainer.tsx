import {
	useState,
	useEffect,
	useContext,
	ChangeEvent,
	createElement,
} from 'react';
// third-party libraries
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DashboardContainerState } from './interfaces';
import { alpha, useTheme } from '@mui/material/styles';
import { UserContext } from '@context/UserContext';
import { useRouter } from 'next/router';
import { AdminMenus, UserMenus } from '@components/molecules/MenuRoutes';
import dayjs from 'dayjs';
// icons
import { AllOutTwoTone, Close, Face } from '@mui/icons-material';
// components;
import { BlankContent, Modal, TabPanel } from '@components/atoms';
import { IRootState } from '../../store/rootReducer';
import { ComponentContext } from '@context/ComponentContext';
// import { useSubscription } from '@hooks/mqtt';
import {
	Box,
	IconButton,
	InputAdornment,
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Stack,
	SwipeableDrawer,
	TextField,
	Typography,
} from '@mui/material';
import Container from '@components/Container';
import Dashboard from '../../layouts/Dashboard';
// thunk
import { editUserRole } from '@modules/user';
import { activateDevice } from '@modules/device';
import {
	getSensorDataFromInflux,
	getSensorDataFromMqtt,
} from '@modules/sensorData';
// utils
import isArrayNotNull from '@utils/checkArrayEmpty';
// interfaces
import { IClientSubscribeOptions } from 'mqtt';

// export const activityLogs = [
// 	{
// 		_id: '5eecc408184ccf003a2daa29',
// 		title: 'Device turned OFF successfully',
// 		createdAt: '2020-06-19T13:56:24.859Z',
// 		type: 'success',
// 	},
// 	{
// 		_id: '5eecc408184ccf003a2daad9',
// 		title: 'Pump crashed by a dragon',
// 		createdAt: '2020-06-19T13:56:24.859Z',
// 		type: 'error',
// 	},
// 	{
// 		_id: '5eecc408f84ccf003a2daa29',
// 		title: 'Sensor cannot be found',
// 		createdAt: '2020-06-19T13:56:24.859Z',
// 		type: 'error',
// 	},
// 	{
// 		_id: '5eecc408184ccfa03a2daa29',
// 		title: 'Next pump time is 12:00PM',
// 		createdAt: '2020-06-19T13:56:24.859Z',
// 		type: 'info',
// 	},
// ];

const DashboardContainer = (): JSX.Element => {
	const theme = useTheme();
	const { activityLogs } = useSelector(
		(globalState: IRootState) => globalState,
		shallowEqual,
	);
	const {
		userDetails: { _id, currentRole, roles },
		isLoading,
	} = useSelector((globalState: IRootState) => globalState.user);
	const [state, setState] = useState<DashboardContainerState>({
		isOpen: false,
		isLoading: true,
		isFeedbackMenuOpen: false,
		isFeedbackModal: false,
		isProfileMenuOpen: false,
		device: '',
		action: '',
		fields: {},
		feedback: '',
		anchorEl: null,
		roleSelected: '',
		roleId: '',
	});

	const history = useRouter();

	const { activeDevice, devices, isAdmin } = useContext(UserContext);

	const {
		selectedIndex,
		setSelectedIndex,
		toggleRoleChangeDialog,
		handleCloseDeviceModal,
		handleSelectDeviceModal,
		isSelectDeviceModalOpen,
		isChangeRoleDialogOpen,
		toggleActivityDrawer,
		isActivityDrawerOpen,
	} = useContext(ComponentContext);

	const subscribeOptions: IClientSubscribeOptions = {
		qos: 2,
		rap: true,
	};

	const dispatch = useDispatch();

	const TIME_MS = 60_000;

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(getSensorDataFromInflux());
		}, TIME_MS);

		return () => clearInterval(interval);
	});

	// :TODO: Reformat to get user specific device subscription
	// const userSensorSubscription = 'almond/data';
	// const { message } = useSubscription(
	// 	userSensorSubscription,
	// 	subscribeOptions,
	// );

	// useEffect(() => {
	// 	if (message) {
	// 		const parsedMessage = JSON.parse(message?.message as string);
	// 		const data = {
	// 			temperature: parsedMessage?.temp,
	// 			humidity: parsedMessage?.humid,
	// 			waterLevel: parsedMessage?.water_level,
	// 		};
	// 		dispatch(getSensorDataFromMqtt(data));
	// 	}
	// }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			activeDevice,
			device: activeDevice.id,
		}));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			roleSelected: currentRole.title,
		}));
	}, [currentRole]);

	const handleSelectDevice = async () => {
		const deviceId = devices.filter((device) => device.id === state.device);
		await dispatch(activateDevice(deviceId[0]._id));
		// dispatch(getUserDetails());
		handleSelectDeviceModal();
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	};

	const handleDeviceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { value } = event.target;
		setState((prevState) => ({ ...prevState, device: value }));
	};

	const handleRoleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const roleTitle = event.target.value;
		const role = roles.filter((obj) => obj.title === roleTitle);
		setState((prevState) => ({
			...prevState,
			roleId: role[0]._id,
			roleSelected: roleTitle,
		}));
	};

	const handleChangeRole = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { roleId } = state;
		toggleRoleChangeDialog();
		if (roleId) {
			await dispatch(editUserRole(_id, { role: roleId }));
		}
		setSelectedIndex(0);
	};

	const renderSelectDeviceContent = () => (
		<TextField
			id="device"
			select
			variant="outlined"
			label="device"
			fullWidth
			size="small"
			value={state.device}
			onChange={handleDeviceInputChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<AllOutTwoTone
							sx={{ color: (theme) => theme.palette.primary.main }}
						/>
					</InputAdornment>
				),
			}}
		>
			{devices?.map((device) => (
				<MenuItem key={device.id} value={device.id}>
					<Typography fontSize={14} variant="body1">
						{device.id}
					</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const renderSelectChangeRoleContent = () => (
		<TextField
			id="user-role"
			select
			variant="outlined"
			label="role"
			fullWidth
			size="small"
			value={state.roleSelected}
			onChange={handleRoleInputChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Face sx={{ color: (theme) => theme.palette.primary.main }} />
					</InputAdornment>
				),
			}}
		>
			{roles?.map((role) => (
				<MenuItem key={role._id} value={role.title}>
					<Typography fontSize={14} variant="body1">
						{role.title}
					</Typography>
				</MenuItem>
			))}
		</TextField>
	);

	const renderSelectDeviceModal = (): JSX.Element => (
		<Modal
			isModalOpen={isSelectDeviceModalOpen}
			renderDialogText="Select the device you want to use."
			renderHeader="Select the device ID"
			renderContent={renderSelectDeviceContent()}
			onClose={handleSelectDeviceModal}
			submitButtonName="Select Device"
			onSubmit={handleSelectDevice}
			onDismiss={handleCloseDeviceModal}
		/>
	);

	const renderChangeUserRoleDialog = (): JSX.Element => (
		<Modal
			isModalOpen={isChangeRoleDialogOpen}
			renderDialogText="Select the role you want to perform."
			renderHeader="Confirm change of role"
			renderContent={renderSelectChangeRoleContent()}
			onClose={toggleRoleChangeDialog}
			submitButtonName="Select Role"
			onSubmit={handleChangeRole}
			onDismiss={toggleRoleChangeDialog}
		/>
	);

	const handleActivityDrawer = (status: 'open' | 'close') => () => {
		switch (status) {
			case 'open':
				toggleActivityDrawer(true, true);
				break;
			case 'close':
				toggleActivityDrawer(false, true);
				break;
			default:
				toggleActivityDrawer(false, true);
		}
	};

	/*
	 * Check if it is running on web browser in iOS
	 */
	// const iOS =
	// 	typeof window === 'undefined' &&
	// 	/iPad|iPhone|iPod/.test(navigator.userAgent);

	const renderActivityDrawer = () => (
		<SwipeableDrawer
			anchor="right"
			open={isActivityDrawerOpen}
			onClose={handleActivityDrawer('close')}
			onOpen={handleActivityDrawer('open')}
			// disableBackdropTransition={!iOS}
			// disableDiscovery={iOS}
			sx={{
				zIndex: 1400,
			}}
		>
			<Box
				sx={{ minWidth: 300, maxWidth: 400 }}
				role="presentation"
				onClick={handleActivityDrawer('close')}
				onKeyDown={handleActivityDrawer('close')}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
					paddingY={1}
					paddingX={2}
					sx={{
						borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					}}
				>
					<Typography fontWeight={500}>Activity logs</Typography>
					<IconButton
						aria-label="close"
						onClick={handleActivityDrawer('close')}
						sx={{
							color: (theme) => theme.palette.primary.main,
						}}
					>
						<Close />
					</IconButton>
				</Stack>
				{isArrayNotNull(activityLogs) ? (
					<List>
						{activityLogs?.map((logs) => (
							<ListItem key={logs._id} sx={{ paddingY: 0 }}>
								<ListItemText
									primary={logs.actionDesc}
									primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
									secondaryTypographyProps={{ fontSize: 12, fontWeight: 400 }}
									secondary={`${dayjs(logs.createdAt).format('HH:mm:ss')}`}
									sx={{
										backgroundColor: (theme) =>
											alpha(theme.palette[logs.type ?? 'info'].main, 0.1),
										color: (theme) => theme.palette[logs.type ?? 'info'].dark,
										border: `1px solid ${alpha(
											theme.palette[logs.type ?? 'info'].dark,
											0.2,
										)}`,
										borderRadius: 1,
										paddingY: 1,
										paddingX: 2,
									}}
								/>
							</ListItem>
						))}
					</List>
				) : (
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={3}
					>
						<p
							aria-hidden="true"
							style={{
								font: '300 36px/44px Google Sans,Helvetica Neue,sans-serif',
								letterSpacing: 'normal',
								marginBottom: 24,
								color: '#646e73',
							}}
						>
							¯\_(ツ)_/¯{' '}
						</p>
						<BlankContent message="No logs found!" />
					</Stack>
				)}
			</Box>
		</SwipeableDrawer>
	);

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	return (
		<Box
			sx={{ overflowX: 'hidden', background: theme.palette.alternate.main }}
		>
			<Dashboard>
				<Container
					sx={{ position: 'relative' }}
					maxWidth={{ sm: 720, md: '90%' }} // Replace md with 1440px if it doesn't work
					width={1}
					paddingY={{ xs: 1, sm: 6, md: 3 }}
					paddingX={{ xs: 1 }}
				>
					<TabPanel index={selectedIndex} value={selectedIndex}>
						{isLoading ? (
							<LinearProgress color="primary" />
						) : (
							createElement(checkIsAdmin()[selectedIndex].component, {
								history,
							})
						)}
					</TabPanel>
					{renderSelectDeviceModal()}
					{renderChangeUserRoleDialog()}
					{renderActivityDrawer()}
				</Container>
			</Dashboard>
		</Box>
	);
};

export default DashboardContainer;
