import { Box } from '@mui/material';
// interfaces
import { TabPanelProps } from '@components/atoms/TabPanel/interfaces';

const TabPanel = ({
	children,
	value,
	index,
	...other
}: TabPanelProps): JSX.Element => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`menu-tabpanel-${index}`}
			aria-labelledby={`menu-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					sx={{
						padding: 0,
						margin: 0,
					}}
					p={3}
					{...other}
					data-testid="tab-panel"
				>
					{children}
				</Box>
			)}
		</div>
	);
};

export default TabPanel;
