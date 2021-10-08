import { Grid, Typography, Divider, Box } from '@mui/material';
import { Form } from '../../../EnterDeviceIdView/components';

const Device = (): JSX.Element => {
	return (
		<Box>
			<Typography variant="h6" color="textPrimary">
				Add new device
			</Typography>
			<Typography variant={'subtitle2'} color={'text.secondary'}>
				The device ID will help you to control your purchased device from
				Almond. Kindly enter the 6 digit figure to start using your system.
				Configuration with the device might take a few minutes.
			</Typography>
			<Box paddingY={4}>
				<Divider />
			</Box>

			<form>
				<Grid container spacing={2} justifyContent={'center'}>
					<Grid item xs={12} md={6}>
						<Form />
					</Grid>
				</Grid>
				<Box paddingY={4}>
					<Divider />
				</Box>
			</form>
		</Box>
	);
};

export default Device;
