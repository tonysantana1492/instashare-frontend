import { act, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '_helpers/test-utils';
import '@testing-library/jest-dom';
import { TOKEN_ENV } from 'constants';
import Register from './Register';


describe('<RegisterPage />', () => {
	const mockLogin = jest.fn();
	const formData = {
		email: 'real@test.com',
		password: 'TonyMio2590',
		displayname: 'Tony Santana'
	};

	beforeEach(async () => {
		await act(async () =>
			renderWithProviders(
				<Router>
					<Register onSubmit={mockLogin(formData.email, formData.password, formData.displayname)} />
				</Router>
			)
		);
	});

	test('should render OK', async () => {
		expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
	});

	test('displays username validation errors', async () => {
		const displayname = screen.getByLabelText(/display name/i);
		await act(() => {
			userEvent.type(displayname, 'th');
		});
		expect(screen.queryByText(/Should be 4 chars minimum./i)).toBeInTheDocument();

		await act(() => {
			userEvent.type(displayname, 'fsdssdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsds');
		});
		expect(screen.queryByText(/Should be 40 chars maximum./i)).toBeInTheDocument();		

		await act(() => {
			userEvent.clear(displayname);
		});
		expect(screen.queryByText(/You must enter display name./i)).toBeInTheDocument();
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
		expect(screen.queryByText(/You must enter a email./i)).toBeInTheDocument();
	});

	test('displays password validation errors', async () => {
		const password = screen.getByLabelText(/Password/i);
		await act(() => {
			userEvent.type(password, 'fff');
		});
		expect(screen.queryByText(/Password too weak./i)).toBeInTheDocument();

		await act(() => {
			userEvent.clear(password);
		});
		expect(screen.queryByText(/Please enter your password./i)).toBeInTheDocument();
	});

	test('displays password must match', async () => {
		const password = screen.getByLabelText(/Password/i);
		const confirmpassword = screen.getByLabelText(/Confirm/i);
		await act(() => {
			userEvent.type(password, 'SomeUser1992');
			userEvent.type(confirmpassword, 'SomeUser1993');
		});
		expect(screen.queryByText(/Passwords must match./i)).toBeInTheDocument();
	});

	test('button disabled', async () => {
		const buttonSubmit = screen.getByRole('button');
		expect(buttonSubmit).toHaveAttribute('disabled');
	});

	test('form ok, button login enable?', async () => {
		const buttonSubmit = screen.getByRole('button');
		const displayname = screen.getByLabelText(/display name/i);
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/password/i);
		const confirmpassword = screen.getByLabelText(/confirm/i);

		await act(() => {
			userEvent.type(displayname, 'Tony Santana');
		});
		await act(() => {
			userEvent.type(email, 'real@test.com');
		});
		await act(() => {
			userEvent.type(password, 'TonyMio2590');
		});
		await act(() => {
			userEvent.type(confirmpassword, 'TonyMio2590');
		});
		expect(buttonSubmit).not.toHaveAttribute('disabled');

	});
});


describe('<Register/> with call api mock ', () => {
	beforeEach(async () => {
		
		await act(async () =>
			renderWithProviders(
				<Router>
					<Register />
				</Router>
			)
		);
	});

	test('submits a form with invalid credentials', async () => {
		const buttonSubmit = screen.getByRole('button');
		const displayname = screen.getByLabelText(/display name/i);
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/password/i);
		const confirmpassword = screen.getByLabelText(/confirm/i);
		const formData = {
			email: 'real@gmail.com',
			password: 'TonyMio2590',
			displayname: 'Tony Santana'
		};

		window.fetch = jest.fn();

		fetch.mockResolvedValueOnce(
			Promise.resolve({
				text: () =>
					Promise.resolve(JSON.stringify({ error: [{ type: 'username', message: 'Username already exists' }] })),
				ok: true
			})
		);

		await act(() => {
			userEvent.type(displayname, formData.displayname);
		});
		await act(() => {
			userEvent.type(email, formData.email);
		});
		await act(() => {
			userEvent.type(password, formData.password);
		});
		await act(() => {
			userEvent.type(confirmpassword, formData.password);
		});

		expect(buttonSubmit).not.toHaveAttribute('disabled');

		await act(() => {
			userEvent.click(buttonSubmit);
		});

		expect(screen.queryByText(/Username already exists/i)).toBeInTheDocument();
	});

	test('submits a form with valid credentials', async () => {
		const buttonSubmit = screen.getByRole('button');
		const displayname = screen.getByLabelText(/display name/i);
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/password/i);
		const confirmpassword = screen.getByLabelText(/confirm/i);
		const formData = {
			email: 'real@gmail.com',
			password: 'TonyMio2590',
			displayname: 'Tony Santana'
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
			userEvent.type(displayname, formData.displayname);
		});
		await act(() => {
			userEvent.type(email, formData.email);
		});
		await act(() => {
			userEvent.type(password, formData.password);
		});
		await act(() => {
			userEvent.type(confirmpassword, formData.password);
		});

		expect(buttonSubmit).not.toHaveAttribute('disabled');

		await act(() => {
			userEvent.click(buttonSubmit);
		});		

		expect(localStorage.setItem).toHaveBeenCalledWith(TOKEN_ENV, 'XXX');
	});
});
