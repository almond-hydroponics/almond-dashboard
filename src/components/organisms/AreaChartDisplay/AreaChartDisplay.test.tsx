// react libraries
import { render } from '@testing-library/react';

// component
import AreaChardDisplay from './index';

describe('AreaChartDisplay component', () => {
	const props = {
		chartData: [15, 16, 20, 27, 21, 24, 21, 19, 16],
		chartColor: '#1967D2',
		backgroundColor: '#1967D2',
		labels: [
			'00:00',
			'03:00',
			'06:00',
			'09:00',
			'12:00',
			'15:00',
			'18:00',
			'21:00',
			'00:00',
		],
	};

	const { asFragment } = render(<AreaChardDisplay {...props} />);

	it('should render correctly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
