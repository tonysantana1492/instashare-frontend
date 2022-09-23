describe('<Login />', () => {
	it('<Login /> Validation and alerts', () => {
		// Visit home and redirect to login
		cy.visit('/');

		// Check Login render and button form disabled
		cy.get('[data-cy=ask-account]').should('exist').invoke('text').should('equal', "Don't have an account?");
		cy.get('[data-cy=loginBtn]').should('be.disabled');

		// Check for empty fields alert
		cy.get('[data-cy=username]').type('username');
		cy.get('[data-cy=password]').type('SomePassword123');
		cy.get('[data-cy=username]').clear();
		cy.get('[data-cy=password]').clear();

		cy.get('[data-cy=username] p').should('exist').invoke('text').should('equal', 'You must enter a email.');
		cy.get('[data-cy=password] p').should('exist').invoke('text').should('equal', 'Please enter your password.');
		cy.get('[data-cy=loginBtn]').should('be.disabled');

		// Check for incorrect username alert
		cy.get('[data-cy=username]').type('username');
		cy.get('[data-cy=password]').type('SomePassword123');

		cy.get('[data-cy=username] p').should('exist').invoke('text').should('equal', 'You must enter a valid email.');

		cy.get('[data-cy=password] p').should('not.exist');
		cy.get('[data-cy=loginBtn]').should('be.disabled');

		// Check for short length alert
		cy.get('[data-cy=username]').clear().type('someuser@gmail.com');
		cy.get('[data-cy=password]').clear().type('123');

		cy.get('[data-cy=password] p').should('exist').invoke('text').should('equal', 'Password too weak.');
		cy.get('[data-cy=username] p').should('not.exist');
		cy.get('[data-cy=loginBtn]').should('be.disabled');

		// Check for long length alert
		cy.get('[data-cy=username]').clear().type('someuser@gmail.com');
		cy.get('[data-cy=password]').clear().type('SomeUser1234567891023131346463123156456312316416313');

		cy.get('[data-cy=password] p').should('exist').invoke('text').should('equal', 'Should be 40 chars maximum.');
		cy.get('[data-cy=username] p').should('not.exist');
		cy.get('[data-cy=loginBtn]').should('be.disabled');

		// Try to autheticate a user with incorrect email or password
		cy.get('[data-cy=username]').clear().type('some@gmail.com');
		cy.get('[data-cy=password]').clear().type('SomePassword123');

		cy.intercept('http://localhost:4000/**', req => {
			const { operationName } = req.body;

			req.reply(res => {
				res.send({
					error: [{
						type: 'password',
						message: 'Invalid credentials'
					}]
				});
			});
		}).as('getAccount');

		cy.get('[data-cy=loginBtn]').click();
		cy.get('[data-cy=password] p').should('exist').invoke('text').should('equal', 'Invalid credentials');
	});

	// Login succesfully
	it('<Login /> Successfully authenticate a user', () => {
		cy.get('[data-cy=username] input').clear();
		cy.get('[data-cy=password] input').clear();
		cy.get('[data-cy=username]').type('tonysantana1492@gmail.com');
		cy.get('[data-cy=password]').type('TonySantana1492');

		cy.intercept('http://localhost:4000/**', req => {
			const { operationName } = req.body;

			req.reply(res => {
				res.send({
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJkaXNwbGF5bmFtZSI6IlRvbnlTYW50YW5hMTQ5MjMiLCJ1c2VybmFtZSI6ImVsdGl4eGEuc2FudGFuYUBnbWFpbC5jb20iLCJpYXQiOjE2NjM5NjI0ODksImV4cCI6MTY2Mzk2NjA4OX0.64nvlArz0T37LhuxaopenOC9sZ6RRZJPN7POiASdTHs',
					user: { id: 5, username: 'someusername', displayname: 'somedisplayname' }
				});
			});
		}).as('getAccount');

		cy.get('[data-cy=loginBtn]').click();
		cy.window().its('localStorage.jwt_access_token').should('be.a', 'string');
	});
});
