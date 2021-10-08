import { AnalyticsCardProps } from './interfaces';
import { Box, ButtonBase, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AnalyticsCard = ({
	icon,
	mainInfo,
	subInfo,
	colorClass,
	onClick,
}: AnalyticsCardProps): JSX.Element => {
	const theme = useTheme();
	const classes = {
		root: {
			flexGrow: 1,
		},
		details: {
			display: 'flex',
			flexDirection: 'row',
		},
		content: {
			flex: '1 0 auto',
			flexDirection: 'row',
			width: '100%',
		},
		title: {
			fontWeight: 500,
		},
		cardPaper: {
			borderRadius: 12,
		},
		image: {
			width: 128,
			height: 128,
		},
		mainCard: {
			cursor: 'pointer',
			borderRadius: 2,
			height: 'fit-content',
			border: `1px solid ${theme.palette.divider}`,
			marginBottom: 1,
			[theme.breakpoints.up('sm')]: {
				marginRight: 1,
			},
			// [theme.breakpoints.down('sm')]: {
			// 	paddingTop: '0 !important',
			// 	marginBottom: 1,
			// },
		},
		mainInfo: {
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
		yellowCard: {
			color: '#cc8000',
			backgroundColor: '#fef7e0',
			borderColor: 'rgba(242, 153, 0, 0.3)',
		},

		blueCard: {
			color: '#1967d2',
			backgroundColor: '#e8f0fe',
			borderColor: 'rgba(25, 103, 210, 0.3)',
		},

		purpleCard: {
			color: '#512da8',
			backgroundColor: '#f3e8fd',
			borderColor: 'rgba(81, 45, 168, 0.3)',
		},

		brownCard: {
			color: '#3e2723',
			backgroundColor: '#efebe9',
			borderColor: 'rgba(62, 39, 35, 0.3)',
		},

		redCard: {
			color: '#821721',
			backgroundColor: '#e3d6d6',
			borderColor: 'rgba(210, 43, 53, 0.3)',
		},

		greenCard: {
			color: '#1b5e20',
			backgroundColor: '#e8f5e9',
			borderColor: 'rgba(27, 94, 32, 0.3)',
		},
	};

	return (
		<Grid item lg={4} md={6} xs={6}>
			<Box
				sx={{ ...classes[colorClass!], ...classes.mainCard }}
				onClick={onClick}
				data-testid="analytics-card"
			>
				<Box marginLeft={2} marginTop={1} display={{ sm: 'none' }}>
					<Typography
						classes={classes.mainInfo}
						fontWeight={500}
						fontSize={{ xs: 14, sm: 16 }}
						sx={{ ...classes[colorClass!] }}
						variant="h6"
						data-testid="main-info"
					>
						{mainInfo}
					</Typography>
				</Box>
				<Box
					classes={classes.content}
					padding={2}
					display={'flex'}
					alignItems={'center'}
				>
					<Box marginRight={2}>
						<ButtonBase>{icon}</ButtonBase>
					</Box>
					<Box
						display={'flex'}
						flexDirection={{ xs: 'column', sm: 'row' }}
						flex={'1 1 100%'}
						justifyContent={{ sm: 'space-between' }}
						alignItems={{ sm: 'center' }}
					>
						<Typography
							fontWeight={500}
							fontSize={{ xs: 14, sm: 16 }}
							sx={{ ...classes[colorClass!], ...classes.mainInfo }}
							variant="h6"
							data-testid="main-info"
						>
							{mainInfo}
						</Typography>
						<Typography
							variant="h4"
							fontWeight={600}
							sx={{ ...classes[colorClass!] }}
							data-testid="sub-info"
						>
							{subInfo}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

export default AnalyticsCard;
