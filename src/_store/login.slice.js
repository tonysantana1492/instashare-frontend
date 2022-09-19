import { createSlice } from '@reduxjs/toolkit';
import JwtService from 'services/jwtService';
// import { setUserData, userLoggedOut } from './users.slice';

export const submitLogin = ({ username, password }) => async dispatch => {

	dispatch(setLoginLoading(true))

	return JwtService
		.signInWithEmailAndPassword({ username, password })
		.then(data => {			
			// dispatch(setUserData(data));
			JwtService.setSession(data);
			return dispatch(loginSuccess());
		})
		.catch(errors => {
			JwtService.setSession(null);
			return dispatch(loginError(errors));
		});
};

export const autoLogin = () => async dispatch => {
	return JwtService.signInWithToken()
		.then(data => {
			// dispatch(setUserData(data));
			JwtService.setSession(data);
			return dispatch(loginSuccess());
		})
		.catch(errors => {
			JwtService.setSession(null);
			return dispatch(loginError(errors));
		});
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
