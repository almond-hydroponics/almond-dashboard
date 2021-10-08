import { useState, KeyboardEvent, MouseEvent } from 'react';
import { ActivityLogCard, BlankContent } from '@components/atoms';
import {
	Badge,
	Button,
	Divider,
	Stack,
	SwipeableDrawer,
	Tooltip,
	Typography,
} from '@mui/material';
import { Notifications, NotificationsNoneRounded } from '@mui/icons-material';
import { notificationsUnread } from '../../../layouts/Dashboard/components/Topbar/fixtures';
import { alpha, useTheme } from '@mui/material/styles';
import { useMobileDetect } from '@hooks/index';

const NotificationsPanel = (): JSX.Element => {
	const [isNotificationsDrawerOpen, setNotificationsDrawerState] =
		useState<boolean>(false);

	const theme = useTheme();
	const { mode } = theme.palette;

	const currentDevice = useMobileDetect();

	// const iOS =
	// 	typeof window === 'undefined' &&
	// 	/iPad|iPhone|iPod/.test(navigator.userAgent);

	const handleNotificationsDrawer =
		(open: boolean) => (event: KeyboardEvent | MouseEvent) => {
			if (
				event &&
				event.type === 'keydown' &&
				((event as KeyboardEvent).key === 'Tab' ||
					(event as KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setNotificationsDrawerState(() => open);
		};

	const renderNotificationsDrawer = () => (
		<SwipeableDrawer
			anchor="right"
			open={isNotificationsDrawerOpen}
			onClose={handleNotificationsDrawer(false)}
			onOpen={handleNotificationsDrawer(true)}
			disableBackdropTransition={!currentDevice.isIos()}
			disableDiscovery={currentDevice.isIos()}
		>
			<div style={{ margin: 10 }}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
					sx={{
						background: (theme) => theme.palette.alternate.main,
						padding: 1,
						marginTop: 10,
						borderRadius: 4,
					}}
				>
					<Typography
						variant="body1"
						gutterBottom={false}
						sx={{ paddingLeft: 3, paddingRight: 3, fontWeight: 500 }}
					>
						Recent notifications
					</Typography>
					<Notifications color="primary" />
				</Stack>
				<Divider sx={{ marginTop: 2 }} />
			</div>

			{notificationsUnread.length !== 0 ? (
				notificationsUnread.map((notification: any) => (
					<div
						key={notification._id}
						style={{ paddingLeft: 12, paddingRight: 12 }}
					>
						<ActivityLogCard
							log={notification.actionDesc}
							date={notification.createdAt}
							type="info"
						/>
					</div>
				))
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
							color: theme.palette.text.secondary,
						}}
					>
						¯\_(ツ)_/¯{' '}
					</p>
					<BlankContent message="No recent notifications!" />
				</Stack>
			)}
		</SwipeableDrawer>
	);

	const renderNotificationsIcon = (): JSX.Element => (
		// :TODO: Implement notifications function
		<Tooltip title="Toggle notifications">
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
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					color="primary"
					badgeContent={0}
				>
					<NotificationsNoneRounded
						onClick={handleNotificationsDrawer(!isNotificationsDrawerOpen)}
						color="primary"
					/>
				</Badge>
			</Button>
		</Tooltip>
	);

	return (
		<>
			{renderNotificationsIcon()}
			{renderNotificationsDrawer()}
		</>
	);
};

export default NotificationsPanel;
