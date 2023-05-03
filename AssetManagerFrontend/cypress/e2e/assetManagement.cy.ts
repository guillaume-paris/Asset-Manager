describe('Logout', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/')
    cy.contains('Account').click();
    cy.contains('Register').click();
    cy.get('[formControlName="username"]').type('Username01');
    cy.get('[formControlName="email"]').type('username01@gmail.com');
    cy.get('[formControlName="password"]').type('password_test');
    cy.get('[formControlName="confirmPassword"]').type('password_test');
    cy.get('.btn-primary').click();
    cy.wait(2000);
    cy.contains('Asset management').click();
    cy.wait(2000);
  });

  it('should display asset management page', () => {
    cy.get('.table').should('be.visible');
  });
});
