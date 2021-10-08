import { ReactNode } from 'react';
import { IClientOptions } from 'mqtt';

export interface ConnectorProps {
	// eslint-disable-next-line @typescript-eslint/ban-types
	brokerUrl?: string | Record<string, unknown>;
	children: ReactNode;
	options?: IClientOptions;
	parserMethod?: (message) => string;
}
