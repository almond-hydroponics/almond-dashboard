import { useTheme } from '@mui/material/styles';
import Typed from 'react-typed';
import { alpha, Box, Typography, Grid } from '@mui/material';

const Hero = (): JSX.Element => {
	const theme = useTheme();

	return (
		<Grid container spacing={4}>
			<Grid item container alignItems={'center'} xs={12} md={8}>
				<Box>
					<Box marginBottom={2}>
						<Typography
							variant="h3"
							color="text.primary"
							gutterBottom
							sx={{
								fontWeight: 700,
							}}
						>
							almond blog for new <br />
							<Typography
								color={'primary'}
								component={'span'}
								variant={'inherit'}
								sx={{
									background: `linear-gradient(180deg, transparent 82%, ${alpha(
										theme.palette.secondary.main,
										0.3,
									)} 0%)`,
								}}
							>
								<Typed
									strings={['thoughts.', 'ideas.', 'innovations.']}
									typeSpeed={80}
									loop={true}
								/>
							</Typography>
						</Typography>
					</Box>
				</Box>
			</Grid>
			{/*<Grid item xs={12} md={6}>*/}
			{/*	<Box*/}
			{/*		// height={1}*/}
			{/*		// width={1}*/}
			{/*		display={'flex'}*/}
			{/*		justifyContent={'center'}*/}
			{/*		alignItems={'center'}*/}
			{/*	>*/}
			{/*		<Box maxWidth={500}>*/}
			{/*			<Box*/}
			{/*				component={'img'}*/}
			{/*				src={*/}
			{/*					'https://assets.maccarianagency.com/the-front/illustrations/mobiles.svg'*/}
			{/*				}*/}
			{/*				width={1}*/}
			{/*				height={1}*/}
			{/*				sx={{*/}
			{/*					filter:*/}
			{/*						theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',*/}
			{/*				}}*/}
			{/*			/>*/}
			{/*		</Box>*/}
			{/*	</Box>*/}
			{/*</Grid>*/}
		</Grid>
	);
};

export default Hero;
