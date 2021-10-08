import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
// components
import { DarkModeToggler } from '@components/atoms';
import authService from '@utils/auth';
import CustomAvatar from '@components/molecules/CustomAvatar';
import Logo from '@components/atoms/Logo';
import { ShortTextRounded } from '@mui/icons-material';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
}

const Topbar = ({ onSidebarOpen }: Props): JSX.Element => {
	const theme = useTheme();

	const renderAuthButtons = () => (
		<>
			{authService.isAuthenticated() ? (
				<Box marginLeft={3}>
					<CustomAvatar />
				</Box>
			) : (
				<>
					<Box marginLeft={3}>
						<Link href="/login">
							<Button variant="outlined" size="small">
								Login
							</Button>
						</Link>
					</Box>

					<Box marginLeft={3}>
						<Link href="/register">
							<Button variant="contained" color="primary" size="small">
								Get started
							</Button>
						</Link>
					</Box>
				</>
			)}
		</>
	);

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<Logo displayText />
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Logo displayText />
				<Box marginLeft={3}>
					<Link href="/resources">
						<Button sx={{ color: '#2d3748' }} variant="text">
							Resources
						</Button>
					</Link>
				</Box>

				<Box marginLeft={3}>
					<Link href="/store">
						<Button sx={{ color: '#2d3748' }} variant="text">
							Store
						</Button>
					</Link>
				</Box>
			</Box>

			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				{renderAuthButtons()}
				<Box marginLeft={3}>
					<DarkModeToggler />
				</Box>
			</Box>

			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<DarkModeToggler />
				<Button
					onClick={() => onSidebarOpen()}
					aria-label="Menu"
					variant={'text'}
					sx={{
						borderRadius: 1,
						minWidth: 'auto',
						padding: 1,
						marginLeft: 2,
						borderColor: alpha(theme.palette.divider, 0.2),
					}}
				>
					<ShortTextRounded />
				</Button>
			</Box>
		</Box>
	);
};

export default Topbar;
