import { render, waitFor } from '@testing-library/react';
import { App } from 'App';
import React from 'react';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import '@testing-library/jest-dom';
import { setUser } from '_store';

jest.mock('./routers/logged-out-router', () => {
	return {
		LoggedOutRouter: () => <span>logged-out</span>
	};
});
jest.mock('./routers/logged-in-router', () => {
	return {
		LoggedInRouter: () => <span>logged-in</span>
	};
});

describe('<App />', () => {
	it('renders LoggedOutRouter', () => {
		const { getByText } = renderWithProviders(<App />);
		getByText('logged-out');
	});

	it('renders LoggedInRouter', async () => {
		const store = setupStore();
		const payload = { token: 'dfdfdf', user: {} };
    store.dispatch(setUser(payload));

		const { getByText } = renderWithProviders(<App />, { store });

		getByText('logged-in');
	});
});
