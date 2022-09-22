import { createSlice } from '@reduxjs/toolkit';
import { TOKEN_ENV } from 'constants';


const initialState = {
    isLogin: Boolean(localStorage.getItem(TOKEN_ENV)),
    token: '',
	user: {
		id: '',
        displayName: '',
        username: ''
    }
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => {			
            state.isLogin = true;
            state.token = action.payload.token;
			state.user = action.payload.user;
		},
		setUserLoggedOut: (state, action) => {
            state.isLogin = false;
            state.token = initialState.token;
            state.user = initialState.user;
		}
	},
	extraReducers: {}
});

export const { setUser, setUserLoggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
