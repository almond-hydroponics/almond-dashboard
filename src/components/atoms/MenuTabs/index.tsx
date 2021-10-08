import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MenuTabProps {
	label?: string;
	icon?: any;
}

const MenuTabs = styled(Tabs)({
	'&.MuiTabs-indicator': {
		display: 'none',
	},
});

const MenuTab = styled((props: MenuTabProps) => (
	<Tab disableRipple {...props} />
))(({ theme }) => ({
	marginBottom: 10,
	marginTop: 10,
	textTransform: 'none',
	minWidth: 72,
	fontWeight: theme.typography.fontWeightMedium,
	fontSize: 13,
	'&:hover': {
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.background.level1,
		opacity: 1,
		borderRadius: theme.shape.borderRadius,
	},
	'&.Mui-selected': {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: theme.palette.background.level3,
		borderRadius: theme.shape.borderRadius,
	},
	'&:focus': {
		color: theme.palette.primary.main,
	},
}));

export { MenuTabs, MenuTab };
