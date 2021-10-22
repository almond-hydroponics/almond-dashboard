import { Avatar, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import fancyId from '@utils/fancyId';
import { useState, MouseEvent, useContext } from 'react';
import { Help, Logout, Mood, OpenInNew, Settings } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@modules/user';
import { UserContext } from '@context/UserContext';
import { useTheme } from '@mui/material/styles';
import { ComponentContext } from '@context/ComponentContext';
import { useHistory } from 'react-router-dom';

interface Props {
	hasMultipleRoles?: boolean;
	[x: string]: any;
}

const CustomAvatar = ({
	hasMultipleRoles = false,
	...rest
}: Props): JSX.Element => {
	const router = useHistory();
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
		await window.location.replace('/');
		dispatch(logoutUser());
	};

	const open = Boolean(anchorEl);

	let menuItems = [
		{ name: 'Settings', icon: <Settings fontSize="small" />, link: 'account' },
		{ name: 'Help', icon: <Help fontSize="small" />, link: 'help' },
		{
			name: 'Send Feedback',
			icon: <OpenInNew fontSize="small" />,
			link: 'send-feedback',
		},
	];

	if (location.pathname === '/') {
		menuItems = menuItems.filter((item) => {
			return item.name !== 'Settings';
		});
	}

	return (
		<>
			<Tooltip title="Account settings">
				<Avatar
					alt={name}
					src={photo}
					onClick={handleToggleProfileMenu}
					aria-describedby="menu-popover"
					aria-controls="menu-popover"
					aria-haspopup="true"
					typeof="button"
					{...rest}
				/>
			</Tooltip>
			<Menu
				id="menu-popover"
				anchorEl={anchorEl}
				open={open}
				onClose={handleProfileClose}
				onClick={handleProfileClose}
				PaperProps={{
					elevation: 0,
					sx: {
						zIndex: theme.zIndex.drawer + 1,
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
					const handleClick = () => {
						handleProfileClose();
						router.push(item.link);
					};
					return (
						<MenuItem
							key={fancyId()}
							onClick={handleClick}
							sx={{ fontSize: 14 }}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							{item.name}
						</MenuItem>
					);
				})}
				{location.pathname === '/dashboard' && hasMultipleRoles && (
					<MenuItem onClick={handleRoleModal} sx={{ fontSize: 14 }}>
						<ListItemIcon>
							<Mood fontSize="small" />
						</ListItemIcon>
						Change role
					</MenuItem>
				)}

				<MenuItem onClick={logoutActiveUser} sx={{ fontSize: 14 }}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomAvatar;
