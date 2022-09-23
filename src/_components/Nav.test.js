
import { waitFor } from '@testing-library/react';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import { setUser } from '_store';
import Nav from './Nav';

describe('<Nav />', () => {
	test('renders Nav', async () => {
		const store = setupStore();
		const payload = { token: 'dfdfdf', user: { username: 'dsdsds', displayname: 'dssds' } };
        const { getByText, debug } = renderWithProviders(<Nav />, { store });
        
		await waitFor(() => {
            
			store.dispatch(setUser(payload));			
		});
        
		getByText('SHARE');
	});
});
