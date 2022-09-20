import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '_helpers/lodash';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Email, Person, VpnKey } from '@mui/icons-material';
import { submitRegister } from '_store/register.slice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	displayname: yup
		.string()
		.required('You must enter display name')
		.min(4, 'Should be 4 chars minimum.')
		.max(40, 'Should be 40 chars maximum.'),
	username: yup.string().email('You must enter a valid email').required('You must enter a email'),
	password: yup
		.string()
		.required('Please enter your password.')
		.matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password too weak')
		.min(8, 'Should be 4 chars minimum.')
		.max(20, 'Should be 40 chars maximum.'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
	displayname: '',
	username: '',
	password: '',
	passwordConfirm: ''
};

const JWTRegister = () => {
	const dispatch = useDispatch();
	const register = useSelector(state => state.registerReducer);

	const isLoading = register.isLoading;


	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const onSubmit = async model => {
		if(!isLoading){
			await dispatch(submitRegister(model));
		}
	};

	useEffect(() => {
		register.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [register.errors, setError]);

	return (
		<div className="flex items-center w-full p-9">
			<form className="flex gap-9 flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="displayname"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							label="Display name"
							error={!!errors.displayname}
							helperText={errors?.displayname?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Person color="action"></Person>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							autoComplete = 'username'
							error={!!errors.username}
							helperText={errors?.username?.message}
							label="Email"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Email color="action"></Email>
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
							autoComplete = 'new-password'
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

				<Controller
					name="passwordConfirm"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							autoComplete = 'new-password'
							type="password"
							label="Confirmar"
							error={!!errors.passwordConfirm}
							helperText={errors?.passwordConfirm?.message}
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
					variant="contained"
					color="primary"
					sx={{ borderRadius: '20px', backgroundColor: 'teal' }}
					aria-label="REGISTER"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					value="legacy"
				>
					{isLoading ? 'Sending...' : 'Register' }
				</Button>
			</form>
		</div>
	);
};

export default JWTRegister;
