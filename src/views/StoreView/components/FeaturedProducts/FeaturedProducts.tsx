/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FeaturedProducts = (): JSX.Element => {
	return (
		<Box position={'relative'}>
			<Grid container>
				<Grid item xs={12} sm={6} data-aos={'fade-up'}>
					<Box marginBottom={2}>
						<Typography
							variant="h4"
							color="text.primary"
							sx={{ fontWeight: 700, color: '#222B45' }}
						>
							Are you looking forwards to grow your own food?
						</Typography>
					</Box>
					<Box marginBottom={3}>
						<Typography
							variant="h6"
							component="p"
							color="text.primary"
							sx={{ color: '#222B45' }}
						>
							All options include Almond Device, 60 free plants, plant
							nutrients and growing accessories.
						</Typography>
					</Box>
					<Box
						component={Button}
						variant="contained"
						color="primary"
						size="large"
						height={54}
					>
						Discover our offer
					</Box>
				</Grid>
			</Grid>
			<Box
				component={'img'}
				src={
					'https://storage.googleapis.com/static.almondhydroponics.com/static/images/nft-hydroponic-system.png'
				}
				sx={{
					maxWidth: 650,
					height: 'auto',
					position: 'absolute',
					bottom: '-134px',
					right: 0,
					display: { xs: 'none', sm: 'block' },
				}}
			/>
		</Box>
	);
};

export default FeaturedProducts;
