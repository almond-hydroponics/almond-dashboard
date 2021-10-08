import { REDIRECT } from '@modules/redirect/types';

export interface RedirectAction {
	type: REDIRECT;
	redirectLink: string;
	redirectMessage: string;
}
