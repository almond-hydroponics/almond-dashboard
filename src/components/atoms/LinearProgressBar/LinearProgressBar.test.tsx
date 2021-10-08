// react libraries
import { render } from '@testing-library/react';

// component
import LinearProgressBar from './index';

describe('GeneralCardInfo component', () => {
	const props = {};

	it('should render correctly', () => {
		const { asFragment } = render(<LinearProgressBar {...props} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
