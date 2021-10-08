import { useContext } from 'react';
// components
import {
	AdminBottomNavigationMenus,
	BottomNavigationMenus,
} from '@components/molecules';
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
					borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
