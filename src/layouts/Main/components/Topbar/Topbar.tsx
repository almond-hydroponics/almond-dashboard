import { Stack, Button, Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
// components
import { DarkModeToggler, Link } from '@components/atoms';
import authService from '@utils/auth';
import CustomAvatar from '@components/molecules/CustomAvatar';
import Logo from '@components/atoms/Logo';
import { AccountCircleTwoTone, ShortTextRounded } from '@mui/icons-material';
import Modal from '@components/atoms/Modal';
import { useState } from 'react';
import { Form } from './components';
import { useRouter } from 'next/router';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
	handleContactModal: () => void;
}

const Topbar = ({ onSidebarOpen, handleContactModal }: Props): JSX.Element => {
	const [openAuthModal, setAuthModalOpen] = useState<boolean>(false);
	const theme = useTheme();
	const router = useRouter();

	const handleAuthModal = () => setAuthModalOpen((prevState) => !prevState);

	const renderAuthButtons = () => (
		<>
			<Box marginLeft={3}>
				{authService.isAuthenticated() ? (
					<Stack direction="row" spacing={2}>
						<Button
							onClick={() => router.replace('dashboard')}
							variant="outlined"
							color="primary"
						>
							{'Go to dashboard'}
						</Button>
						<CustomAvatar />
					</Stack>
				) : (
					<Button
						variant="outlined"
						color="primary"
						size="medium"
						onClick={handleAuthModal}
						startIcon={<AccountCircleTwoTone color="primary" />}
					>
						Account
					</Button>
				)}
			</Box>
		</>
	);

	const renderAuthModal = (): JSX.Element => (
		<Modal
			isModalOpen={openAuthModal}
			renderHeader="Login into your account"
			renderDialogText="Choose your preferred method to authenticate into your account"
			renderContent={<Form handleAuthModal={handleAuthModal} />}
			onClose={handleAuthModal}
			onDismiss={handleAuthModal}
		/>
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
					<Button
						sx={{
							color: theme.palette.text.primary,
							'&:hover': {
								color: theme.palette.primary.dark,
							},
						}}
						variant="text"
						component={Link}
						noLinkStyle
						href="/resources"
					>
						Resources
					</Button>
				</Box>

				<Box marginLeft={3}>
					<Button
						sx={{
							color: theme.palette.text.primary,
							'&:hover': {
								color: theme.palette.primary.dark,
							},
						}}
						variant="text"
						component={Link}
						noLinkStyle
						href="/store"
					>
						Store
					</Button>
				</Box>

				<Box marginLeft={3}>
					<Button
						sx={{
							color: theme.palette.text.primary,
							'&:hover': {
								color: theme.palette.primary.dark,
							},
						}}
						variant="text"
						component={Link}
						noLinkStyle
						href="/blog"
					>
						Latest news
					</Button>
				</Box>

				<Box marginLeft={3}>
					<Button
						sx={{
							color: theme.palette.text.primary,
							'&:hover': {
								color: theme.palette.primary.dark,
							},
						}}
						variant="text"
						onClick={handleContactModal}
					>
						Contact us
					</Button>
				</Box>
			</Box>

			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Box marginLeft={3}>
					<DarkModeToggler
						moonColor={theme.palette.secondary.main}
						sunColor={theme.palette.primary.main}
					/>
				</Box>
				{renderAuthButtons()}
			</Box>

			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<DarkModeToggler
					moonColor={theme.palette.secondary.main}
					sunColor={theme.palette.primary.main}
				/>
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
			{renderAuthModal()}
		</Box>
	);
};

export default Topbar;
