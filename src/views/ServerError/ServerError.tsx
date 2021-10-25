import Container from '@components/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { ArrowBack } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const ServerError = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const router = useHistory();

	return (
		<Box
			bgcolor={theme.palette.alternate.main}
			position={'relative'}
			minHeight={'100vh'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			height={1}
		>
			<Container>
				<Grid container>
					<Grid item container justifyContent={'center'} xs={12} md={6}>
						<Box height={1} width={1} maxWidth={500}>
							<Box
								component={'img'}
								src={
									'https://storage.googleapis.com/static.almondhydroponics.com/static/images/illustration_500.svg'
								}
								width={1}
								height={1}
								sx={{
									filter:
										theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
								}}
							/>
						</Box>
					</Grid>
					<Grid
						item
						container
						alignItems={'center'}
						justifyContent={'center'}
						xs={12}
						md={6}
					>
						<Box>
							{/*<Typography*/}
							{/*	variant="h1"*/}
							{/*	component={'h1'}*/}
							{/*	align={isMd ? 'left' : 'center'}*/}
							{/*	sx={{ fontWeight: 700 }}*/}
							{/*>*/}
							{/*	500*/}
							{/*</Typography>*/}
							<Typography
								variant="body1"
								component="p"
								color="text.secondary"
								align={isMd ? 'left' : 'center'}
							>
								We are experiencing an internal server problem. Please try
								again later or if you think this is a problem with us, please{' '}
								<Link href="mailto:almond.froyo@gmail.com" underline="none">
									tell us
								</Link>
							</Typography>
							<Box
								marginTop={4}
								display={'flex'}
								justifyContent={{ xs: 'center', md: 'flex-start' }}
							>
								<Button
									variant="contained"
									color="primary"
									size="large"
									startIcon={<ArrowBack />}
									onClick={() => router.push('/')}
								>
									Back home
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default ServerError;
