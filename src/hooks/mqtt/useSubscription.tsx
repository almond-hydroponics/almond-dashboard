import { useContext, useCallback, useState } from 'react';
import mqttPatterns from 'mqtt-pattern';
import useEffectAsync from '@hooks/useEffectAsync';
import { IClientSubscribeOptions } from 'mqtt';
import MqttContext from './Context';
import { IMqttContext as Context, IUseSubscription, IMessage } from './types';

const useSubscription = (
	topic: string | string[],
	options: IClientSubscribeOptions = {} as IClientSubscribeOptions,
): IUseSubscription => {
	const { client, connectionStatus, parserMethod } =
		useContext<Context>(MqttContext);

	const [message, setMessage] = useState<IMessage | undefined>(undefined);

	const subscribe = useCallback(async () => {
		client?.subscribe(topic, options);
	}, [client, options, topic]);

	const callback = useCallback(
		(receivedTopic: string, receivedMessage: any) => {
			if (
				[topic]
					.flat()
					.some((rTopic) => mqttPatterns.exec(rTopic, receivedTopic))
			) {
				setMessage({
					topic: receivedTopic,
					message:
						parserMethod?.(receivedMessage) || receivedMessage.toString(),
				});
			}
		},
		[parserMethod, topic],
	);

	useEffectAsync(async () => {
		if (client?.connected) {
			await subscribe();

			client.on('message', callback);
		}
		return () => {
			client?.off('message', callback);
		};
	}, [callback, client, subscribe]);

	return {
		client,
		topic,
		message,
		connectionStatus,
	};
};

export default useSubscription;
