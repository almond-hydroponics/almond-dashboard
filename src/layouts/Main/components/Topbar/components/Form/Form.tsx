/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Box, Grid, TextField, Button, InputAdornment } from '@mui/material';
import { GoogleIcon, DividerWithText } from '@components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import useFormState from '@hooks/useFormState';
import { loginAccount } from '@modules/authentication';
import validate from 'validate.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IRootState } from '../../../../../../store/rootReducer';

interface Props {
	handleAuthModal: () => void;
}

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 300,
		},
	},
};

const isObjectEmpty = (obj): boolean =>
	obj &&
	Object.keys(obj).length === 0 &&
	Object.getPrototypeOf(obj) === Object.prototype;

const Form = ({ handleAuthModal }: Props): JSX.Element => {
	const dispatch = useDispatch();
	const auth = useSelector(
		(globalState: IRootState) => globalState.authentication,
	);

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: async ({ email, password }) => {
				await dispatch(loginAccount({ email, password }));
				if (isObjectEmpty(errors)) {
					handleAuthModal();
				}
			},
			formErrors: (formValues) => validate(formValues, schema),
		});

	const handleLogin = () =>
		window.location.replace(
			`${process.env.NEXT_PUBLIC_ALMOND_API}/auth/google`,
		);

	return (
		<Box>
			<form name="email-login" onSubmit={handleSubmit}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<TextField
							placeholder="Email"
							label="Email *"
							variant="outlined"
							size="medium"
							name="email"
							fullWidth
							helperText={hasError('email') ? errors.email[0] : null}
							error={hasError('email')}
							onChange={handleFormChange}
							type="email"
							value={values.email || ''}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							placeholder="Password"
							label="Password *"
							variant="outlined"
							size="medium"
							name="password"
							fullWidth
							helperText={hasError('password') ? errors.password[0] : null}
							error={hasError('password')}
							onChange={handleFormChange}
							type={isPasswordHidden ? 'text' : 'password'}
							value={values.password || ''}
							InputProps={{
								endAdornment: (
									<InputAdornment
										style={{ cursor: 'pointer' }}
										onClick={togglePassword}
										position="end"
									>
										{isPasswordHidden ? <Visibility /> : <VisibilityOff />}
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item container xs={12}>
						<Box
							display="flex"
							flexDirection={{ xs: 'column', sm: 'row' }}
							alignItems={{ xs: 'stretched', sm: 'center' }}
							justifyContent={'space-between'}
							width={1}
							maxWidth={600}
							margin={'0 auto'}
						>
							<LoadingButton
								autoFocus
								fullWidth
								variant="contained"
								type="submit"
								color="primary"
								size="large"
								disabled={!isValid}
								loading={auth.isLoading}
								loadingIndicator="Requesting..."
							>
								Login
							</LoadingButton>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<DividerWithText>OR</DividerWithText>
					</Grid>

					<Grid item xs={12}>
						<Button
							size="large"
							variant="outlined"
							fullWidth
							startIcon={<GoogleIcon />}
							onClick={handleLogin}
						>
							Continue with Google
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default Form;
