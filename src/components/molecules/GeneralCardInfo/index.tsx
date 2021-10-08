import { ButtonBase, Grid, Typography, Box } from '@mui/material';
import { GeneralCardInfoProps } from './interfaces';
import { useTheme } from '@mui/material/styles';

const GeneralCardInfo = ({
	mainHeader,
	subHeader,
	actionItem,
	icon,
}: GeneralCardInfoProps): JSX.Element => {
	const theme = useTheme();

	return (
		<Grid
			xs={12}
			sx={{
				height: 'fit-content',
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: 2,
				backgroundColor: theme.palette.background.paper,
				marginBottom: 2,
				[theme.breakpoints.up('sm')]: {
					marginRight: 1,
				},
			}}
		>
			<Box padding={2} display={'flex'} alignItems={'center'}>
				<Box marginRight={2}>
					<ButtonBase
						sx={{
							padding: 1,
							borderRadius: 2,
							backgroundColor: 'rgba(25, 103, 210, 0.11)',
							color: '#2573b5',
						}}
					>
						{icon}
					</ButtonBase>
				</Box>
				<Box
					display={'flex'}
					flexDirection={{ xs: 'column', sm: 'row' }}
					flex={'1 1 100%'}
					justifyContent={{ sm: 'space-between' }}
					alignItems={{ sm: 'center' }}
				>
					<Box marginBottom={{ xs: 1, sm: 0 }}>
						<Typography color="primary" variant={'subtitle1'} fontWeight={700}>
							{mainHeader}
						</Typography>
						<Typography color={'text.secondary'} fontSize={14}>
							{subHeader}
						</Typography>
					</Box>
				</Box>
				<Box marginLeft={2}>{actionItem}</Box>
			</Box>
		</Grid>
	);
};

export default GeneralCardInfo;
