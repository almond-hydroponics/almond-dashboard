import { useState } from 'react';
import {
	useMediaQuery,
	Grid,
	Typography,
	TextField,
	Button,
	Divider,
	InputAdornment,
	IconButton,
	Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { editUserDetails, logoutUser } from '@modules/user';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useFormState from '@hooks/useFormState';
import validate from 'validate.js';
import { IRootState } from '../../../../store/rootReducer';
import { useTheme } from '@mui/material/styles';

const schema = {
	password: {
		presence: { allowEmpty: false, message: 'is required' },
	},
	confirmPassword: {
		presence: { allowEmpty: false, message: 'is required' },
	},
};

const Security = (): JSX.Element => {
	const dispatch = useDispatch();

	const [isOldPasswordHidden, showOldPassword] = useState<boolean>(false);
	const toggleOldPassword = () => showOldPassword((prevState) => !prevState);

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const [isConfirmPasswordHidden, showConfirmPassword] =
		useState<boolean>(false);
	const toggleConfirmPassword = () =>
		showConfirmPassword((prevState) => !prevState);

	const { _id } = useSelector(
		(globalState: IRootState) => globalState.user.userDetails,
		shallowEqual,
	);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	//@ts-expect-error
	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: (userDetails) => dispatch(editUserDetails(_id, userDetails)),
			formErrors: (formValues) => validate(formValues, schema),
		});

	const logoutActiveUser = async (): Promise<void> => {
		await window.location.replace('/');
		dispatch(logoutUser());
	};

	return (
		<Box>
			<Box
				display={'flex'}
				flexDirection={{ xs: 'column', md: 'row' }}
				justifyContent={'space-between'}
				alignItems={{ xs: 'flex-start', md: 'center' }}
			>
				<Typography variant="h6" color="textPrimary">
					Change Password
				</Typography>
				<Button variant="outlined" color="primary" onClick={logoutActiveUser}>
					Log out
				</Button>
			</Box>
			<Box paddingY={4}>
				<Divider />
			</Box>

			<form method="post" onSubmit={handleSubmit}>
				<Grid item xs={12} md={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Old Password"
								variant="outlined"
								size="medium"
								name="oldPassword"
								fullWidth
								type={isOldPasswordHidden ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment
											style={{ cursor: 'pointer' }}
											onClick={toggleOldPassword}
											position="end"
										>
											<IconButton aria-label="old-password" edge="end">
												{isOldPasswordHidden ? (
													<Visibility color="primary" />
												) : (
													<VisibilityOff color="primary" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="New Password"
								variant="outlined"
								size="medium"
								name="newPassword"
								fullWidth
								type={isPasswordHidden ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment
											style={{ cursor: 'pointer' }}
											onClick={togglePassword}
											position="end"
										>
											<IconButton aria-label="new-password" edge="end">
												{isPasswordHidden ? (
													<Visibility color="primary" />
												) : (
													<VisibilityOff color="primary" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Repeat Password"
								variant="outlined"
								size="medium"
								name="repeatPassword"
								fullWidth
								type={isConfirmPasswordHidden ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment
											style={{ cursor: 'pointer' }}
											onClick={toggleConfirmPassword}
											position="end"
										>
											<IconButton aria-label="old-password" edge="end">
												{isConfirmPasswordHidden ? (
													<Visibility color="primary" />
												) : (
													<VisibilityOff color="primary" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								variant="contained"
								type="submit"
								color="primary"
								size="large"
							>
								Save
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					container
					justifyContent={isMd ? 'flex-start' : 'center'}
					xs={12}
					md={6}
				>
					<Box height={1} width={1} maxWidth={500}>
						<Box
							component={'img'}
							src="https://storage.googleapis.com/static.almondhydroponics.com/static/images/password-secure.svg"
							srcSet="https://storage.googleapis.com/static.almondhydroponics.com/static/images/password-secure.svg 2x"
							width={1}
							height={1}
							sx={{
								filter:
									theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
							}}
						/>
					</Box>
				</Grid>
				<Box paddingY={4}>
					<Divider />
				</Box>
			</form>
		</Box>
	);
};

export default Security;
