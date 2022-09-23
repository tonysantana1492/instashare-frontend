const { render } = require("@testing-library/react");
const { renderWithProviders } = require("_helpers/test-utils");
const { default: Loading } = require("./Loading");

describe('<Loading />', () => {
	test('renders Loading', () => {
		const { getByText } = render(<Loading />);
		getByText('Loading...');
	});

});