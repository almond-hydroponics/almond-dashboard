import { DisplaySnackMessageAction, Severity } from './interfaces';
import { DISPLAY_SNACK_MESSAGE } from './types';

/**
 * Display snack message action creator.
 * @returns {DisplaySnackMessageAction}
 * @param message
 * @param severity
 */
export const displaySnackMessage = (
	message: string,
	severity?: Severity,
): DisplaySnackMessageAction => ({
	snack: {
		message,
		severity,
	},
	type: DISPLAY_SNACK_MESSAGE,
});

/**
 * The snack reducer
 * @param {Object} state
 * @param {DisplaySnackMessageAction} action
 */
export const reducer = (state = {}, action: DisplaySnackMessageAction) => {
	if (action.type === DISPLAY_SNACK_MESSAGE) {
		return action.snack;
	}
	return state;
};

export default reducer;
