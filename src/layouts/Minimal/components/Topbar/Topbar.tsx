import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// components
import { ArrowBackRounded } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import CustomAvatar from '@components/molecules/CustomAvatar';
import { useRouter } from 'next/router';

const Topbar = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Box
				sx={{ display: 'flex' }}
				alignItems={'center'}
				onClick={() =>
					router.push(router.pathname === '/account' ? '/dashboard' : '/')
				}
			>
				<IconButton
					style={{ padding: 0, marginRight: theme.spacing(1) }}
					color="primary"
				>
					<ArrowBackRounded className="learn-more-link__arrow" />
				</IconButton>
				<Typography
					fontWeight={500}
					variant="body1"
					color="primary"
					sx={{ cursor: 'pointer' }}
				>
					{router.pathname === '/account' ? 'back' : 'home'}
				</Typography>
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
				<CustomAvatar />
			</Box>
		</Box>
	);
};

export default Topbar;
