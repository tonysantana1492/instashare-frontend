import { act, getByText, screen, waitFor } from '@testing-library/react';
import { renderWithProviders, setupStore } from '_helpers/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { setUser } from '_store';
import '@testing-library/jest-dom';
import FileListItem from './FileListItem';
import userEvent from '@testing-library/user-event';

describe('<FileList />', () => {
	beforeEach(async () => {
		const store = setupStore();
		const payload = { token: 'sometoken', user: { id: 5, username: 'some.user', displayname: 'Tony' } };
		const filteredFiles = {
			id: 5,
            userId: 5,
			name: 'some file',
			ext: 'some ext',
			type: 'some type',
			size: 1111
		};

		await act(() => {
			store.dispatch(setUser(payload));
			renderWithProviders(
				<Router>
					<FileListItem item={filteredFiles} />
				</Router>,
				{ store }
			);
		});
	});

	test('renders FileList ok', async () => {
		expect(screen.getByText(/some file/i)).toBeInTheDocument();
	});

    test('renders FileList and show menu', async () => {

        const buttonSettings = screen.getByTestId('buttonsetting-id');

        await act( ()=>{
            userEvent.click(buttonSettings);
        });

		expect(screen.getByTestId('DownloadIcon')).toBeInTheDocument();
	});
});
