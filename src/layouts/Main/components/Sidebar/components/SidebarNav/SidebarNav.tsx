import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import NavItem from './components/NavItem';
import pages from '../../../../../navigation';
import { useRouter } from 'next/router';
import authService from '@utils/auth';
import Modal from '../../../../../../components/atoms/Modal';
import { Form } from '../../../Topbar/components';
import { useState } from 'react';
import Container from '@components/Container';
import { Stack, Typography } from '@mui/material';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	handleContactModal: () => void;
}

const SidebarNav = ({ onClose, handleContactModal }: Props): JSX.Element => {
	const router = useRouter();
	const [openAuthModal, setAuthModalOpen] = useState<boolean>(false);

	const handleAuthModal = () => setAuthModalOpen((prevState) => !prevState);

	const renderAuthButtons = () => (
		<Box>
			<Button
				fullWidth
				variant="outlined"
				color="primary"
				size="medium"
				onClick={handleAuthModal}
			>
				{authService.isAuthenticated() ? 'Logout' : 'Account'}
			</Button>
		</Box>
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
		<Box>
			<Box
				display={'flex'}
				justifyContent={'flex-end'}
				onClick={() => onClose()}
			>
				<IconButton>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box paddingX={2} paddingBottom={2}>
				<Box>
					<NavItem
						title={'Landings'}
						items={pages}
						handleContactModal={handleContactModal}
					/>
				</Box>
				<Divider sx={{ marginBottom: 2 }} />
				{renderAuthButtons()}
				<Box marginTop={2}>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						component="a"
						target="blank"
						onClick={() => router.push('/store')}
					>
						Go to store
					</Button>
				</Box>
				{renderAuthModal()}
			</Box>
			<Container paddingY={2} sx={{ bottom: 0, position: 'fixed' }}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
				>
					<Typography
						variant={'body2'}
						onClick={() => router.push('company-terms')}
					>
						Legal
					</Typography>
					<Typography variant={'caption'} fontSize={10} fontWeight={300}>
						v1.01.123
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default SidebarNav;
