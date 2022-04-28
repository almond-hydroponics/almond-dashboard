import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const darkLogo = '/logo.png';
const logo = '/logo.png';

interface Props {
	displayText?: boolean;
}

const Logo = ({ displayText = false }: Props): JSX.Element => {
	const router = useRouter();
	const {
		palette: { mode },
	} = useTheme();

	return (
		<div
			data-testid="logo"
			onClick={() => router.push('/')}
			onKeyDown={() => router.push('/')}
			role="presentation"
			style={{ cursor: 'pointer' }}
		>
			<Stack
				direction="row"
				justifyContent="flex-start"
				alignItems="center"
				spacing={1}
			>
				<Box display={'flex'} title="almond" width={{ xs: 30, md: 30 }}>
					<Box
						component={'img'}
						src={mode === 'light' ? logo : darkLogo}
						alt="logo"
						height={1}
						width={1}
					/>
				</Box>
				{displayText && (
					<Typography
						variant="h5"
						color="textPrimary"
						style={{ fontWeight: 600, fontSize: '1.45rem' }}
					>
						almond
					</Typography>
				)}
			</Stack>
		</div>
	);
};

export default Logo;
