import { ChangeEvent, useContext } from 'react';
// components
import { AdminMenus, UserMenus } from '@components/molecules/MenuRoutes';
import { UserContext } from '@context/UserContext';
import { ComponentContext } from '@context/ComponentContext';
import { MenuTab, MenuTabs } from '@components/atoms';

const MenuContent = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);

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
