import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from '_helpers/lodash';
import { ClickAwayListener, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { editNameFile } from '_store';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a name')
});

const NameEditable = ({ id, name, userId, formOpen, handleOpenForm, handleCloseForm }) => {
	const dispatch = useDispatch();
	const board = {
		name,
		userId
	};

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: board.name
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset({
				title: board.name
			});
		}
	}, [formOpen, reset, board.name]);

	function onSubmit(data) {
		dispatch(editNameFile({ id: id, name: data.title }));
		handleCloseForm();
	}

	return (
		<div className="flex items-center min-w-0">
			{formOpen ? (
				<ClickAwayListener onClickAway={handleCloseForm}>
					<Paper>
						<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										variant="outlined"
										margin="none"
										autoFocus
										hiddenLabel
										sx={{ margin: 0, width: 'auto' }}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														type="submit"
														disabled={_.isEmpty(dirtyFields) || !isValid}
													>
														<Check></Check>
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								)}
							/>
						</form>
					</Paper>
				</ClickAwayListener>
			) : (
				<div className="flex items-center justify-center">
					<Typography
						className="text-14 sm:text-18 font-medium cursor-pointer"
						onClick={handleOpenForm}
						color="inherit"
						sx={{ marginBottom: 2, marginTop: 2, textSizeAdjust: 14, marginLeft: 2 }}
					>
						{board.name}
					</Typography>
				</div>
			)}
		</div>
	);
};

export default NameEditable;
