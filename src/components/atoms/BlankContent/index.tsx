import { Typography } from '@mui/material';

const BlankContent = ({ message }: { message: string }): JSX.Element => {
	return (
		<Typography
			variant="h6"
			color="textSecondary"
			sx={{
				fontFamily: 'San Francisco, serif !important',
				fontSize: '30px !important',
				fontWeight: 200,
				letterSpacing: -1,
			}}
		>
			{message}
		</Typography>
	);
};

export default BlankContent;
