// components
import { renderWithRedux } from '../../testHelpers';
import EnterDeviceIdView from './index';

// const initialState: {
//   isLoading: false;
// };

describe.skip('The EnterDeviceId Page', () => {
	const { asFragment } = renderWithRedux(<EnterDeviceIdView />, {
		isLoading: false,
	});

	it('should render properly', () => {
		expect(asFragment()).toMatchSnapshot();
	});
});
