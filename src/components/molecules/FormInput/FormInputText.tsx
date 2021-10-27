import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';
import { InputAdornment, TextField } from '@mui/material';

interface IconProps {
	[x: string]: any;
}

const FormInputText = ({
	name,
	control,
	label,
	Icon,
	iconPosition,
	...rest
}: FormInputProps) => {
	const IconAdornment = ({ ...rest }: IconProps): JSX.Element => {
		// @ts-ignore
		return <Icon {...rest} />;
	};

	const returnIcon = (error) => {
		switch (iconPosition) {
			case 'start':
				return {
					startAdornment: (
						<InputAdornment position="start">
							<IconAdornment color={error ? 'error' : 'primary'} />
						</InputAdornment>
					),
				};
			case 'end':
				return {
					endAdornment: (
						<InputAdornment position="end">
							<IconAdornment color={error ? 'error' : 'primary'} />
						</InputAdornment>
					),
				};
			default:
				return null;
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => {
				return (
					<TextField
						helperText={error ? error.message : null}
						size="small"
						error={!!error}
						onChange={onChange}
						value={value}
						fullWidth
						label={label}
						variant="outlined"
						InputProps={returnIcon(error)}
						{...rest}
					/>
				);
			}}
		/>
	);
};

export default FormInputText;
