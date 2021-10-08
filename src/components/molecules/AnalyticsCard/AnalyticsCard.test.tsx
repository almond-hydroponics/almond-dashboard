// react libraries
import { render, screen } from '@testing-library/react';

// component
import AnalyticsCard from './index';

describe('AnalyticsCard component', () => {
	const props = {
		mainInfo: 'mainInfo',
		subInfo: 'subInfo',
	};

	const { asFragment } = render(<AnalyticsCard {...props} />);

	it('should render correctly', () => {
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('analytics-card');
		expect(elem).toHaveClass(
			'MuiPaper-root MuiCard-root makeStyles-root-1 makeStyles-cardPaper-5 MuiPaper-outlined MuiPaper-rounded',
		);

		const elemHeader = screen.getByTestId('main-info');
		expect(elemHeader.innerHTML).toBe('mainInfo');

		const elemDetails = screen.getByTestId('sub-info');
		expect(elemDetails.innerHTML).toBe('subInfo');
	});
});
