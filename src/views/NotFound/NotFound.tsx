import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@components/Container';
import { ArrowBack } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import NotFoundIllustration from '../../svg/illustrations/NotFoundIllustration';

const NotFound = (): JSX.Element => {
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
							<NotFoundIllustration />
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
							<Typography
								variant="h6"
								component="p"
								color="text.secondary"
								align={isMd ? 'left' : 'center'}
							>
								Oops! Looks like you followed a bad link.
								<br />
								If you think this is a problem with us, please{' '}
								<Link href={''} underline="none">
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
									onClick={router.goBack}
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

export default NotFound;
