import {
	Grid,
	Typography,
	Divider,
	Box,
	useMediaQuery,
	Avatar,
	Chip,
} from '@mui/material';
import { Form } from '../../../EnterDeviceIdView/components';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '@context/UserContext';

const Device = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const { devices } = useContext(UserContext);

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

			<Grid container spacing={2} justifyContent={'center'}>
				<Grid item xs={12} md={6}>
					<Form />
				</Grid>
				<Grid
					item
					container
					justifyContent={isMd ? 'flex-start' : 'center'}
					xs={12}
					md={6}
				>
					{devices.map((device) => (
						<Chip
							sx={{
								margin: 0.5,
								color: '#3E4E56',
								backgroundColor: '#D9E9BA',
								fontWeight: 500,
							}}
							key={device._id}
							label={device.id}
							avatar={
								<Avatar
									sx={{
										backgroundColor: '#3E4E56',
										color: '#FFFFFF !important',
									}}
								>
									{devices.indexOf(device) + 1}
								</Avatar>
							}
						/>
					))}
				</Grid>
			</Grid>
			<Box paddingY={4}>
				<Divider />
			</Box>
		</Box>
	);
};

export default Device;
