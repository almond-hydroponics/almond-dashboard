import { useDispatch } from 'react-redux';
import validate from 'validate.js';
import useFormState from '@hooks/useFormState';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import {
	SignalWifi3Bar,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { loginAccount } from '@modules/authentication';

const schema = {
	username: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 300,
		},
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
	},
};

const ConnectionForm = (): JSX.Element => {
	const dispatch = useDispatch();

	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: async ({ email, password }) => {
				await dispatch(loginAccount({ email, password }));
			},
			formErrors: (formValues) => validate(formValues, schema),
		});

	return (
		<form name="email-login" onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Username *"
						variant="outlined"
						size="medium"
						name="username"
						fullWidth
						helperText={hasError('username') ? errors.username[0] : null}
						error={hasError('username')}
						onChange={handleFormChange}
						type="email"
						value={values.username || ''}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									{
										<SignalWifi3Bar
											color={hasError('username') ? 'error' : 'primary'}
										/>
									}
								</InputAdornment>
							),
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
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
							startAdornment: (
								<InputAdornment
									style={{ cursor: 'pointer' }}
									onClick={togglePassword}
									position="start"
								>
									{isPasswordHidden ? (
										<Visibility
											color={hasError('password') ? 'error' : 'primary'}
										/>
									) : (
										<VisibilityOff
											color={hasError('password') ? 'error' : 'primary'}
										/>
									)}
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
							// loading={auth.isLoading}
							loadingIndicator="Requesting..."
						>
							Configure connection
						</LoadingButton>
					</Box>
				</Grid>
			</Grid>
		</form>
	);
};

export default ConnectionForm;
