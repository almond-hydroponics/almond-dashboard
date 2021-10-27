import { ChangeEvent, useContext } from 'react';
// components
import { AdminMenus, UserMenus } from '@components/molecules/MenuRoutes';
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import { MenuTab, MenuTabs } from '@components/atoms';
import { useTheme } from '@mui/material/styles';

const MenuContent = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);
	const theme = useTheme();

	const checkIsAdmin = () => (isAdmin ? AdminMenus : UserMenus);

	const handleOnChange = (
		event: ChangeEvent<HTMLDivElement>,
		value: number,
	) => {
		setSelectedIndex(value);
	};

	const a11yProps = (index: number | string) => {
		return {
			id: `menu-tab-${index}`,
			'aria-controls': `menu-tabpanel-${index}`,
		};
	};

	return (
		<MenuTabs
			style={{ padding: 20 }}
			value={selectedIndex}
			// @ts-expect-error
			onChange={handleOnChange}
			orientation="vertical"
			scrollButtons={false}
			textColor="primary"
			aria-label="menu tabs"
			visibleScrollbar={false}
		>
			{checkIsAdmin()
				.slice(0, 6)
				.map((item) => (
					<MenuTab
						key={item.primaryText}
						label={item.primaryText}
						icon={item.icon}
						{...a11yProps(selectedIndex)}
					/>
				))}
		</MenuTabs>
	);
};

export default MenuContent;
