describe('Successful Navigation Tests', () => {
  it('should successfully navigate the website after signing in', () => {
    // Visit the signin page
    cy.visit('http://localhost:3000/signin');

    // Fill in the signin form
    cy.get('input[name=username]').type('admin123');
    cy.get('input[name=password]').type('admin1234');

    // Click the sign in button
    cy.get('button[type=submit]').click();

    // Assert if the user is redirected to the home page after successful login
    cy.url().should('eq', 'http://localhost:3000/');

    // Navigate to My Account Page
    cy.visit('http://localhost:3000/user/settings');

    // Assert if the navigation to My Account Page is successful
    cy.url().should('eq', 'http://localhost:3000/user/settings');

    // Navigate to Bank Account Page
    cy.visit('http://localhost:3000/bankaccounts');

    // Assert if the navigation to Bank Account Page is successful
    cy.url().should('eq', 'http://localhost:3000/bankaccounts');

    // Navigate to Notification Page
    cy.visit('http://localhost:3000/notifications');

    // Assert if the navigation to Notification Page is successful
    cy.url().should('eq', 'http://localhost:3000/notifications');

    // Logout from the website
    cy.visit('http://localhost:3000/logout');

    // Assert if the user is redirected to the signin page after logout
    cy.url().should('eq', 'http://localhost:3000/signin');
  });
});
