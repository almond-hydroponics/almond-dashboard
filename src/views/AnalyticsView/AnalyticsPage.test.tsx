// react libraries
import { Suspense } from 'react';
// third party
import { screen } from '@testing-library/react';
// components
import { renderWithRouter } from '../../testHelpers';
import RegularUserAnalytics from './RegularUserAnalytics';
import AdminAnalytics from './AdminAnalytics';

describe.skip('The Analytics Page', () => {
	it('should render Regular Analytics Page properly', () => {
		const { asFragment } = renderWithRouter(
			<Suspense fallback={<h1>test loading</h1>}>
				<RegularUserAnalytics />
			</Suspense>,
		);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('regular-analytics-page');
		expect(elem).toHaveClass('analytics-page');
	});

	it('should render Admin Analytics Page properly', () => {
		const { asFragment } = renderWithRouter(
			<Suspense fallback={<h1>test loading</h1>}>
				<AdminAnalytics />
			</Suspense>,
		);
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('admin-analytics-page');
		expect(elem).toHaveClass('analytics-page');
	});
});
