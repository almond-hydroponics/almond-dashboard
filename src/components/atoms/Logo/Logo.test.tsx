// react library
import { screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
// components
import Logo from './index';
import { ThemeProvider } from '@material-ui/styles';
import getTheme from '../../../theme';

describe.skip('Logo component', () => {
	it('should render correctly', () => {
		const tree = renderer
			.create(
				<ThemeProvider theme={getTheme('light')}>
					<Logo />
				</ThemeProvider>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();

		const elem = screen.getByTestId('logo');
		expect(elem).toHaveClass('makeStyles-logoContainer-1');
	});
});
