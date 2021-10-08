import { displaySnackMessage } from '@modules/snack';
import { Dispatch } from 'redux';

const errorOnSnack = (
	error: { response: any },
	dispatch: Dispatch,
	customMessage?: string,
) => {
	let message;
	let errorMessage =
		'Failed to process request due to a network issue. Check your connectivity then reload page.';
	if (customMessage) {
		errorMessage = `An error occurred while ${customMessage}. Please try again`;
	}

	if (error?.response?.data.errors) {
		message = error?.response?.data.errors.message;
	} else {
		message = error?.response?.data.message;
	}

	return dispatch(
		displaySnackMessage(error?.response ? message : errorMessage, 'error'),
	);
};

export default errorOnSnack;
