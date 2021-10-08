// react libraries
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
// component
import ActivityLogCard from './ActivityLogCard';

describe('ActivityLogCard component', () => {
	const props = {
		log: 'Pump broken',
		date: '2019-10-30T08:00:42.767Z',
		type: 'info',
	};

	it('should render correctly', () => {
		const { asFragment } = render(<ActivityLogCard {...props} />);
		expect(asFragment()).toMatchSnapshot();

		const elemHeader = screen.getByTestId('header');
		expect(elemHeader.innerHTML).toBe('Pump broken');

		const elemDetails = screen.getByTestId('details');
		expect(elemDetails.innerHTML).toBe(dayjs(props.date).format('HH:mm:ss'));
	});
});
