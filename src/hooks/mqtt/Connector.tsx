import { useState, useCallback, useRef } from 'react';
import useEffectAsync from '@hooks/useEffectAsync';
import { connect, MqttClient } from 'mqtt';
import MqttContext from './Context';
import { Error, ConnectorProps } from './types';

const Connector = ({
	children,
	brokerUrl,
	options = { keepalive: 0 },
	parserMethod,
}: ConnectorProps) => {
	const clientRef = useRef(true);
	const [connectionStatus, setStatus] = useState<string | Error>('Offline');
	const [client, setClient] = useState<MqttClient | null>(null);

	const mqttConnect = useCallback(async () => {
		setStatus('Connecting');
		const mqtt = connect(brokerUrl, options);

		mqtt.on('connect', () => {
			if (clientRef.current) {
				setClient(mqtt);
				setStatus('Connected');
			}
		});

		mqtt.on('reconnect', () => {
			if (clientRef.current) {
				setStatus('Reconnecting');
			}
		});

		mqtt.on('error', (err) => {
			if (clientRef.current) {
				setStatus(err.message);
			}
		});

		mqtt.on('offline', () => {
			if (clientRef.current) {
				setStatus('Offline');
			}
		});

		mqtt.on('end', () => {
			if (clientRef.current) {
				setStatus('Offline');
			}
		});
	}, [brokerUrl, options]);

	useEffectAsync(async () => {
		if (!client) {
			await mqttConnect();
		}

		return () => {
			if (client) {
				clientRef.current = false;
				client.end(true);
			}
		};
	}, []);

	return (
		<MqttContext.Provider value={{ connectionStatus, client, parserMethod }}>
			{children}
		</MqttContext.Provider>
	);
};

export default Connector;
