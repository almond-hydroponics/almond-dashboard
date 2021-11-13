// react libraries
import { render } from '@testing-library/react';

// component
import Modal from './index';

describe('AnalyticsCard component', () => {
	const props = {
		isModalOpen: false,
		renderHeader: () => 'Header',
		renderContent: () => 'Context',
		onClose: () => {},
	};

	it('should render correctly', () => {
		const { asFragment } = render(<Modal {...props} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
