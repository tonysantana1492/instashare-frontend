import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from 'constants';
import JwtService from 'services/jwtService';
import { fetchWrapper } from '_helpers';
// import { setUserData, userLoggedOut } from './users.slice';

export const submitLogin =
	({ username, password }) =>
	async dispatch => {

		dispatch(setLoginLoading(true));

		let response;

		try {
			response = await fetchWrapper.post(`${baseUrl}/auth/signin`, {
				username,
				password
			});
		} catch (e) {
			response = { error: [{ type: 'server', message: 'El servidor ha rechazado la conexión' }] };
		}

		dispatch(setLoginLoading(false));

		if (response.user) {
			dispatch(loginSuccess());
			JwtService.setSession(response);
			return;
		}

		dispatch(loginError(response.error));
		// JwtService.setSession(null);

	};

export const autoLogin = () => async dispatch => {

	let response;

	try {
		response = await fetchWrapper.post(`${baseUrl}/auth/access-token`, {
			token: JwtService.getAccessToken()
		});

	}catch (e){
		response = { error: [{ type: 'server', message: 'El servidor ha rechazado la conexión' }] };
	}

	if(response.user) {
		JwtService.setSession(response.user);
		dispatch(loginSuccess());
		return;
	}

	JwtService.setSession(null);
	dispatch(loginError(response.error));

};

const initialState = {
	success: false,
	errors: [],
	isLoading: false
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
			state.isLoading = false;
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
			state.isLoading = false;
		},
		setLoginLoading: (state, action) => {
			state.isLoading = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError, setLoginLoading } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
