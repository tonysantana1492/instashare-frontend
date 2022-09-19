import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './login.slice';
import { registerReducer } from './register.slice';
import { userReducer } from './users.slice';

export * from './login.slice';
export * from './users.slice';
export * from './register.slice';

export const store = configureStore({
	reducer: {
		loginReducer: loginReducer,
		userReducer: userReducer,
		registerReducer: registerReducer
	}
});
