import { useState, SyntheticEvent, ReactNode } from 'react';
import { Button, Grid, Tabs, Tab, Box, Typography } from '@mui/material';
import { DashboardCard } from '@components/molecules';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Container from '@components/Container';

interface TabPanelProps {
	children?: ReactNode;
	dir?: string;
	index: number;
	value: number;
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

const a11yProps = (index: number) => {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
};

const UserSupportView = (): JSX.Element => {
	const theme = useTheme();
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	// const handleChangeIndex = (index: number) => {
	// 	setValue(index);
	// };

	const renderContent = () => (
		<Container paddingY={0}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="secondary"
				textColor="inherit"
				variant="fullWidth"
				aria-label="full width tabs"
			>
				<Tab label="Open tickets" {...a11yProps(0)} />
				<Tab label="Closed tickets" {...a11yProps(1)} />
			</Tabs>
			<div>
				<TabPanel value={value} index={0} dir={theme.direction}>
					Open tickets
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					Closed tickets
				</TabPanel>
			</div>
		</Container>
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<DashboardCard
					heading="My tickets"
					body={renderContent()}
					actionItem={
						<Button color="primary" size="small" variant="outlined">
							<Add fontSize="small" />
							Open new ticket
						</Button>
					}
				/>
			</Grid>
		</Grid>
	);
};

export default UserSupportView;
