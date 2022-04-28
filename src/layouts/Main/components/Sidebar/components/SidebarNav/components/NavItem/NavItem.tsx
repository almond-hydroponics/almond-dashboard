import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Logo from '@components/atoms/Logo';
import Button from '@mui/material/Button';
import fancyId from '@utils/fancyId';
import { Avatar, Divider, IconButton, Stack } from '@mui/material';
import { UserContext } from '@context/UserContext';
import authService from '@utils/auth';
import { ArrowForwardIosRounded } from '@mui/icons-material';

interface Props {
	title?: string;
	items: Array<PageItem>;
	handleContactModal: () => void;
}

const NavItem = ({ items, handleContactModal }: Props): JSX.Element => {
	const theme = useTheme();
	const [activeLink, setActiveLink] = useState('');
	useEffect(() => {
		setActiveLink(window && window.location ? window.location.pathname : '');
	}, []);

	const { name, photo } = useContext(UserContext);

	const accountAvatar = () => {
		return (
			<Stack direction="row" alignItems="center" spacing={2}>
				<Avatar
					alt={name}
					src={photo}
					aria-describedby="menu-popover"
					aria-controls="menu-popover"
					aria-haspopup="true"
					typeof="button"
				/>
				<Typography variant={'body1'}>{name}</Typography>
			</Stack>
		);
	};

	return (
		<Box>
			{authService.isAuthenticated() ? accountAvatar() : <Logo displayText />}
			<Divider sx={{ marginBottom: 1, marginTop: 2 }} />

			{authService.isAuthenticated() && (
				<>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={2}
					>
						<Link href={'/messages'} passHref>
							<Button
								sx={{
									fontWeight: 500,
									fontSize: 16,
									color: 'text.primary',
									textDecoration: 'none',
									'&:hover': {
										color: theme.palette.primary.dark,
									},
								}}
								variant="text"
								size="large"
							>
								Messages
							</Button>
						</Link>
						<IconButton>
							<ArrowForwardIosRounded />
						</IconButton>
					</Stack>

					<Divider sx={{ marginBottom: 2, marginTop: 1 }} />
				</>
			)}

			{items.map((item, i) => (
				<Box key={i} marginBottom={1} marginTop={3}>
					<Box display="block">
						{item.pages.map((p) => (
							<Box marginTop={1} key={fancyId()}>
								<Link href={p.href} passHref>
									<Button
										sx={{
											fontWeight: 500,
											fontSize: 16,
											color:
												activeLink === p.href ? 'primary' : 'text.primary',
											textDecoration: 'none',
											'&:hover': {
												color: theme.palette.primary.dark,
											},
										}}
										variant="text"
										size="large"
									>
										{p.title}
									</Button>
								</Link>
							</Box>
						))}
					</Box>
				</Box>
			))}

			<Box marginBottom={2} marginTop={0}>
				<Button
					sx={{
						fontWeight: 500,
						fontSize: 16,
						color: 'text.primary',
						textDecoration: 'none',
						'&:hover': {
							color: theme.palette.primary.dark,
						},
					}}
					variant="text"
					size="large"
					onClick={handleContactModal}
				>
					Contact us
				</Button>
			</Box>
		</Box>
	);
};

export default NavItem;
