// react libraries
import { render, screen } from '@testing-library/react';

// component
import TabPanel from './index';

describe('TabPanel component', () => {
	const props = {
		index: 1,
		value: 1,
		children: <div />,
	};

	const { asFragment } = render(<TabPanel {...props} />);

	it('should render correctly', () => {
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('tab-panel');
		expect(elem).toHaveClass('MuiBox-root MuiBox-root-2 makeStyles-box-1');
	});
});
