// react libraries
import { render } from '@testing-library/react';

// component
import DonutDisplay from './index';

describe('DonutDisplay component', () => {
	const props = {
		data: [50, 60],
		donutInfo: '',
		hoverBackgroundColor: '#1967D2',
		backgroundColor: '#1967D2',
		halfDonut: true,
	};

	it('should render correctly', () => {
		const { asFragment } = render(<DonutDisplay {...props} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
