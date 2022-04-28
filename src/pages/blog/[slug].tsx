import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import BlogArticle from 'views/BlogArticle';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
	getAllPostsWithSlug,
	getPostAndMorePosts,
} from '@utils/Wordpress/api';

export default function BlogArticlePage({
	post,
	preview,
	posts,
}): JSX.Element {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return <BlogArticle post={post} preview={preview} posts={posts} />;
}

export const getStaticProps: GetStaticProps = async ({
	params,
	preview = false,
	previewData,
}) => {
	const data = await getPostAndMorePosts(params?.slug, preview, previewData);
	return {
		props: {
			preview,
			post: data.post,
			posts: data.posts,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = await getAllPostsWithSlug();
	return {
		paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
		fallback: true,
	};
};
