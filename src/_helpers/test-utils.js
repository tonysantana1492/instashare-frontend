import { Provider } from 'react-redux';
import {
	filesReducer,
	loginReducer,
	registerReducer,
	userReducer
} from '_store';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

export const setupStore = preloadedState => {
	return configureStore({
		reducer: {
			loginReducer: loginReducer,
			userReducer: userReducer,
			registerReducer: registerReducer,
			filesReducer: filesReducer
		},
		preloadedState
	});
};

export function renderWithProviders(
	ui,
	{ preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
