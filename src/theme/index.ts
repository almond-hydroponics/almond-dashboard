import { CSSProperties } from 'react';
import { Theme, responsiveFontSizes, PaletteMode } from '@mui/material';
import { createTheme, ComponentsOverrides } from '@mui/material/styles';
import shadows from './shadows';
import { light, dark } from './palette';

const getTheme = (mode: PaletteMode): Theme =>
	responsiveFontSizes(
		createTheme({
			palette: mode === 'light' ? light : dark,
			shadows: shadows(mode),
			typography: {
				fontFamily: 'Google Sans, Roboto, Helvetica Neue, sans-serif',
				fontSize: 14,
				button: {
					textTransform: 'none',
					fontWeight: 'medium' as CSSProperties['fontWeight'],
				},
			},
			zIndex: {
				appBar: 1200,
				drawer: 1300,
			},
			shape: {
				borderRadius: 6,
			},
			components: {
				MuiButton: {
					styleOverrides: {
						label: {
							fontWeight: 600,
						},
						containedSecondary: mode === 'light' ? { color: 'white' } : {},
					} as ComponentsOverrides['MuiButton'],
				},
			},
		}),
	);

export default getTheme;
