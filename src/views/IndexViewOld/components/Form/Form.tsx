/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, TextField, Button, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { GoogleIcon } from '@components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import useFormState from '@hooks/useFormState';
import { loginAccount } from '@modules/authentication';
import validate from 'validate.js';
import { EmailRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IRootState } from '../../../../store/rootReducer';
import { useRouter } from 'next/router';

interface Props {
	handleAuthModal: () => void;
	handleAuthByEmail: () => void;
	authByEmail: boolean;
}

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 300,
		},
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
	},
};

// const isObjectEmpty = (obj): boolean =>
// 	obj &&
// 	Object.keys(obj).length === 0 &&
// 	Object.getPrototypeOf(obj) === Object.prototype;

const Form = ({
	handleAuthModal,
	handleAuthByEmail,
	authByEmail,
}: Props): JSX.Element => {
	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useSelector(
		(globalState: IRootState) => globalState.authentication,
	);

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: async ({ email, password }) => {
				await dispatch(loginAccount({ email, password }));
				if (errors.hasOwnProperty('error')) {
					handleAuthModal();
				}
			},
			formErrors: (formValues) => validate(formValues, schema),
		});

	const handleLogin = () =>
		router.replace(`${process.env.NEXT_PUBLIC_ALMOND_AUTH_API}/auth/google`);

	const renderContinueWithEmail = (): JSX.Element => (
		<form name="email-login" onSubmit={handleSubmit}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<TextField
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
			</Grid>
		</form>
	);

	const renderAuthOptions = () => (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Button
					size="large"
					variant="outlined"
					fullWidth
					startIcon={<EmailRounded />}
					onClick={handleAuthByEmail}
				>
					Continue with Email
				</Button>
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
	);

	return (
		<Box>{authByEmail ? renderContinueWithEmail() : renderAuthOptions()}</Box>
	);
};

export default Form;
