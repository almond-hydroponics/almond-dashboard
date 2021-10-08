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
	size = 24,
	animationProperties = defaultProperties,
	moonColor = 'white',
	sunColor = 'black',
	style,
	...rest
}: DarkModeTogglerProps): JSX.Element => {
	const [id, setId] = useState(0);
	const theme = useTheme();
	const { mode } = theme.palette;

	const colorMode = useContext(ColorModeContext);

	useEffect(() => {
		REACT_TOGGLE_DARK_MODE_GLOBAL_ID += 1;
		setId(REACT_TOGGLE_DARK_MODE_GLOBAL_ID);
	}, [setId]);

	const properties = useMemo(() => {
		if (animationProperties !== defaultProperties) {
			return Object.assign(defaultProperties, animationProperties);
		}

		return animationProperties;
	}, [animationProperties]);

	const { circle, svg, lines, mask } =
		properties[mode === 'dark' ? 'dark' : 'light'];

	const svgContainerProps = useSpring({
		...svg,
		config: animationProperties.springConfig,
	});
	const centerCircleProps = useSpring({
		...circle,
		config: animationProperties.springConfig,
	});
	const maskedCircleProps = useSpring({
		...mask,
		config: animationProperties.springConfig,
	});
	const linesProps = useSpring({
		...lines,
		config: animationProperties.springConfig,
	});

	const toggle = () => {
		colorMode.toggleColorMode();
	};

	const uniqueMaskId = `circle-mask-${id}`;

	return (
		<Button
			variant={'outlined'}
			aria-label="Dark mode toggler"
			color={mode === 'light' ? 'primary' : 'secondary'}
			sx={{
				borderRadius: 1,
				minWidth: 'auto',
				paddingX: 1,
				borderColor: alpha(
					mode === 'dark'
						? theme.palette.secondary.main
						: theme.palette.primary.main,
					0.2,
				),
			}}
		>
			<animated.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				color={mode === 'dark' ? moonColor : sunColor}
				fill="none"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke="currentColor"
				onClick={toggle}
				style={{
					cursor: 'pointer',
					...svgContainerProps,
					...style,
				}}
				{...rest}
			>
				<mask id={uniqueMaskId}>
					<rect x="0" y="0" width="100%" height="100%" fill="white" />
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/* @ts-ignore */}
					<animated.circle style={maskedCircleProps} r="9" fill="black" />
				</mask>

				<animated.circle
					cx="12"
					cy="12"
					fill={mode === 'dark' ? moonColor : sunColor}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					style={centerCircleProps}
					mask={`url(#${uniqueMaskId})`}
				/>
				<animated.g stroke="currentColor" style={linesProps}>
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</animated.g>
			</animated.svg>
		</Button>
	);
};

export default DarkModeToggler;
