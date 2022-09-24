describe('<Nav />', () => {
	it('<Nav /> Show the nav', () => {
		cy.login();

		// The menu loggout is not visible
		cy.get('[data-cy=button-loggout]').should('not.exist');
		// The logo must by visible
		cy.get('[data-cy=logo]').should('exist');

		// Show the menu loggout
		cy.get('[data-cy=usermenu-id]').click();
		cy.get('[data-cy=button-loggout]').should('exist');

		// Loggout
		cy.get('[data-cy=button-loggout]').click();
		cy.window().its('localStorage.jwt_access_token').should('not.exist');
	});
});
