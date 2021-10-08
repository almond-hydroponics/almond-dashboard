import { Grid, Typography, Box } from '@mui/material';
import { DashboardCardProps } from './interfaces';
import { useTheme } from '@mui/material/styles';

const DashboardCard = ({
	heading,
	actionItem,
	body,
}: DashboardCardProps): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid
			item
			xs={12}
			sx={{
				height: 'fit-content',
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: 2,
				backgroundColor: theme.palette.background.paper,
				marginBottom: 1,
				[theme.breakpoints.up('sm')]: {
					marginRight: 1,
				},
			}}
		>
			{heading && (
				<Box
					padding={2}
					display={'flex'}
					alignItems="center"
					justifyContent="space-between"
				>
					<Box marginRight={2}>
						<Typography
							sx={{
								fontWeight: 500,
								backgroundColor: 'rgba(25, 103, 210, 0.11)',
								padding: '6px 20px',
								borderRadius: 1,
								width: 'fit-content',
								[theme.breakpoints.down('sm')]: {
									fontSize: 11,
									paddingLeft: 2,
									paddingRight: 2,
								},
							}}
							variant="subtitle2"
							color="primary"
							data-testid="header"
						>
							{heading}
						</Typography>
					</Box>
					<Box marginLeft={2}>{actionItem}</Box>
				</Box>
			)}
			<Box
				padding={2}
				display={'flex'}
				alignItems="center"
				justifyContent="space-around"
				// sx={{ flex: '1 0 auto', flexDirection: 'row', width: '100%' }}
				data-testid="body"
			>
				{body}
			</Box>
		</Grid>
	);
};

export default DashboardCard;
