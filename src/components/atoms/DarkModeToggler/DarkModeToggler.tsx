import { useState, useEffect, useMemo, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { DarkModeTogglerProps } from './interfaces';
import { ColorModeContext } from '../../Page';
import { useTheme } from '@mui/system';
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';

export const defaultProperties = {
	dark: {
		circle: {
			r: 9,
		},
		mask: {
			cx: '50%',
			cy: '23%',
		},
		svg: {
			transform: 'rotate(40deg)',
		},
		lines: {
			opacity: 0,
		},
	},
	light: {
		circle: {
			r: 5,
		},
		mask: {
			cx: '100%',
			cy: '0%',
		},
		svg: {
			transform: 'rotate(90deg)',
		},
		lines: {
			opacity: 1,
		},
	},
	springConfig: { mass: 4, tension: 250, friction: 35 },
};

let REACT_TOGGLE_DARK_MODE_GLOBAL_ID = 0;

/**
 * Component to display the dark mode toggler
 *
 * @param {Object} props
 */
const DarkModeToggler = ({
	size = 20,
	moonColor = 'white',
	sunColor = 'black',
	style,
	...rest
}: DarkModeTogglerProps): JSX.Element => {
	const [id, setId] = useState(0);
	const theme = useTheme();
	const { mode } = theme.palette;

	const colorMode = useContext(ColorModeContext);

	const toggle = () => {
		colorMode.toggleColorMode();
	};

	return (
		<Button
			variant={'outlined'}
			onClick={toggle}
			aria-label="Dark mode toggler"
			color={mode === 'light' ? 'primary' : 'secondary'}
			sx={{
				borderRadius: 1,
				minWidth: 'auto',
				padding: 1,
				borderColor: alpha(theme.palette.divider, 0.2),
			}}
		>
			{mode === 'light' ? (
				<svg
					width={size}
					height={size}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			) : (
				<svg
					width={size}
					height={size}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			)}
		</Button>
	);
};

export default DarkModeToggler;
