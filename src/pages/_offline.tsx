import Head from 'next/head';

export default function Offline() {
	return (
		<>
			<Head>
				<title>almond offline</title>
			</Head>
			<h1>This is an offline fallback page</h1>
			<h2>When offline, any page route will fallback to this page</h2>
		</>
	);
}
