// react libraries
import { createStore } from 'redux';

// components
import { SnackBar } from './index';

// helpers
import { renderWithRedux } from '../../../testHelpers';

describe('The SnackBar components', () => {
	const SAMPLE_SNACK_MESSAGE = 'Time schedule created successfully.';
	const props = {
		snack: {
			message: SAMPLE_SNACK_MESSAGE,
		},
	};

	const initialState = {
		snack: {
			message: SAMPLE_SNACK_MESSAGE,
		},
	};

	const store = createStore(() => ({
		snack: {
			message: SAMPLE_SNACK_MESSAGE,
		},
	}));

	it('displays a snack message if it receives new snack props', () => {
		const { asFragment } = renderWithRedux(
			<SnackBar {...props} />,
			initialState,
			store,
		);
		const { snack } = store.getState();

		expect(asFragment()).toMatchSnapshot();
		expect(snack.message).toBe(SAMPLE_SNACK_MESSAGE);
	});
});
