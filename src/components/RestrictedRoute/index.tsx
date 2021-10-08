// third party libraries
import { Redirect, Route } from 'react-router-dom';
// interfaces
import { RestrictedRouteProps } from '@components/RestrictedRoute/interface';
// helpers
import authorized from '@utils/authorize';

const RestrictedRoute = (props: RestrictedRouteProps): any => {
	const { fallbackView, redirectTo, strict, authorize } = { ...props };
	if (!authorize || authorized(authorize, { strict })) {
		return <Route {...props} />;
	}

	if (fallbackView) {
		return fallbackView;
	}

	return <Redirect to={redirectTo} />;
};

RestrictedRoute.defaultProps = {
	redirectTo: '/',
	strict: false,
};

export default RestrictedRoute;
