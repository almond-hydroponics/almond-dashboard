// react libraries
import { Suspense } from 'react';

// third party
import { render, screen } from '@testing-library/react';

// components
import { DeviceManagementView } from './index';

describe.skip('The DeviceManagement Page', () => {
	const { asFragment } = render(
		<Suspense fallback={<h1>test loading</h1>}>
			<DeviceManagementView />
		</Suspense>,
	);

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();

		const elem = screen.getByTestId('device-management-page');
		expect(elem).toHaveClass('device-management-page');
	});
});
