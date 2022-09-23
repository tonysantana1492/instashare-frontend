import { act, screen } from '@testing-library/react';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { setUser } from '_store';
import '@testing-library/jest-dom';
import FileManager from './FileManager';

describe('<FileList />', () => {
	test('renders FileList ok', async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: {id: '5', username: 'some.user', displayname: 'Tony' } };
		const files = [
			{
				id: 5,
				name: 'some file',
				ext: 'some ext',
				type: 'some type',
				size: 1111
			}
		];

		window.fetch = jest.fn();

		fetch.mockResolvedValueOnce(
			Promise.resolve({
				text: () => Promise.resolve(JSON.stringify(files)),
				ok: true
			})
		);

		await act(() => {
			store.dispatch(setUser(payload));
			renderWithProviders(
				<Router>
					<FileManager/>
				</Router>,
				{ store }
			);
		});

		expect(screen.getByText(/some file/i)).toBeInTheDocument();

	});

});
