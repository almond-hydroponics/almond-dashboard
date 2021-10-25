import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileTimePicker } from '@mui/lab';
import { Controller, useFormContext } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

const DATE_FORMAT = 'dd-MMM-yy';

const FormInputDate = ({ name, control, label }: FormInputProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState, formState }) => (
					<MobileTimePicker
						fullWidth
						variant="inline"
						defaultValue={new Date()}
						id={`date-${Math.random()}`}
						label={label}
						rifmFormatter={(val) => val.replace(/[^[a-zA-Z0-9-]*$]+/gi, '')}
						refuse={/[^[a-zA-Z0-9-]*$]+/gi}
						autoOk
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						format={DATE_FORMAT}
						{...field}
					/>
				)}
			/>
		</LocalizationProvider>
	);
};

export default FormInputDate;
