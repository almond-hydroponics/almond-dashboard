import { SnackMessage } from '@modules/snack/interfaces';

export interface SnackMessageProps {
	snack: SnackMessage;
}

export interface SnackMessageState {
	snack?: SnackMessage;
}
