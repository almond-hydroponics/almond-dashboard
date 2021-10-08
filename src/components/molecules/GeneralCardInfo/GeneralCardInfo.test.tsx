// react libraries
import { render, screen } from '@testing-library/react';

// component
import GeneralCardInfo from './index';

describe('GeneralCardInfo component', () => {
	const props = {
		mainHeader: 'mainHeader',
		subHeader: 'subHeader',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<GeneralCardInfo {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elemHeader = screen.getByTestId('header');
		expect(elemHeader.innerHTML).toBe('mainHeader');

		const elemDetails = screen.getByTestId('sub-header');
		expect(elemDetails.innerHTML).toBe('subHeader');
	});
});
