import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileTimePicker } from '@mui/lab';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';
import { TextField } from '@mui/material';

const FormInputDate = ({ name, control, label }: FormInputProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState, formState }) => (
					<MobileTimePicker
						renderInput={(params) => <TextField {...params} />}
						label={label}
						rifmFormatter={(val) => val.replace(/[^[a-zA-Z0-9-]*$]+/gi, '')}
						{...field}
					/>
				)}
			/>
		</LocalizationProvider>
	);
};

export default FormInputDate;
