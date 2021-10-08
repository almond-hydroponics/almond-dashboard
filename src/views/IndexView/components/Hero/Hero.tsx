import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Container from '@components/Container';
import authService from '@utils/auth';
import isArrayNotNull from '@utils/checkArrayEmpty';
import { UserContext } from '@context/UserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Home from '../../../../svg/illustrations/Home';

const Hero = (): JSX.Element => {
	const { devices } = useContext(UserContext);
	const isAuthed = authService.isAuthenticated();
	const router = useHistory();

	const handleLogin = () =>
		isAuthed
			? router.push(`${isArrayNotNull(devices) ? '/dashboard' : '/my-device'}`)
			: window.location.replace(
					`${process.env.REACT_APP_ALMOND_API}/auth/google`,
			  );

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
			>
				{isAuthed ? 'Go to dashboard' : 'Login to account'}
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
					<Home />
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
