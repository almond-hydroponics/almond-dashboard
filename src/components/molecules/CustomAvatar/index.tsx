import {
	Avatar,
	Menu,
	MenuItem,
	Tooltip,
	ListItemAvatar,
	ListItemText,
	Button,
	IconButton,
	ListItemIcon,
} from '@mui/material';
import fancyId from '@utils/fancyId';
import { useState, MouseEvent, useContext } from 'react';
import {
	AccountCircleOutlined,
	HelpOutline,
	Logout,
	Mood,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@modules/user';
import { UserContext } from '@context/UserContext';
import { alpha, useTheme } from '@mui/material/styles';
import { ComponentContext } from '@context/ComponentContext';
import { useRouter } from 'next/router';

interface Props {
	hasMultipleRoles?: boolean;
	[x: string]: any;
}

const CustomAvatar = ({
	hasMultipleRoles = false,
	...rest
}: Props): JSX.Element => {
	const router = useRouter();
	const dispatch = useDispatch();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { name, photo } = useContext(UserContext);

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const { toggleRoleChangeDialog } = useContext(ComponentContext);

	const handleRoleModal = () => {
		handleProfileClose();
		toggleRoleChangeDialog();
	};

	const logoutActiveUser = async (): Promise<void> => {
		await dispatch(logoutUser());
		await router.replace('/');
	};

	const open = Boolean(anchorEl);

	let menuItems = [
		{
			name: 'Profile',
			icon: <AccountCircleOutlined />,
			link: 'account',
			secondaryText: 'Account settings',
		},
		{
			name: 'Help',
			icon: <HelpOutline />,
			link: 'help',
			secondaryText: 'Find support',
		},
	];

	if (router.pathname === '/') {
		menuItems = menuItems.filter((item) => {
			return item.name !== 'Settings';
		});
	}

	return (
		<>
			<Tooltip title="Account settings">
				<IconButton onClick={handleToggleProfileMenu} size="small">
					<Avatar
						alt={name}
						src={photo}
						aria-describedby="menu-popover"
						aria-controls="menu-popover"
						aria-haspopup="true"
						{...rest}
					/>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleProfileClose}
				onClick={handleProfileClose}
				PaperProps={{
					elevation: 0,
					sx: {
						width: 230,
						maxWidth: '100%',
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
				{menuItems.map((item) => {
					const handleClick = async () => {
						handleProfileClose();
						await router.push(item.link);
					};
					return (
						<MenuItem
							key={fancyId()}
							onClick={handleClick}
							sx={{
								borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							}}
						>
							<ListItemIcon sx={{ minWidth: 44, marginRight: 1 }}>
								<Avatar
									sx={{
										backgroundColor: '#e8f0fe',
										color: theme.palette.primary.main,
									}}
								>
									{item.icon}
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary={item.name}
								primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
								secondaryTypographyProps={{ fontSize: 12, fontWeight: 400 }}
								secondary={item.secondaryText}
							/>
						</MenuItem>
					);
				})}
				{router.pathname === '/dashboard' && hasMultipleRoles && (
					<MenuItem
						onClick={handleRoleModal}
						sx={{
							borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
						}}
					>
						<ListItemIcon sx={{ minWidth: 44, marginRight: 1 }}>
							<Avatar
								sx={{
									backgroundColor: '#e8f0fe',
									color: theme.palette.primary.main,
								}}
							>
								<Mood fontSize="small" />
							</Avatar>
						</ListItemIcon>
						<ListItemText
							primary="Change role"
							primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
							secondaryTypographyProps={{ fontSize: 12, fontWeight: 400 }}
							secondary="Switch between roles"
						/>
					</MenuItem>
				)}

				<MenuItem>
					<Button
						fullWidth
						variant="contained"
						type="submit"
						color="primary"
						size="small"
						startIcon={<Logout fontSize="small" />}
						onClick={logoutActiveUser}
					>
						Logout
					</Button>
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomAvatar;
