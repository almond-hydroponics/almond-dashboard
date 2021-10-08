// react libraries
import { Redirect, useLocation } from 'react-router-dom';
// third party libraries
import { displaySnackMessage } from '@modules/snack';
// components
import RestrictedRoute from '@components/RestrictedRoute';
// helper functions
import authService from '@utils/auth';

const AuthenticatedRoute = (props: any) => {
	const { component: Component, ...rest } = props;
	const location = useLocation();

	if (!authService.isAuthenticated()) {
		localStorage.setItem('locationReferrer', location.pathname);
		displaySnackMessage('You need to login to continue', 'error');

		return <Redirect to="/" />;
	}

	return (
		<div data-testid="authenticated-route" className="drawer-content">
			<RestrictedRoute {...rest} render={() => <Component />} />
		</div>
	);
};

export default AuthenticatedRoute;
