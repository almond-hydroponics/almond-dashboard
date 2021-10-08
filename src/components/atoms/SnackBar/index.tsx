// react libraries
import { useEffect, useContext } from 'react';
// third-party libraries
import { useTheme } from '@mui/material/styles';
import { Snackbar, useMediaQuery } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// interfaces
import { SnackMessageProps } from './interfaces';
import { ComponentContext } from '@context/ComponentContext';

export const SnackBar = ({ snack }: SnackMessageProps): JSX.Element => {
	const componentContext = useContext(ComponentContext);
	const {
		isSnackOpen,
		handleCloseSnack,
		snackMessage,
		setSnackMessage,
		setOpenSnack,
	} = componentContext;

	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
		defaultMatches: true,
	});
	const { message, severity } = snack;

	useEffect(() => {
		setSnackMessage(message);
		setOpenSnack(!!message);
	}, [snack]);

	const Alert = (alertProps: AlertProps) => (
		<MuiAlert elevation={6} variant="filled" {...alertProps} />
	);

	return (
		<Snackbar
			anchorOrigin={
				isSm
					? { vertical: 'top', horizontal: 'center' }
					: { vertical: 'bottom', horizontal: 'center' }
			}
			open={isSnackOpen}
			autoHideDuration={6000}
			onClose={handleCloseSnack}
		>
			<div data-testid="snack-message">
				<Alert onClose={handleCloseSnack} severity={severity ?? 'success'}>
					{snackMessage}
				</Alert>
			</div>
		</Snackbar>
	);
};

export default SnackBar;
