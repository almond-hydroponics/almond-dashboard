import { MqttClient, IClientOptions } from 'mqtt';
import { ReactNode } from 'react';

export interface Error {
	name: string;
	message: string;
	stack?: string;
}

export interface ConnectorProps {
	brokerUrl?: string | object;
	options?: IClientOptions;
	parserMethod?: (message) => string;
	children: ReactNode;
}

export interface IMqttContext {
	connectionStatus: string | Error;
	client?: MqttClient | null;
	parserMethod?: (message: any) => string;
}

export interface IUseSubscription {
	topic: string | string[];
	client?: MqttClient | null;
	message?: IMessage;
	connectionStatus: string | Error;
}

export interface IMessageStructure {
	[key: string]: string;
}

export interface IMessage {
	topic: string;
	message?: string | IMessageStructure;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
