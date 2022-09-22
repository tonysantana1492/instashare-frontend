import { act, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './Login';
import { renderWithProviders } from '_helpers/test-utils';
import '@testing-library/jest-dom';
import FormularioLogin from './FormularioLogin';
import { TOKEN_ENV } from 'constants';

jest.mock('pages/Register/Register', () => {
	return {
		RegisterPage: () => <span>register page</span>
	};
});

describe('<LoginPage />', () => {
	const mockLogin = jest.fn();
	const formData = {
		email: 'real@test.com',
		password: 'TonyMio2590'
	};

	beforeEach(async () => {
		await act(async () =>
			renderWithProviders(
				<Router>
					<LoginPage onSubmit={mockLogin(formData.email, formData.password)} />
				</Router>
			)
		);
	});

	test('should render OK', async () => {
		expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
	});

	test('displays email validation errors', async () => {
		const email = screen.getByLabelText(/email/i);
		await act(() => {
			userEvent.type(email, 'this@wont');
		});
		expect(screen.queryByText(/You must enter a valid email./i)).toBeInTheDocument();
		await act(() => {
			userEvent.clear(email);
		});
		expect(screen.queryByText(/You must enter a email/i)).toBeInTheDocument();
	});

	test('displays password validation errors', async () => {
		const password = screen.getByLabelText(/Password/i);
		await act(() => {
			userEvent.type(password, 'fff');
		});
		expect(screen.queryByText(/Password too weak/i)).toBeInTheDocument();

		await act(() => {
			userEvent.clear(password);
		});
		expect(screen.queryByText(/Please enter your password./i)).toBeInTheDocument();
	});

	test('button disabled', async () => {
		const buttonSubmit = screen.getByRole('button');
		expect(buttonSubmit).toHaveAttribute('disabled');
	});

	test('form ok, button login enable?', async () => {
		const buttonSubmit = screen.getByRole('button');
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);

		await act(() => {
			userEvent.type(email, 'real@test.com');
		});
		await act(() => {
			userEvent.type(password, 'TonyMio2590');
		});
		expect(buttonSubmit).not.toHaveAttribute('disabled');

	});
});


describe('<LoginPage/> with call api mock ', () => {
	beforeEach(async () => {
		/*originalFetch = global.fetch;
		global.fetch = jest.fn(() =>
			Promise.resolve({
				text: () =>
					Promise.resolve(JSON.stringify({ error: [{ type: 'password', message: 'Invalid credentials' }] })),
				ok: true
			})
		);*/

		await act(async () =>
			renderWithProviders(
				<Router>
					<LoginPage />
				</Router>
			)
		);
	});

	test('submits a form with invalid credentials', async () => {
		const buttonSubmit = screen.getByRole('button');
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);
		const formData = {
			email: 'real@test.com',
			password: 'TonyMio2590'
		};

		window.fetch = jest.fn();

		fetch.mockResolvedValueOnce(
			Promise.resolve({
				text: () =>
					Promise.resolve(JSON.stringify({ error: [{ type: 'password', message: 'Invalid credentials' }] })),
				ok: true
			})
		);

		await act(() => {
			userEvent.type(email, formData.email);
		});
		await act(() => {
			userEvent.type(password, formData.password);
		});

		expect(buttonSubmit).not.toHaveAttribute('disabled');

		await act(() => {
			userEvent.click(buttonSubmit);
		});

		expect(screen.queryByText(/Invalid credentials/i)).toBeInTheDocument();
	});

	test('submits a form with valid credentials', async () => {
		const buttonSubmit = screen.getByRole('button');
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);
		const formData = {
			email: 'real@test.com',
			password: 'TonyMio2590'
		};

		window.fetch = jest.fn();

		fetch.mockResolvedValueOnce(
			Promise.resolve({
				text: () =>
					Promise.resolve(
						JSON.stringify({
							token: 'XXX',
							user: [{ username: 'someusername', displayname: 'somedisplayname' }]
						})
					),
				ok: true
			})
		);

		jest.spyOn(Storage.prototype, 'setItem');

		await act(() => {
			userEvent.type(email, formData.email);
		});
		await act(() => {
			userEvent.type(password, formData.password);
		});

		expect(buttonSubmit).not.toHaveAttribute('disabled');

		await act(() => {
			userEvent.click(buttonSubmit);
		});		

		expect(localStorage.setItem).toHaveBeenCalledWith(TOKEN_ENV, 'XXX');
	});
});
