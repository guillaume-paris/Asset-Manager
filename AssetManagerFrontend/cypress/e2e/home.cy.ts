describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/');
  });

  it('should display the navbar with the app name', () => {
    cy.get('.navbar-brand')
      .should('be.visible')
      .and('have.text', 'Asset Management Project');
  });

  it('should display the Home, User, Asset and Asset management links in the navbar', () => {
    cy.get('.navbar-nav')
      .find('.nav-link')
      .should('have.length', 2)
  });
});