describe('User Registration', () => {
  it('should allow users to register with valid credentials', () => {
    // Visit the registration page
    cy.visit('http://localhost:3000/signup');

    // Enter valid registration information
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#username').type('johndoe@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');

    // Click the sign-up button with wait
    cy.get('[data-testid="signup-submit"]').should('be.visible').click();

    // Verify that the registration has succeeded and a success message is displayed
    cy.get('[data-testid="successMessage"]').should('contain', 'Registration successful');
  });

  it('should not allow users to register with an invalid email format', () => {
    // Visit the registration page
    cy.visit('http://localhost:3000/signup');

    // Enter invalid email format
    cy.get('#firstName').type('Jane');
    cy.get('#lastName').type('Doe');
    cy.get('#username').type('johndoe@@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');

    // Click the sign-up button with wait
    cy.get('[data-testid="signup-submit"]').should('be.visible').click();

    // Verify that the registration has failed and an error message is displayed
    cy.get('[data-testid="emailError"]').should('contain', 'Invalid email format');
  });

  it('should not allow users to register with mismatched passwords', () => {
    // Visit the registration page
    cy.visit('http://localhost:3000/signup');

    // Enter mismatched passwords
    cy.get('#firstName').type('Peter');
    cy.get('#lastName').type('Jones');
    cy.get('#username').type('peterjones@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password456');

    // Click the sign-up button with wait
    cy.get('[data-testid="signup-submit"]').should('be.visible').click();

    // Verify that the registration has failed and an error message is displayed
    cy.get('[data-testid="passwordError"]').should('contain', 'Passwords must match');
  });
});
