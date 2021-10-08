import {
	useMediaQuery,
	Grid,
	Typography,
	FormControlLabel,
	Checkbox,
	Button,
	Divider,
	Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Notifications = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box>
			<Box
				display={'flex'}
				flexDirection={{ xs: 'column', md: 'row' }}
				justifyContent={'space-between'}
				alignItems={{ xs: 'flex-start', md: 'center' }}
			>
				<Typography variant="h6" fontWeight={700}>
					Update app notifications
				</Typography>
				<Button
					size={'large'}
					variant={'outlined'}
					sx={{ marginTop: { xs: 2, md: 0 } }}
				>
					Reset all
				</Button>
			</Box>
			<Box paddingY={4}>
				<Divider />
			</Box>

			<form>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" gutterBottom>
							System settings
						</Typography>
						<Typography variant="caption" gutterBottom>
							Receive emails to your email address
						</Typography>
						<Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked color="primary" />}
									label="E-mail alerts"
								/>
							</Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked color="primary" />}
									label="Push notifications"
								/>
							</Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked color="primary" />}
									label="Text messages"
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" gutterBottom>
							Device settings
						</Typography>
						<Typography variant="caption" gutterBottom>
							Receive alerts from your device
						</Typography>
						<Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked color="primary" />}
									label="Health checks"
								/>
							</Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked color="primary" />}
									label="Device alerts"
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" gutterBottom>
							Chat settings
						</Typography>
						<Typography variant="caption" gutterBottom>
							Receive info about your chats
						</Typography>
						<Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked={false} color="primary" />}
									label="E-mail alerts"
								/>
							</Box>
							<Box>
								<FormControlLabel
									control={<Checkbox defaultChecked color="primary" />}
									label="Push notifications"
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item container justifyContent="flex-start" xs={12}>
						<Button
							fullWidth={!isMd}
							variant="contained"
							type="submit"
							color="primary"
							size="large"
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default Notifications;
