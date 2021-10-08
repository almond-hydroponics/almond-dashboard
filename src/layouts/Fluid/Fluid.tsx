import { ReactElement, ReactNode, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';

import Container from '@components/Container';
import { Topbar, Sidebar, Footer } from './components';

interface HideOnScrollProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
}

const HideOnScroll = ({ children }: HideOnScrollProps): JSX.Element => {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

interface Props {
	children: ReactNode;
}

const Fluid = ({ children }: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const [openSidebar, setOpenSidebar] = useState(false);

	const handleSidebarOpen = (): void => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = (): void => {
		setOpenSidebar(false);
	};

	const open = isMd ? false : openSidebar;

	return (
		<Box>
			<HideOnScroll>
				<AppBar
					position={'fixed'}
					sx={{
						backgroundColor: theme.palette.background.paper,
					}}
					elevation={1}
				>
					<Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
						<Topbar onSidebarOpen={handleSidebarOpen} />
					</Container>
				</AppBar>
			</HideOnScroll>
			<Sidebar onClose={handleSidebarClose} open={open} variant="temporary" />
			<main>
				<Box height={{ xs: 58, sm: 66 }} />
				{children}
				<Divider />
			</main>
			<Container paddingY={4}>
				<Footer />
			</Container>
		</Box>
	);
};

export default Fluid;
