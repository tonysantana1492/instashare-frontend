import { renderWithProviders, setupStore } from '_helpers/test-utils';
import UploadFileButton from './UploadFileButton';
import '@testing-library/jest-dom';

describe('<UploadFileButton />', () => {
	test('renders UploadFileButton', async () => {
		const store = setupStore();		
        const {getByTestId } = renderWithProviders(<UploadFileButton />);  
        getByTestId('iconbutton-id');
	});
});