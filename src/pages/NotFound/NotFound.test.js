const { renderWithProviders } = require("_helpers/test-utils");
const { default: NotFound } = require("./NotFound");

describe('<NotFound />', () => {
	it('renders Not Found', () => {
		const { getByText } = renderWithProviders(<NotFound />);
		getByText('Not Found Page');
	});

});