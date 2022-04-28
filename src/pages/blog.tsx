import BlogNewsroom from 'views/BlogNewsroom';
import { GetStaticProps } from 'next';
import client from '../apolloConfig';
import { GET_ALL_POSTS } from '../queries';

export default function BlogNewsroomPage({ allPosts, preview }): JSX.Element {
	return <BlogNewsroom allPosts={allPosts} preview={preview} />;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const { data } = await client.query({ query: GET_ALL_POSTS });

	return {
		props: { allPosts: data?.posts, preview },
	};
};
