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
import { ComponentProvider } from '@context/ComponentContext';
import { initializeGA, logPageView } from '@utils/googleAnalytics';
import { IClientOptions } from 'mqtt';
import { Connector } from '@hooks/mqtt';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface Props {
	children: ReactNode;
}

export default function Page({ children }: Props): JSX.Element {
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

	useEffect(() => {
		initializeGA();
		logPageView();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isAuthenticated) {
		useEffectAsync(async () => {
			await dispatch(getUserDetails());
		}, []);
	}

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
		username: process.env.MQTT_USER,
		password: process.env.MQTT_PASSWORD,
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
						brokerUrl={process.env.MQTT_BROKER_URL}
						options={options}
						// parserMethod={(msg) => msg}
					>
						<UserContext.Provider value={userDetailsOnProvider}>
							<ComponentProvider>
								{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
								<CssBaseline />
								{isFetchingDetails ? (
									<LinearProgress color="primary" />
								) : (
									<Paper elevation={0}>{children}</Paper>
								)}
								<SnackBar snack={snack} />
							</ComponentProvider>
						</UserContext.Provider>
					</Connector>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</StyledEngineProvider>
	);
}
