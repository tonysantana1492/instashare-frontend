import { waitFor } from '@testing-library/react';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import { setUser } from '_store';
import Buscador from './Buscador';

describe('<Buscador />', () => {
	test('renders Buscador', async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: { username: 'some.user', displayname: 'Tony' } };
        const {getByPlaceholderText } = renderWithProviders(<Buscador />, { store });
        
		await waitFor(() => {
            
			store.dispatch(setUser(payload));			
		});
        
		getByPlaceholderText('Search...');
	});
});
