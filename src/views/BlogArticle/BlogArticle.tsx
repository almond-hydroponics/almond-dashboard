import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Content, FooterNewsletter, Hero, SimilarStories } from './components';
import dayjs from '@utils/dayjsTime';

const BlogArticle = ({ posts, post, preview }): JSX.Element => {
	const theme = useTheme();

	const avatar = post?.author?.node.avatar.url;
	const fullName =
		`${post?.author?.node.firstName} ${post?.author?.node.lastName}` ??
		post?.author?.node.name;
	const formattedDate = dayjs(post?.date).fromNow();
	const image = post?.featuredImage.node.sourceUrl;

	return (
		<Main>
			<Box>
				<Hero
					avatar={avatar}
					fullName={fullName}
					date={formattedDate}
					title={post?.title}
					featuredImage={image}
				/>
				<Container maxWidth={{ sm: 720, md: 960 }}>
					<Content
						content={post?.content}
						avatar={avatar}
						fullName={fullName}
						date={formattedDate}
					/>
				</Container>
				<Box
					component={'svg'}
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 1920 100.1"
					sx={{
						marginBottom: -1,
						width: 1,
					}}
				>
					<path
						fill={theme.palette.alternate.main}
						d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
					/>
				</Box>
			</Box>
			<Box bgcolor={'alternate.main'}>
				<Container>
					<SimilarStories />
				</Container>
				<Container>
					<FooterNewsletter />
				</Container>
				<Box
					component={'svg'}
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 1920 100.1"
					sx={{
						marginBottom: -1,
						width: 1,
					}}
				>
					<path
						fill={theme.palette.background.paper}
						d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
					/>
				</Box>
			</Box>
		</Main>
	);
};

export default BlogArticle;
