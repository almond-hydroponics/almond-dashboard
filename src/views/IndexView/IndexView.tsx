import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Features, Services, Hero } from './components';
import { News } from '../StoreView/components';

const IndexView = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Box sx={{ overflowX: 'hidden' }}>
			<Main>
				<Box
					bgcolor={'alternate.main'}
					sx={{
						position: 'relative',
						'&::after': {
							position: 'absolute',
							content: '""',
							width: '30%',
							zIndex: 1,
							top: 0,
							left: '5%',
							height: '100%',
							backgroundSize: '16px 16px',
							backgroundImage: `radial-gradient(${alpha(
								theme.palette.primary.dark,
								0.4,
							)} 20%, transparent 20%)`,
							opacity: 0.2,
						},
					}}
				>
					<Box position={'relative'} zIndex={3}>
						<Hero />
					</Box>
				</Box>
				<Container>
					<Services />
				</Container>
				<Box
					sx={{
						backgroundImage: `linear-gradient(to bottom, ${alpha(
							theme.palette.background.paper,
							0,
						)}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
						backgroundRepeat: 'repeat-x',
						position: 'relative',
					}}
				>
					{/*<Container>*/}
					{/*	<QuickStart />*/}
					{/*</Container>*/}
					<Container>
						<Features />
					</Container>
					<Box
						component={'svg'}
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						viewBox="0 0 1920 100.1"
						sx={{
							width: '100%',
							marginBottom: theme.spacing(-1),
						}}
					>
						<path
							fill={theme.palette.background.paper}
							d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
						/>
					</Box>
				</Box>
				{/*<Container>*/}
				{/*	<GetStarted />*/}
				{/*</Container>*/}
				<Box>
					<Container>
						<News />
					</Container>
				</Box>
			</Main>
		</Box>
	);
};

export default IndexView;
