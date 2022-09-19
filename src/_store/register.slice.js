import { createSlice } from '@reduxjs/toolkit';
import JwtService from 'services/jwtService';
// import { setUserData } from './users.slice';


export const submitRegister = ({ displayname, password, username }) => async dispatch => {

	dispatch(setRegisterLoading(true));
	
	return JwtService
		.register({
			displayname,
			password,
			username
		})
		.then(data => {
			// dispatch(setUserData(data));
			JwtService.setSession(data);
			return dispatch(registerSuccess());
		})
		.catch(errors => {
			JwtService.setSession(null);
			return dispatch(registerError(errors));
		});
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
	},
	
});

export const { registerSuccess, registerError, setRegisterLoading } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
