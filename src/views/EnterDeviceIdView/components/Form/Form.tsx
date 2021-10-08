import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';
import useFormState from '@hooks/useFormState';
import { verifyUserDevice } from '@modules/device';
import { IRootState } from '../../../../store/rootReducer';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { PhonelinkSetupSharp } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const schema = {
	deviceId: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 20,
			minimum: 6,
		},
	},
};

const Form = (): JSX.Element => {
	const dispatch = useDispatch();
	const router = useHistory();
	const { isLoading } = useSelector((state: IRootState) => state.device);

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: async ({ deviceId }) => {
				dispatch(verifyUserDevice({ id: deviceId }));
				if (location.pathname === '/my-device') {
					await router.push('/dashboard');
				}
			},
			formErrors: (formValues) => validate(formValues, schema),
		});

	return (
		<form name="enter-device-form" method="post" onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						label="Enter device ID"
						name="deviceId"
						variant="outlined"
						size="medium"
						fullWidth
						helperText={hasError('deviceId') ? errors.deviceId[0] : null}
						error={hasError('deviceId')}
						onChange={handleFormChange}
						type="text"
						value={values.deviceId || ''}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PhonelinkSetupSharp
										color={hasError('deviceId') ? 'error' : 'primary'}
									/>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						size="large"
						variant="contained"
						type="submit"
						color="primary"
						fullWidth
						disabled={!isValid}
					>
						{isLoading ? 'Adding...' : 'Add device'}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default Form;
