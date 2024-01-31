describe('Sign Up and Sign In Test Suite', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/signup');
  });

  it('Should navigate to Sign Up page and successfully sign up a new user', () => {
      cy.get('#firstName').type('admin123');
      cy.get('#lastName').type('admin321');
      cy.get('#username').type('admin1234');
      cy.get('#password').type('admin12345');
      cy.get('#confirmPassword').type('admin12345');

      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/signin');
  });

  it('Should navigate to Sign In page and successfully log in the new user', () => {
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/signin');

      cy.get('#username').type('admin1234');
      cy.get('#password').type('admin12345');

      cy.get('button[type="submit"]').click();

      cy.url().should('eq', 'http://localhost:3000/');

      // Handling the "Get Started with Real World App" popup window
      cy.get('button[type="button"]').contains('Next').click();

      // Handling the "Create Bank Account" popup window
      cy.get('#bankName').type('TestBank');
      cy.get('#routingNumber').type('123456789');
      cy.get('#accountNumber').type('987654321');
      cy.get('button[type="button"]').contains('Save').click();

      // Handling the "Finished" popup window
      cy.get('button[type="button"]').contains('DONE').click();
  });
});