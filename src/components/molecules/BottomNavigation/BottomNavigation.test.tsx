// react libraries
import { render, screen } from '@testing-library/react';

// components
import PageBottomNavigation from './index';

describe.skip('BottomNavigation component', () => {
	const { asFragment } = render(<PageBottomNavigation />);

	it('should render correctly', () => {
		expect(asFragment()).toMatchSnapshot();

		// const elem = screen.getByTestId('bottom-navigation');
		// expect(elem.classList[0]).toBe('page-content__navigation');
	});
});
