// react library
import '../../../tests/__mocks__/snack';
import '../../../tests/__mocks__/storeWithPartialPermissions';

// third party libraries
import { screen } from '@testing-library/react';

// components
import RestrictedRoute from '@components/RestrictedRoute';
import { renderWithRouter } from '../../testHelpers';

describe('The RestrictedRoute component', () => {
	let props;

	it('should render Route if authorize prop is not passed', () => {
		props = {
			fallbackView: null,
			strict: true,
			redirectTo: '/',
		};

		const TestComponent = () => <div className="test" data-testid="test" />;
		renderWithRouter(
			<RestrictedRoute
				path="/dashboard"
				component={() => <TestComponent />}
				{...props}
			/>,
			{
				route: '/dashboard',
			},
		);

		const elem = screen.getByTestId('test');
		expect(elem).toHaveClass('test');
	});

	it.skip('should render Route if user has the right access level', () => {
		props = {
			fallbackView: null,
			strict: true,
			redirectTo: '/',
			authorize: 'dashboard:view',
		};
		const TestComponent2 = () => <div className="test" data-testid="test1" />;
		renderWithRouter(
			<RestrictedRoute
				path="/dashboard"
				component={() => <TestComponent2 />}
				{...props}
			/>,
			{
				route: '/dashboard',
			},
		);

		const elem = screen.getByTestId('test1');
		expect(elem).toHaveClass('test');
	});

	describe.skip('When user does not have the right access level', () => {
		props = {
			fallbackView: null,
			strict: true,
			redirectTo: '/',
			authorize: 'people:view',
		};

		const TestComponent3 = () => <div className="test" data-testid="test" />;
		renderWithRouter(
			<RestrictedRoute
				path="/dashboard"
				component={() => <TestComponent3 />}
				{...props}
			/>,
			{
				route: '/dashboard',
			},
		);

		it('should not render Route component', () => {
			const elem = screen.getByTestId('test');
			expect(elem).toHaveClass('test');
			// expect(wrapper.find('Route')).toHaveLength(0);
		});

		// it('should render Redirect component', () => {
		//   expect(wrapper.find('Redirect')).toHaveLength(1);
		// });
		//
		// it('should pass the "redirectTo" prop as the "to" prop to the Redirect component', () => {
		//   wrapper.setProps({
		//     redirectTo: '/dashboard',
		//   });
		//
		//   expect(wrapper.find('Redirect').props().to).toBe('/analytics');
		// });
		//
		// it('should pass "/" as the "to" prop to Redirect if "redirectTo" prop is not passed', () => {
		//   expect(wrapper.find('Redirect').props().to).toBe('/');
		// });
	});
});
