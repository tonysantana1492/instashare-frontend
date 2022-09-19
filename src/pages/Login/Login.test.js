import { act, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './Login';
import { renderWithProviders } from '_helpers/test-utils';
import '@testing-library/jest-dom';

describe('<Login />', () => {
	beforeEach(async () => {
		await act(async () =>
			renderWithProviders(
				<Router>
					<LoginPage />
				</Router>
			)
		);
	});

	it('should render OK', async () => {
		/*const store = setupStore();		
    await act( async () => render (<Provider store={store}><LoginPage /></Provider>, {wrapper: BrowserRouter}));
    */

		expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
	});

	it('displays email validation errors', async () => {
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

	it('displays password validation errors', async () => {
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

	it('button disabled', async () => {
		const buttonSubmit = screen.getByRole('button');
		expect(buttonSubmit).toHaveAttribute('disabled');
	});

	it('form ok, button login enable?, sending form?', async () => {
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

		await act(() => {
			userEvent.click(buttonSubmit);
		});

		expect(screen.queryByText(/Sending.../i)).toBeInTheDocument();
	});

	/*it('submits form and calls api', async () => {
		const buttonSubmit = screen.getByRole('button');
		const email = screen.getByLabelText(/email/i);
		const password = screen.getByLabelText(/Password/i);
		const formData = {
			email: 'real@test.com',
			password: 'TonyMio2590'
		};

		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ error: { type: 'password', messsage: 'Invalid credentials' } }]
		});
		
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
		// expect(errorMessage).toHaveTextContent(/mutation-error/i);
		// expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "XXX");
	});*/

	/*it('change to register page', async () => {

		const register = screen.getByText(/Register/i);

		await act(() => {
			userEvent.click(register);
		});

    console.log(screen);
		
    expect(screen.queryByText(/Already have an account?/i)).toBeInTheDocument();
	});*/
});

/*describe('<Login />', () => {
	
	beforeEach(async () => {
		await waitFor(async () => {
			renderWithProviders(
				<Router>
					<LoginPage />
				</Router>
			);
		});
	});

	it('should render OK', async () => {
		await waitFor(() => {     
      expect(screen.getByText(/insta/i)).toBeInTheDocument();
		});
	});

	it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });
  it("display password required errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });
  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "XXX");
  });*/
