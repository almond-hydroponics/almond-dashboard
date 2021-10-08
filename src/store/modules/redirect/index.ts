import { REDIRECT, State } from '@modules/redirect/types';

import { RedirectAction } from '@modules/redirect/interfaces.d';

export const redirect = (
	redirectLink: string,
	redirectMessage: string,
): RedirectAction => ({
	type: REDIRECT,
	redirectLink,
	redirectMessage,
});

const initialState = {
	redirectLink: '',
	redirectMessage: '',
};

const reducer = (state: State = initialState, action: RedirectAction) => {
	switch (action.type) {
		case REDIRECT:
			return {
				...state,
				redirectLink: action.redirectLink,
				redirectMessage: action.redirectMessage,
			};
		default:
			return state;
	}
};

export default reducer;
