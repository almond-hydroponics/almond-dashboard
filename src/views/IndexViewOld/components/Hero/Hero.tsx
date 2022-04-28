import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Container from '@components/Container';
import authService from '@utils/auth';
import HomeIllustration from '../../../../svg/illustrations/HomeIllustration';
import { Modal } from '@components/atoms';
import { Form } from '@views/IndexView/components';
import {
	AccountCircleTwoTone,
	ArrowBack,
	ArrowForward,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store/rootReducer';

const Hero = (): JSX.Element => {
	const [openAuthModal, setAuthModalOpen] = useState<boolean>(false);
	const [authByEmail, setAuthByEmail] = useState<boolean>(false);

	const {
		userDetails: { activeDevice },
	} = useSelector((globalState: IRootState) => globalState.user);

	const isAuthed = authService.isAuthenticated();
	const router = useRouter();

	const handleAuthModal = () => {
		setAuthModalOpen((prevState) => !prevState);
		authByEmail && setAuthByEmail(false);
	};
	const handleAuthByEmail = () => setAuthByEmail((prevState) => !prevState);

	const renderModalHeader = (): JSX.Element => (
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="center"
			spacing={2}
		>
			{authByEmail ? (
				<ArrowBack onClick={handleAuthByEmail} />
			) : (
				<AccountCircleTwoTone />
			)}
			<Typography variant="h6">Login into your account</Typography>
		</Stack>
	);

	const renderAuthModal = (): JSX.Element => (
		<Modal
			isModalOpen={openAuthModal}
			maxWidth="xs"
			renderHeader={renderModalHeader()}
			renderDialogText={
				authByEmail
					? 'A link will be sent to your email account for verification'
					: 'Choose your preferred method to authenticate into your account'
			}
			renderContent={
				<Form
					handleAuthModal={handleAuthModal}
					authByEmail={authByEmail}
					handleAuthByEmail={handleAuthByEmail}
				/>
			}
			onClose={handleAuthModal}
			onDismiss={handleAuthModal}
		/>
	);

	const handleLogin = () =>
		isAuthed
			? router.push(`${activeDevice ? '/dashboard' : '/setup-device'}`)
			: handleAuthModal();

	const LeftSide = () => (
		<Box>
			<Box marginBottom={2}>
				<Typography variant="h3" color="text.primary" sx={{ fontWeight: 700 }}>
					Grow your food{' '}
				</Typography>
				<Typography
					color={'primary'}
					component={'span'}
					variant="h3"
					sx={{ fontWeight: 700 }}
				>
					healthy.
				</Typography>
			</Box>
			<Box marginBottom={3}>
				<Typography variant="h6" component="p" color="text.secondary">
					Focus on the safe production of fresh food from your own home all
					year round.
				</Typography>
			</Box>
			<Button
				variant="contained"
				color="primary"
				size="large"
				onClick={handleLogin}
				endIcon={<ArrowForward />}
			>
				{isAuthed
					? `${activeDevice ? 'Go to dashboard' : 'Configure account'}`
					: 'Login to account'}
			</Button>
		</Box>
	);

	const RightSide = (): JSX.Element => {
		return (
			<Box
				height={1}
				width={1}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Box height={1} width={1} maxWidth={700}>
					<HomeIllustration />
				</Box>
			</Box>
		);
	};

	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				overflow: 'hidden',
			}}
		>
			<Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
				<Box
					display={'flex'}
					flexDirection={{ xs: 'column', md: 'row' }}
					position={'relative'}
					minHeight={'100vh'}
				>
					<Box
						width={1}
						order={{ xs: 2, md: 1 }}
						display={'flex'}
						alignItems={'center'}
					>
						<Container>
							<LeftSide />
						</Container>
						{renderAuthModal()}
					</Box>
					<Box
						sx={{
							flex: { xs: '0 0 100%', md: '0 0 50%' },
							position: 'relative',
							maxWidth: { xs: '100%', md: '50%' },
							order: { xs: 1, md: 2 },
						}}
					>
						<Box
							sx={{
								width: { xs: 1, md: '50vw' },
								height: '100%',
								position: 'relative',
							}}
						>
							<Box
								sx={{
									width: '100%',
									height: '100%',
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										overflow: 'hidden',
										left: '0%',
										width: 1,
										height: 1,
										position: { xs: 'relative', md: 'absolute' },
										clipPath: {
											xs: 'none',
											md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
										},
										shapeOutside: {
											xs: 'none',
											md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
										},
									}}
								>
									<RightSide />
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
			<Divider />
		</Box>
	);
};

export default Hero;
