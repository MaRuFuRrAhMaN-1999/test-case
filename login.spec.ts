describe('Sign Up and Sign In Tests', () => {
  it('should successfully sign up and sign in', () => {
    // Visit the signup page
    cy.visit('http://localhost:3000/signup');

    // Fill in the signup form
    cy.get('input[name=firstName]').type('admin');
    cy.get('input[name=lastName]').type('admin');
    cy.get('input[name=username]').type('admin123');
    cy.get('input[name=password]').type('admin1234');
    cy.get('input[name=confirmPassword]').type('admin1234');

    // Click the sign up button
    cy.get('button[type=submit]').click();

    // Assert if the user is redirected to the signin page
    cy.url().should('eq', 'http://localhost:3000/signin');

    // Fill in the signin form
    cy.get('input[name=username]').type('admin123');
    cy.get('input[name=password]').type('admin1234');

    // Click the sign in button
    cy.get('button[type=submit]').click();

    // Assert if the user is redirected to the home page after successful login
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
