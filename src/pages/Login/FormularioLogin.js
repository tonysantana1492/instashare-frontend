import { TextField, InputAdornment, Button } from '@mui/material';
import { Mail, VpnKey } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from '_helpers/lodash';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from '_store';

const schema = yup.object().shape({
	username: yup.string().email('You must enter a valid email.').required('You must enter a email.'),
	password: yup
		.string()
		.required('Please enter your password.')
		.matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password too weak.')
		.min(8, 'Should be 4 chars minimum.')
		.max(20, 'Should be 40 chars maximum.')
});

const defaultValues = {
	username: '',
	password: ''
};

const FormularioLogin = () => {
	const dispatch = useDispatch();
	const login = useSelector(state => state.loginReducer);
	const isLoading = login.isLoading;

	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const onSubmit = async model => {
		if (!isLoading) {
			dispatch(submitLogin(model));
		}
	};

	/*useEffect(() => {
		setValue('username', 'tonysantana1492@gmail.com', { shouldDirty: true, shouldValidate: true });
		setValue('password', 'TonySantana1492', { shouldDirty: true, shouldValidate: true });
	}, [reset, setValue, trigger]);*/

	useEffect(() => {
		login.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [login.errors, setError]);

	return (
		<div className="flex items-center w-full p-9">
			<form className="flex gap-9 flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							autoComplete="username"
							data-cy="username"
							data-testid="username"
							type="text"
							label="Email"
							error={!!errors.username}
							helperText={errors?.username?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Mail color="action"></Mail>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							autoComplete="password"
							data-cy="password"
							data-testid="password"
							type="password"
							label="Password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<VpnKey color="action"></VpnKey>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Button
					type="submit"
					data-cy="loginBtn"
					data-testid="loginBtn"
					variant="contained"
					sx={{ borderRadius: '20px', backgroundColor: 'teal' }}
					aria-label="LOG IN"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					value="jwt"
				>
					{isLoading ? 'Sending...' : 'Login'}
				</Button>
			</form>
		</div>
	);
};

export default FormularioLogin;
