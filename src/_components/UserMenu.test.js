import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import { setUser } from '_store';
import UserMenu from './UserMenu';

describe('<UserMenu />', () => {
	it('renders UserMenu', async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: { username: 'some.user', displayname: 'Tony' } };
        const { getByText, debug } = renderWithProviders(<UserMenu />, { store });
        
		await waitFor(() => {            
			store.dispatch(setUser(payload));			
		});
        
		getByText('T');
	});

	it('show menu of UserMenu', async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: { username: 'some.user', displayname: 'Tony' } };
        const { getByText, debug, getByTestId } = renderWithProviders(<UserMenu />, { store });
        
		await waitFor(() => {            
			store.dispatch(setUser(payload));			
		});
        
		const menu = getByTestId('usermenu-id');

		await waitFor(() => {            
			userEvent.click(menu);			
		});

		getByText('some.user');
		
	});
});
