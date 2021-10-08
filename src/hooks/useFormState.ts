import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface FormState {
	isValid: boolean;
	values: any;
	touched: any;
	errors: any;
}

interface FormProps {
	onSubmit: (values) => void;
	formErrors: (values) => any;
}

const useFormState = ({ onSubmit, formErrors }: FormProps) => {
	const [state, setState] = useState<FormState>({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	useEffect(() => {
		const errors = formErrors(state.values);

		setState((prevState) => ({
			...prevState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [state.values]);

	const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist();

		setState((prevState) => ({
			...prevState,
			values: {
				...prevState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...prevState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isValid) {
			onSubmit(values);
		}

		setState((prevState) => ({
			...prevState,
			errors: {},
		}));
	};

	const hasError = (field: string): boolean =>
		!!(state.touched[field] && state.errors[field]);

	const { isValid, values, errors } = state;

	return {
		values,
		isValid,
		errors,
		hasError,
		handleFormChange,
		handleSubmit,
	};
};

export default useFormState;
