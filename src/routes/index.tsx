// third party packages
import { Redirect, Route, Switch } from 'react-router-dom';
// pages and components
import { UnauthorizedUserModal } from '@components/molecules';
import {
	DashboardContainer,
	IndexView,
	AccountSettingsView,
	NotFound,
	EnterDeviceIdView,
} from '@views/index';
import AuthenticatedRoute from '../components/AuthenticatedRoute';

const Routes = (): any => (
	<Switch>
		<Route exact path="/" render={() => <IndexView />} />
		<Route exact path="/my-device" render={() => <EnterDeviceIdView />} />
		<AuthenticatedRoute
			exact
			path="/dashboard"
			authorize="analytics:view"
			component={DashboardContainer}
			fallbackView={<UnauthorizedUserModal isModalOpen />}
		/>
		<AuthenticatedRoute
			exact
			path="/account"
			authorize="analytics:view"
			component={AccountSettingsView}
			fallbackView={<UnauthorizedUserModal isModalOpen />}
		/>
		<Route exact path="/404" render={() => <NotFound />} />
		<Redirect to="/404" />
	</Switch>
);

export default Routes;
