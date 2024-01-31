describe('Login functionality', () => {
  it('should log in with valid credentials', () => {

    cy.visit('http://localhost:3000/login');
    
    cy.get('#username').type('your-username');
    cy.get('#password').type('your-password');
    cy.get('button[type="submit"]').click();

  
    cy.url().should('include', '/signin');
  });

  it('should show an error for invalid credentials', () => {
    
    cy.visit('http://localhost:3000/login');

    
    cy.get('#username').type('invalid-username');
    cy.get('#password').type('invalid-password');
    cy.get('button[type="submit"]').click();

    
    cy.get('.error-message', { timeout: 15000 }).should('be.visible').and('contain', 'Invalid username or password');
  });
  
});
