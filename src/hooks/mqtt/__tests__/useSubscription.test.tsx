import { renderHook } from '@testing-library/react-hooks';

import { Connector, useSubscription } from '../index';
import { URL, options } from './connection';

const TOPIC = 'almond/test';

let wrapper: ({ children }: { children: any }) => JSX.Element;

describe.skip('useSubscription', () => {
	beforeAll(() => {
		/* eslint-disable react/display-name */
		wrapper = ({ children }) => (
			<Connector brokerUrl={URL} options={options}>
				{children}
			</Connector>
		);
	});

	it('should get message on topic test', async () => {
		const { result, waitForValueToChange } = renderHook(
			() => useSubscription(TOPIC),
			{
				wrapper,
			},
		);

		await waitForValueToChange(
			() => result.current.client?.connected === true,
		);

		const message = 'testing message';
		result.current.client?.publish(TOPIC, message);

		await waitForValueToChange(() => result.current.message);
		expect(result.current?.message?.message).toBe(message);
	});

	it('should get message on topic with single selection of the path + ', async () => {
		const { result, waitFor, waitForValueToChange } = renderHook(
			() => useSubscription(`${TOPIC}/+/test/+/selection`),
			{
				wrapper,
			},
		);

		await waitFor(() => result.current.client?.connected === true);

		const message = 'testing single selection message';

		result.current.client?.publish(
			`${TOPIC}/match/test/single/selection`,
			message,
		);

		await waitForValueToChange(() => result.current.message);
		expect(result.current.message?.message).toBe(message);
	}, 50_000);

	it('should get message on topic with # wildcard', async () => {
		const { result, waitFor, waitForValueToChange } = renderHook(
			() => useSubscription(`${TOPIC}/#`),
			{
				wrapper,
			},
		);

		await waitFor(() => result.current.client?.connected === true);

		const message = 'testing with # wildcard';

		result.current.client?.publish(`${TOPIC}/match/test/wildcard`, message);

		await waitForValueToChange(() => result.current.message);
		expect(result.current.message?.message).toBe(message);
	}, 50_000);
});
