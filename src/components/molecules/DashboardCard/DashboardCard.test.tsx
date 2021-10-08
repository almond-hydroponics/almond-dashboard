// react libraries
import { render, screen } from '@testing-library/react';

// component
import DashboardCard from './index';

describe('DashboardCard component', () => {
	const props = {
		heading: 'Header',
		body: 'Body',
		redirect: () => jest.fn(),
		classes: '',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<DashboardCard {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elemHeader = screen.getByTestId('header');
		expect(elemHeader.innerHTML).toBe('Header');

		const elemDetails = screen.getByTestId('body');
		expect(elemDetails.innerHTML).toBe('Body');
	});
});
