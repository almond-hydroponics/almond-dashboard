import { useState, useEffect, createContext, useMemo, ReactNode } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import { LinearProgress, PaletteMode } from '@mui/material';
import checkUserRole from '@utils/checkUserRole';
import useEffectAsync from '@hooks/useEffectAsync';
import { getUserDetails } from '@modules/user';
import authService from '@utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/rootReducer';
import SnackBar from '@components/atoms/SnackBar';
import { UserContext } from '@context/UserContext';
import getTheme from '../theme';
import { IClientOptions } from 'mqtt';
import { Connector } from '@hooks/mqtt';
import { enableFirebaseMessaging } from '@utils/Firebase/enableMessaging';
import { AxiosRequestConfig } from 'axios';
import http from '@utils/http';
import { receiveMessage } from '@utils/Firebase/firebaseMessaging';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface Props {
	children: ReactNode;
}

const Page = ({ children }: Props): JSX.Element => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	const isAuthenticated = authService.isAuthenticated();
	const dispatch = useDispatch();
	// Selectors from redux
	const { snack } = useSelector((globalState: IRootState) => globalState);

	const { userDetails, isFetchingDetails } = useSelector(
		(globalState: IRootState) => globalState.user,
	);
	const { user } = useSelector(
		(globalState: IRootState) => globalState.authentication,
	);

	useEffectAsync(async () => {
		if (isAuthenticated) {
			await dispatch(getUserDetails());
		}
	}, []);

	useEffectAsync(async () => {
		if (isAuthenticated) {
			const setToken = async () => {
				try {
					const fcmToken = await enableFirebaseMessaging.init();
					if (fcmToken) {
						const options: AxiosRequestConfig = {
							url: '/notifier/add-token',
							method: 'post',
							data: { fcmToken },
						};

						await http.request(options);
						receiveMessage();
					}
				} catch (err) {
					console.error(err); // eslint-disable-line no-console
				}
			};

			await setToken();

			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.addEventListener(
					'message',
					(event) => console.log('event for the service worker', event), // eslint-disable-line no-console
				);
			}
		}
	}, []);

	const {
		_id,
		firstName,
		lastName,
		email,
		photo,
		devices,
		isVerified,
		activeDevice,
		currentRole,
	} = userDetails._id ? userDetails : user;

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			once: true,
			delay: 50,
			duration: 500,
			easing: 'ease-in-out',
		});
	}, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(() => getTheme(mode as PaletteMode), [mode]);

	const userDetailsOnProvider = {
		_id,
		email,
		photo,
		devices,
		isVerified,
		activeDevice,
		name: `${firstName} ${lastName}`,
		isAdmin: !checkUserRole(currentRole?.title ?? 'User', 'User'),
	};

	const options: IClientOptions = {
		username: process.env.NEXT_PUBLIC_MQTT_USER,
		password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
		keepalive: 0,
		clientId: activeDevice?.id ?? 'almond_undefined',
		// protocolId: 'MQTT',
		// protocolVersion: 4,
		// clean: true,
		// reconnectPeriod: 1000,
		// connectTimeout: 30 * 1000,
		// will: {
		// topic: 'almond/lastWill',
		// payload: 'Connection Closed abnormally..!',
		// qos: 2,
		// retain: false,
		// },
		// key: bufferKey,
		// cert: bufferCert,
		// ca: Buffer.from(`${process.env.TRUSTED_CA}`).toString('utf-8'),
		// rejectUnauthorized: false,
	};

	return (
		<StyledEngineProvider injectFirst>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<Connector
						brokerUrl={process.env.NEXT_PUBLIC_MQTT_BROKER_URL}
						options={options}
						// parserMethod={(msg) => msg}
					>
						<UserContext.Provider value={userDetailsOnProvider}>
							<style jsx>{`
								a {
									margin: 0 10px 0 0;
								}
							`}</style>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />
							{isFetchingDetails ? (
								<LinearProgress color="primary" />
							) : (
								<Paper elevation={0}>{children}</Paper>
							)}
							<SnackBar snack={snack} />
						</UserContext.Provider>
					</Connector>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</StyledEngineProvider>
	);
};

// Page.getInitialProps = async () => {
// 	const isAuthenticated = authService.isAuthenticated();
//   console.log('Class: , Function: getInitialProps, Line 142 isAuthenticated():', isAuthenticated);
// 	const dispatch = useDispatch();
//
// 	if (isAuthenticated) {
// 			await dispatch(getUserDetails());
// 	}
// };

export default Page;
