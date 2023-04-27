describe('Logout', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/')
  });

  it('should disconnect the user and won\'t show anymore user, asset and asset management page', () => {
    cy.contains('Account').click();
    cy.contains('Register').click();
    cy.get('[formControlName="username"]').type('Username01');
    cy.get('[formControlName="email"]').type('username01@gmail.com');
    cy.get('[formControlName="password"]').type('password_test');
    cy.get('[formControlName="confirmPassword"]').type('password_test');
    cy.get('.btn-primary').click();
    cy.get('.navbar-nav')
      .find('.nav-link')
      .should('have.length', 5);
    cy.contains('Username01').click();
    cy.contains('Logout').click();
    cy.get('.navbar-nav')
      .find('.nav-link')
      .should('have.length', 2);
    cy.contains('Account');
  });
});
