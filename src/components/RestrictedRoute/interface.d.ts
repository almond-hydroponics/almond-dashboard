import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

export interface RestrictedRouteProps extends RouteProps {
	authorize?: string | string[];
	redirectTo: string;
	strict: boolean;
	fallbackView?: FunctionComponent | null;
}
