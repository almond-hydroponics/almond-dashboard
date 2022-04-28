import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { colors } from '@mui/material';

const Hero = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Grid container spacing={4}>
			<Grid item xs={12} md={6}>
				<Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
					<Box marginBottom={2}>
						<Typography
							variant="h3"
							color="text.primary"
							sx={{ fontWeight: 700 }}
						>
							<Typography
								color={'primary'}
								component={'span'}
								variant={'inherit'}
							>
								Experience your food{' '}
							</Typography>
							<br />
							like never before.
						</Typography>
					</Box>
					<Box marginBottom={3}>
						<Typography variant="h6" component="p" color="text.secondary">
							Offer available until the end of November:
						</Typography>
						<Typography
							variant="h3"
							color="text.primary"
							sx={{ fontWeight: 700, color: colors.red[400] }}
						>
							Ksh10,000
						</Typography>
						<Box
							component={Button}
							variant="contained"
							color="primary"
							size="large"
							marginTop={2}
						>
							Discover our offer
						</Box>
					</Box>
					<Box
						paddingX={2}
						paddingY={1}
						bgcolor={'alternate.dark'}
						borderRadius={2}
					>
						<Typography variant="body1" component="p">
							Ksh200 for our strawberry package grown from us.*
						</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid
				item
				container
				alignItems={'center'}
				justifyContent={'center'}
				xs={12}
				md={6}
				data-aos={'zoom-in'}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					borderRadius={2}
					src={
						'https://storage.googleapis.com/static.almondhydroponics.com/static/images/hydroponics.webp'
					}
					alt="..."
					effect="blur"
					maxWidth={550}
				/>
			</Grid>
		</Grid>
	);
};

export default Hero;
