// types
import { INTERNAL_SERVER_ERROR_MESSAGE } from './types';

export interface InternalServerErrorMessageAction {
	type: INTERNAL_SERVER_ERROR_MESSAGE;
	error: boolean;
}
