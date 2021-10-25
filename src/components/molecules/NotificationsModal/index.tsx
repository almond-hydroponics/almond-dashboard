import { useState, KeyboardEvent, MouseEvent } from 'react';
import { ActivityLogCard, BlankContent } from '@components/atoms';
import {
	Avatar,
	Badge,
	Button,
	Chip,
	Divider,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	SwipeableDrawer,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	AccountCircleOutlined,
	HelpOutline,
	Logout,
	NotificationsNoneRounded,
} from '@mui/icons-material';
import { notificationsUnread } from '../../../layouts/Dashboard/components/Topbar/fixtures';
import { alpha, useTheme } from '@mui/material/styles';
import fancyId from '@utils/fancyId';

const NotificationsModal = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const theme = useTheme();
	const { mode } = theme.palette;

	const notificationItems = [
		{
			name: 'Device setup completed successfully',
			icon: <AccountCircleOutlined />,
			secondaryText: 'View more settings',
		},
		{
			name: 'Support ticket #1',
			icon: <HelpOutline />,
			secondaryText: 'Hello Masha. Kindly reach out for help',
		},
	];

	const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleNotificationsClose = () => setAnchorEl(null);

	const renderNotificationsModal = (): JSX.Element => (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleNotificationsClose}
			onClick={handleNotificationsClose}
			PaperProps={{
				elevation: 0,
				sx: {
					zIndex: theme.zIndex.appBar + 1,
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<MenuItem>
				<ListItemText
					primary="Notifications"
					primaryTypographyProps={{ fontSize: 16, fontWeight: 600 }}
				/>
				<Chip
					color="secondary"
					size="small"
					sx={{
						fontWeight: 500,
						fontSize: 12,
					}}
					label={`${notificationItems.length} new`}
				/>
			</MenuItem>

			{notificationItems.map((item) => {
				const handleClick = () => {
					handleNotificationsClose();
				};
				return (
					<MenuItem
						key={fancyId()}
						onClick={handleClick}
						sx={{
							borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							paddingY: 2,
						}}
					>
						<ListItemAvatar sx={{ minWidth: 44 }}>
							<Avatar sx={{ backgroundColor: '#e8f0fe', color: '#1967d2' }}>
								{item.icon}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={item.name}
							primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
							secondaryTypographyProps={{ fontSize: 12, fontWeight: 400 }}
							secondary={item.secondaryText}
						/>
					</MenuItem>
				);
			})}

			<MenuItem>
				<Button
					fullWidth
					variant="contained"
					type="submit"
					color="primary"
					size="small"
				>
					View more
				</Button>
			</MenuItem>
		</Menu>
	);

	const renderNotificationsIcon = (): JSX.Element => (
		// :TODO: Implement notifications function
		<Tooltip title="Toggle notifications">
			<Button
				variant={'outlined'}
				aria-label="Dark mode toggler"
				color={mode === 'light' ? 'primary' : 'secondary'}
				onClick={handleNotificationsClick}
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
					color="secondary"
					badgeContent={notificationItems.length}
				>
					<NotificationsNoneRounded color="primary" />
				</Badge>
			</Button>
		</Tooltip>
	);

	return (
		<>
			{renderNotificationsIcon()}
			{renderNotificationsModal()}
		</>
	);
};

export default NotificationsModal;
