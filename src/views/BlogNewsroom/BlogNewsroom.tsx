import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import { FooterNewsletter, Hero, MostViewedArticles } from './components';

export default function BlogNewsroom({ allPosts: { edges }, preview }) {
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
				<Box
					sx={{
						position: 'relative',
						backgroundColor: '#D5E4EB',
						// backgroundImage: `linear-gradient(120deg, ${theme.palette.alternate.dark} 0%, ${theme.palette.background.paper} 100%)`,
						// marginTop: -13,
						// paddingTop: 13,
					}}
				>
					<Container>
						<Hero />
					</Container>
				</Box>
			</Box>
			{/*<Container>*/}
			{/*	<PopularNews />*/}
			{/*</Container>*/}
			{/*<Box bgcolor={'alternate.main'}>*/}
			{/*	<Container>*/}
			{/*		<FeaturedArticles />*/}
			{/*	</Container>*/}
			{/*</Box>*/}
			{/*<Container>*/}
			{/*	<Grid container spacing={isMd ? 4 : 2}>*/}
			{/*		<Grid item xs={12} md={8}>*/}
			{/*			<LatestStories />*/}
			{/*		</Grid>*/}
			{/*		{isMd ? (*/}
			{/*			<Grid item xs={12} md={4}>*/}
			{/*				<SidebarArticles />*/}
			{/*			</Grid>*/}
			{/*		) : null}*/}
			{/*	</Grid>*/}
			{/*</Container>*/}
			<Container>
				<MostViewedArticles posts={edges} />
			</Container>
			{/*<Container maxWidth={800}>*/}
			{/*	<Tags />*/}
			{/*</Container>*/}
			{/*<Container maxWidth={800} paddingY={'0 !important'}>*/}
			{/*	<Divider />*/}
			{/*</Container>*/}
			<Box bgcolor={'alternate.main'}>
				<Container>
					<FooterNewsletter />
				</Container>
			</Box>
		</Main>
	);
}
