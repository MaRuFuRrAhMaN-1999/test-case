describe('Error Handling Test Suite', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('Should display a validation error for required fields', () => {
    cy.get('#submitButton').click();

    cy.get('.error-message').should('be.visible').and('contain', 'Please fill in the required fields.');
  });

  it('Should handle authentication errors gracefully', () => {
    cy.visit('/secure-page');

    cy.url().should('include', '/login');
    cy.get('.error-message').should('be.visible').and('contain', 'Please log in to access this page.');
  });

  it('Should handle timeouts for critical operations', () => {
    cy.intercept('GET', '/slow-resource', { delay: 10000 }).as('slowRequest');
    cy.visit('/page-with-slow-resource');

    cy.wait('@slowRequest', { timeout: 5000 }).its('timedOut').should('be.true');
    cy.get('.error-message').should('be.visible').and('contain', 'The operation timed out. Please try again.');
  });

  it('Should handle unexpected JavaScript errors', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Unexpected JavaScript error');
      return false;
    });

    cy.get('#triggerJavascriptErrorButton').click();

    cy.get('.error-message').should('be.visible').and('contain', 'An unexpected error occurred. Please try again later.');
  });

  it('Should gracefully handle 403 Forbidden errors', () => {
    cy.intercept('GET', '/restricted-resource', { statusCode: 403 }).as('forbiddenRequest');
    cy.visit('/restricted-resource');

    cy.wait('@forbiddenRequest').its('status').should('eq', 403);
    cy.url().should('include', '/forbidden');
    cy.get('.error-message').should('be.visible').and('contain', 'You do not have permission to access this resource.');
  });

  it('Should handle 404 Not Found errors gracefully', () => {
      cy.request({ url: '/non-existent-page', failOnStatusCode: false }).as('404Request');
  
      cy.wait('@404Request').its('status').should('eq', 404);
      cy.url().should('include', '/error404');
      cy.get('.error-message').should('be.visible').and('contain', 'The page you are looking for does not exist.');
    });
  
    it('Should display a generic error message for unexpected server errors', () => {
      cy.intercept('GET', '/unexpected-error', { statusCode: 500 }).as('unexpectedError');
      cy.visit('/unexpected-error');
  
      cy.wait('@unexpectedError').its('status').should('eq', 500);
      cy.get('.error-message').should('be.visible').and('contain', 'An unexpected server error occurred. Please try again later.');
    });
  
    it('Should handle form submission errors and display appropriate messages', () => {
      cy.get('#invalidDataForm').submit();
  
      cy.get('.error-message').should('be.visible').and('contain', 'There were errors in your submission. Please review and correct them.');
    });
  
    it('Should gracefully handle connection errors to external services', () => {
      cy.intercept('GET', 'https://external-service.com/api/data', { forceNetworkError: true }).as('externalServiceError');
      cy.visit('/page-with-external-service');
  
      cy.wait('@externalServiceError');
      cy.get('.error-message').should('be.visible').and('contain', 'Unable to connect to the external service. Please try again later.');
    });  });
