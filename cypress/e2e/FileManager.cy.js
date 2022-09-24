const dispatch = action => cy.window().its('store').invoke('dispatch', action);
const file = {
	id: 1,
	name: 'somefile',
	type: 'zip',
	size: 1234
};

describe('<FileManager />', () => {
	it('<FileManager /> Show table', () => {
		cy.login();
		
	});
});
