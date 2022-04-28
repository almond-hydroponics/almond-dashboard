import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
	Categories,
	FeaturedProducts,
	Hero,
	LatestProducts,
	News,
	// Overview,
	Products,
} from './components';
import { alpha, useTheme } from '@mui/material/styles';

const StoreView = (): JSX.Element => {
	const theme = useTheme();

	return (
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
				<Container>
					<Hero />
				</Container>
			</Box>
			{/*<Container paddingY={'0 !important'}>*/}
			{/*	<Overview />*/}
			{/*</Container>*/}
			<Container>
				<Categories />
			</Container>
			<Box bgcolor={'alternate.dark'}>
				<Container>
					<FeaturedProducts />
				</Container>
			</Box>
			<Container>
				<Products />
			</Container>
			<Container>
				<LatestProducts />
			</Container>
			<Box bgcolor={'alternate.main'}>
				<Container>
					<News />
				</Container>
			</Box>
			{/*<Container paddingTop={'0 !important'}>*/}
			{/*	<QuickSearch />*/}
			{/*</Container>*/}
			{/*<Box bgcolor={'alternate.main'}>*/}
			{/*	<Container>*/}
			{/*		<Reviews />*/}
			{/*	</Container>*/}
			{/*</Box>*/}
			{/*<Container>*/}
			{/*	<Newsletter />*/}
			{/*</Container>*/}
		</Main>
	);
};

export default StoreView;
