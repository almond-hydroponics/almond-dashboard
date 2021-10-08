import { renderHook, act } from '@testing-library/react-hooks';

import { URL, options } from './connection';
import { Connector, useMqttState } from '../index';

let wrapper;

describe.skip('Connector wrapper', () => {
	beforeAll(() => {
		wrapper = ({ children }) => (
			<Connector brokerUrl={URL} options={options}>
				{children}
			</Connector>
		);
	});

	it('should not connect with mqtt with a wrong url', async () => {
		const { result, waitForValueToChange } = renderHook(() => useMqttState(), {
			wrapper: ({ children }) => (
				<Connector
					brokerUrl="mqtt://test.mosqu.org:1884"
					options={{ connectTimeout: 10_000 }}
				>
					{children}
				</Connector>
			),
		});

		await waitForValueToChange(() => result.current.connectionStatus);
		expect(result.current.connectionStatus).toBe(
			'getaddrinfo ENOTFOUND test.mosqu.org',
		);

		await waitForValueToChange(() => result.current.connectionStatus);
		expect(result.current.connectionStatus).toBe('Offline');
	});

	it('should connect with mqtt', async () => {
		const { result, waitFor } = renderHook(() => useMqttState(), {
			wrapper,
		});

		await waitFor(() => result.current.client?.connected === true);
		expect(result.current.connectionStatus).toBe('Connected');

		await act(async () => {
			await result.current.client?.end();
		});
	}, 50_000);

	it('should connect passing props', async () => {
		const { result, waitFor } = renderHook(() => useMqttState(), {
			wrapper: ({ children }) => (
				<Connector brokerUrl={URL} options={{ keepalive: 0 }}>
					{children}
				</Connector>
			),
		});

		await waitFor(() => result.current.client?.connected === true);
		expect(result.current.connectionStatus).toBe('Connected');

		await act(async () => {
			await result.current.client?.end();
		});
	}, 50_000);
});
