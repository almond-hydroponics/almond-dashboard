import { useContext } from 'react';
// third party
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	CssBaseline,
	Paper,
} from '@mui/material';
// components
import { ComponentContext } from '@context/ComponentContext';
import { UserContext } from '@context/UserContext';
import { alpha, useTheme } from '@mui/material/styles';
import {
	AdminBottomNavigationMenus,
	BottomNavigationMenus,
} from '@components/molecules/MenuRoutes';

const PageBottomNavigation = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);
	const theme = useTheme();

	const checkIsAdmin = () =>
		isAdmin ? AdminBottomNavigationMenus : BottomNavigationMenus;

	const handleChange = (event, newValue) => setSelectedIndex(newValue);

	return (
		<Box sx={{ pb: 7 }}>
			<CssBaseline />
			<Paper
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					background: theme.palette.alternate.main,
					// borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
				data-testid="bottom-navigation"
			>
				<BottomNavigation
					value={selectedIndex}
					onChange={handleChange}
					showLabels
				>
					{checkIsAdmin().map((menuNav, index) => (
						<BottomNavigationAction
							// sx={{ fontSize: 10 }}
							key={menuNav.label}
							label={menuNav.label}
							icon={menuNav.icon}
							value={index}
						/>
					))}
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default PageBottomNavigation;
