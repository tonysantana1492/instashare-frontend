// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
	cy.visit('/');

	cy.get('[data-cy=username] input').clear();
	cy.get('[data-cy=password] input').clear();
	cy.get('[data-cy=username]').type( username || 'tonysantana1492@gmail.com');
	cy.get('[data-cy=password]').type(password || 'TonySantana1492');

	cy.get('[data-cy=loginBtn]').click();
	cy.window().its('localStorage.jwt_access_token').should('be.a', 'string');
});
