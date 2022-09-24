const dispatch = action => cy.window().its('store').invoke('dispatch', action);

describe('<FileManager />', () => {
	it('<FileManager /> Show table', () => {		

		cy.login();			
		cy.get('[data-cy=refresh-button]').should('exist');	
		cy.get('[data-cy=upload-button]').should('exist');	
		cy.get('[data-cy=search-component]').should('exist'); 
	});
});
