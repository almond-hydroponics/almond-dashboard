import { Minimal } from '../../layouts';
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { Form } from './components';
import Container from '@components/Container';

export const EnterDeviceIdView = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Minimal>
			<Box
				position={'relative'}
				minHeight={'calc(100vh - 247px)'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				height={1}
			>
				<Container maxWidth={{ sm: 720, md: 960 }}>
					<Grid container spacing={6}>
						{isMd ? (
							<Grid item container justifyContent={'center'} xs={12} md={6}>
								<Box height={1} width={1} maxWidth={500}>
									<Box
										component={'img'}
										src={
											'https://static.almondhydroponics.com/static/images/illustration_my_device.svg'
										}
										width={1}
										height={1}
										sx={{
											filter:
												theme.palette.mode === 'dark'
													? 'brightness(0.8)'
													: 'none',
										}}
									/>
								</Box>
							</Grid>
						) : null}
						<Grid
							item
							container
							alignItems={'center'}
							justifyContent={'center'}
							xs={12}
							md={6}
						>
							<Grid item xs={12}>
								<Typography variant="h6" color="textPrimary">
									Add new device
								</Typography>
								<Typography variant={'subtitle2'} color={'text.secondary'}>
									The device ID will help you to control your purchased device
									from Almond. Kindly enter the 6 digit figure to start using
									your system. Configuration with the device might take a few
									minutes.
								</Typography>
								<Box paddingY={4}>
									<Divider />
								</Box>
								<Form />
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Minimal>
	);
};

export default EnterDeviceIdView;
