// views
import AnalyticsView from '@views/AnalyticsView';
import WaterCyclesView from '@views/WaterCyclesView';
import EnvironmentControlView from '@views/EnvironmentControlView';
import DeviceManagementView from '@views/DeviceManagementView';
import SupportView from '@views/SupportView';
import PeopleView from '@views/PeopleView';
import UserRolesView from '@views/UserRolesView';
// third-party-icons
import {
	AllOut,
	BubbleChart,
	ControlCamera,
	Help,
	LocalFlorist,
	Memory,
	Opacity,
	OpenInNew,
	People,
	Security,
	Spa,
	WidgetsRounded,
} from '@mui/icons-material';
// interfaces
import {
	MenuBottomProps,
	MenuComponentProps,
} from '@components/molecules/MenuRoutes/interfaces';

export const UserMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		component: AnalyticsView,
		id: 'analytics',
	},
	{
		icon: <Opacity />,
		primaryText: 'Water Cycles',
		component: WaterCyclesView,
		id: 'water-cycles',
	},
	{
		icon: <ControlCamera />,
		primaryText: 'Environment',
		component: EnvironmentControlView,
		id: 'environment',
	},
	{
		icon: <Security />,
		primaryText: 'Quality Control',
		component: WaterCyclesView,
		id: 'quality-control',
	},
	{
		icon: <Memory />,
		primaryText: 'Energy Usage',
		component: WaterCyclesView,
		id: 'energy-usage',
	},
	{
		icon: <LocalFlorist />,
		primaryText: 'Support',
		component: SupportView,
		id: 'support',
	},
	{
		icon: <Help />,
		primaryText: 'Help',
		component: WaterCyclesView,
		id: 'help',
	},
	{
		icon: <OpenInNew />,
		primaryText: 'Send feedback',
		component: WaterCyclesView,
		id: 'send-feedback',
	},
];

export const AdminMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		component: AnalyticsView,
		id: 'analytics',
	},
	{
		icon: <AllOut />,
		primaryText: 'Devices',
		component: DeviceManagementView,
		id: 'devices',
	},
	{
		icon: <People />,
		primaryText: 'People',
		component: PeopleView,
		id: 'people',
	},
	{
		icon: <BubbleChart />,
		primaryText: 'Roles',
		component: UserRolesView,
		id: 'roles',
	},
	{
		icon: <Spa />,
		primaryText: 'Support',
		component: SupportView,
		id: 'support',
	},
	{
		icon: <Help />,
		primaryText: 'Help',
		component: WaterCyclesView,
		id: 'help',
	},
];

export const BottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <Opacity />,
		label: 'Water',
		value: 'water',
	},
	{
		icon: <ControlCamera />,
		label: 'Environment',
		value: 'environment',
	},
	{
		icon: <Security />,
		label: 'Quality',
		value: 'quality',
	},
	{
		icon: <Memory />,
		label: 'Energy',
		value: 'energy',
	},
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <AllOut />,
		label: 'Devices',
		value: 'devices',
	},
	{
		icon: <People />,
		label: 'People',
		value: 'people',
	},
	{
		icon: <BubbleChart />,
		label: 'Roles',
		value: 'roles',
	},
	{
		icon: <Spa />,
		label: 'Requests',
		value: 'requests',
	},
];
