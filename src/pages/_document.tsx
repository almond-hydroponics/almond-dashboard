/* eslint-disable react/display-name */
import crypto from 'crypto';
import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

const APP_NAME = 'almond';
const APP_DESCRIPTION = 'Almond Hydroponics - Growing your plants smart.';

const getCache = () => {
	const cache = createCache({ key: 'css', prepend: true });
	cache.compat = true;

	return cache;
};

const cspHashOf = (text: crypto.BinaryLike): string => {
	const hash = crypto.createHash('sha256');
	hash.update(text);
	return `'sha256-${hash.digest('base64')}'`;
};

export default class MyDocument extends Document {
	render(): JSX.Element {
		let csp = `style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com 'self' data:; default-src 'self'; script-src 'unsafe-eval' 'self' ${cspHashOf(
			NextScript.getInlineScriptSource(this.props),
		)}`;

		if (process.env.NODE_ENV === 'production') {
			csp = `style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com 'self' data:; default-src 'self'; script-src 'unsafe-eval' 'self' ${cspHashOf(
				NextScript.getInlineScriptSource(this.props),
			)}`;
		}

		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="application-name" content={APP_NAME} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content={APP_NAME} />
					{/*<meta httpEquiv="Content-Security-Policy" content={csp} />*/}
					<meta name="theme-color" content="#ffffff" />
					<meta name="description" content={APP_DESCRIPTION} />
					<meta
						name="robots"
						content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
					/>
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta
						name="msapplication-TileImage"
						content="/ms-icon-144x144.png"
					/>

					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="website" />
					<meta
						property="og:image"
						content="/icons/android-icon-192x192.png"
					/>
					<meta property="og:title" content="dt-edge" />
					<meta property="og:description" content="Plutus." />
					<meta property="og:url" content="https://plutus.com/" />

					<link rel="manifest" href="/manifest.json" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="57x57"
						href="/apple-icon-57x57.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="60x60"
						href="/apple-icon-60x60.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="72x72"
						href="/apple-icon-72x72.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="76x76"
						href="/apple-icon-76x76.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="114x114"
						href="/apple-icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="/apple-icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="144x144"
						href="/apple-icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/apple-icon-152x152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-icon-180x180.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="/android-icon-192x192.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="96x96"
						href="/favicon-96x96.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>

					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@100;200;300;400;500;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const originalRenderPage = ctx.renderPage;

	const cache = getCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			// Take precedence over the CacheProvider in our custom _app.js
			enhanceComponent: (Component) => (props) =>
				(
					<CacheProvider value={cache}>
						<Component {...props} />
					</CacheProvider>
				),
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
	};
};
