import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from 'constants';
import JwtService from 'services/jwtService';
import { fetchWrapper } from '_helpers';

export const submitRegister = ({ displayname, password, username }) => async dispatch => {
		dispatch(setRegisterLoading(true));

		let response;

		try {
			response = await fetchWrapper.post(`${baseUrl}/auth/register`, {
				displayname,
				password,
				username
			});
		} catch (e) {
			response = { error: [{ type: 'server', message: 'El servidor ha rechazado la conexión' }] };
		}

		dispatch(setRegisterLoading(false));

		if (response.user) {
			dispatch(registerSuccess());
			JwtService.setSession(response);
			return;
		}

		dispatch(registerError(response.error));
		// JwtService.setSession(null);
	};

const initialState = {
	success: false,
	errors: [],
	isLoading: false
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
			state.isLoading = false;
		},
		registerError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
			state.isLoading = false;
		},
		setRegisterLoading: (state, action) => {
			state.isLoading = action.payload;
		}
	}
});

export const { registerSuccess, registerError, setRegisterLoading } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
