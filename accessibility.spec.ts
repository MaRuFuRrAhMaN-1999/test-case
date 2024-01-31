describe('Accessibility Test Suite', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('Should have a descriptive page title', () => {
    cy.title().should('not.be.empty');
  });

  it('Should have sufficient color contrast', () => {
    cy.get('button, a, [role="button"]').each(($element) => {
      cy.checkColorContrast($element);
    });
  });

  it('Should have meaningful alt text for images', () => {
    cy.get('img').each(($img) => {
      cy.get($img).should('have.attr', 'alt').should('not.be.empty');
    });
  });

  it('Should have a logical tab order', () => {
    cy.checkTabOrder();
  });

  it('Should be navigable with keyboard only', () => {
    cy.checkKeyboardNavigation();
  });

  it('Should have proper ARIA attributes', () => {
    cy.get('[role="button"], [role="link"], [aria-label], [aria-labelledby], [aria-describedby]').each(($element) => {
      cy.get($element).should('have.attr', 'aria-*').should('not.be.empty');
    });
  });

  it('Should have a skip to content link', () => {
    cy.get('a[href="#content"]').should('exist');
  });

});
