import { act, screen, waitFor } from '@testing-library/react';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import FileList from './FileList';
import { setUser } from '_store';
import '@testing-library/jest-dom';

describe('<FileList />', () => {
	test('renders FileList ok', async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: {id: 5, username: 'some.user', displayname: 'Tony' } };
		const filteredFiles = [
			{
				id: 5,
				userId: 5,
				name: 'some file',
				ext: 'some ext',
				type: 'some type',
				size: 1111
			}
		];

		await act(() => {
			store.dispatch(setUser(payload));
			renderWithProviders(
				<Router>
					<FileList filteredFiles={filteredFiles}/>
				</Router>,
				{ store }
			);
		});

		expect(screen.getByText(/some file/i)).toBeInTheDocument();

	});

	test('renders FileList not found', async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: {id: '5', username: 'some.user', displayname: 'Tony' } };
		

		await act(() => {
			store.dispatch(setUser(payload));
			renderWithProviders(
				<Router>
					<FileList filteredFiles={[]}/>
				</Router>,
				{ store }
			);
		});

		expect(screen.getByText(/No Items Founds/i)).toBeInTheDocument();

	});
});
