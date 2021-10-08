import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// components
import { DarkModeToggler } from '@components/atoms';
import CustomAvatar from '@components/molecules/CustomAvatar';
import Logo from '@components/atoms/Logo';
import {
	ArrowDropDownTwoTone,
	ArrowDropUpTwoTone,
	Timeline,
} from '@mui/icons-material';
import { useContext } from 'react';
import { ComponentContext } from '@context/ComponentContext';
import {
	Badge,
	BadgeProps,
	Theme,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import { IRootState } from '../../../../store/rootReducer';
import { UserContext } from '@context/UserContext';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useMqttState } from '@hooks/mqtt';
import { NotificationsPanel } from '@components/molecules';

const connectedColor = '#76ff03';
const reconnectingColor = '#FFCE56';
const closedColor = '#ff1744';
const offlineColor = '#CCCCCC';

const Topbar = (): JSX.Element => {
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
	const { toggleActivityDrawer, setDeviceModalOpen, isSelectDeviceModalOpen } =
		useContext(ComponentContext);
	const { activeDevice, isAdmin } = useContext(UserContext);
	const { connectionStatus } = useMqttState();

	const { roles } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	const theme = useTheme();
	const { mode } = theme.palette;

	const statusChange = (mqttStatus: string): string => {
		switch (mqttStatus) {
			case 'Connected':
				return connectedColor;
			case 'Reconnecting':
				return reconnectingColor;
			case 'Closed':
				return closedColor;
			case 'Offline':
				return offlineColor;
			default:
				return reconnectingColor;
		}
	};

	const renderMoreButton = (handleClick) =>
		isSelectDeviceModalOpen ? (
			<ArrowDropUpTwoTone />
		) : (
			<ArrowDropDownTwoTone onClick={handleClick} />
		);

	const DeviceActiveBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
		'& .MuiBadge-badge': {
			backgroundColor: statusChange(connectionStatus as string),
			color: statusChange(connectionStatus as string),
			boxShadow: `0 0 0 1px ${
				isSm ? theme.palette.background.paper : 'rgba(38,38,38,0.32)'
			}`,
			top: '50%',
			left: '-2%',
			'&::after': {
				position: 'absolute',
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				// animation: '$ripple 1.2s infinite ease-in-out',
				border: '0.8px solid currentColor',
				content: '""',
			},
		},
	}));

	const renderTimeLineIcon = (): JSX.Element => {
		const handleClick = () => toggleActivityDrawer(true, true);
		return (
			<Tooltip title="Check device activities">
				<Button
					variant={'outlined'}
					aria-label="Dark mode toggler"
					color={mode === 'light' ? 'primary' : 'secondary'}
					sx={{
						borderRadius: 1,
						minWidth: 'auto',
						paddingX: 1,
						borderColor: alpha(theme.palette.divider, 0.2),
					}}
				>
					<Badge
						overlap="circular"
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						variant="dot"
						// invisible={isActivityLogsEmpty !== activityLogsViewed}
					>
						<Timeline color="primary" onClick={handleClick} />
					</Badge>
				</Button>
			</Tooltip>
		);
	};

	const renderDeviceDisplay = (): JSX.Element => {
		const handleClick = (): void => setDeviceModalOpen(true);
		const handleDeviceModal = (): void => setDeviceModalOpen(true);
		return (
			<Button
				variant="outlined"
				size="large"
				onClick={handleClick}
				onKeyDown={handleDeviceModal}
				endIcon={renderMoreButton(handleClick)}
				sx={{
					borderColor: alpha(theme.palette.divider, 0.2),
					backgroundColor: theme.palette.alternate.main,
				}}
			>
				<DeviceActiveBadge
					variant="dot"
					overlap="circular"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<Typography
						variant="subtitle2"
						sx={{ fontWeight: 400, fontSize: 13, marginLeft: 1 }}
						color="textPrimary"
					>
						Device ID:
					</Typography>
					<Typography
						variant="subtitle2"
						sx={{
							paddingLeft: 1,
							fontWeight: 600,
						}}
					>
						{activeDevice?.id}
					</Typography>
				</DeviceActiveBadge>
			</Button>
		);
	};

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Box sx={{ display: 'flex' }} alignItems={'center'}>
				<Logo displayText={isSm} />
			</Box>

			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Box sx={{ display: 'flex' }} alignItems={'center'}>
					{!isAdmin && renderDeviceDisplay()}
				</Box>
				<Box marginLeft={3}>{renderTimeLineIcon()}</Box>
				<Box marginLeft={3}>
					<NotificationsPanel />
				</Box>
				<Tooltip title="Toggle theme mode">
					<Box marginLeft={3}>
						<DarkModeToggler
							moonColor={theme.palette.secondary.main}
							sunColor={theme.palette.primary.main}
						/>
					</Box>
				</Tooltip>
				<Box marginLeft={3}>
					<CustomAvatar hasMultipleRoles={roles?.length > 1} />
				</Box>
			</Box>

			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<Box sx={{ display: 'flex' }} alignItems={'center'}>
					{!isAdmin && renderDeviceDisplay()}
				</Box>
				<Box marginLeft={3}>
					<CustomAvatar hasMultipleRoles={roles?.length > 1} />
				</Box>
			</Box>
		</Box>
	);
};

export default Topbar;
