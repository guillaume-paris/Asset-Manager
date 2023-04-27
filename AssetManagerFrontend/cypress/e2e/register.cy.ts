describe('Register Modal', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/')
  });

  it('should display the register modal when clicking on the Register button', () => {
    cy.contains('Account').click();
    cy.contains('Register').click();
    cy.get('.modal-dialog').should('be.visible');
    cy.get('.modal-title').should('contain', 'Register');
    cy.get('form').should('be.visible');
  });

  it('should be able to click on the register button', () => {
    cy.contains('Account').click();
    cy.contains('Register').click();
    cy.get('[formControlName="username"]').type('invalidUserName');
    cy.get('[formControlName="email"]').type('invalidEmail@gmail.com');
    cy.get('[formControlName="password"]').type('invalidpassword');
    cy.get('[formControlName="confirmPassword"]').type('invalidpassword');
    cy.get('.btn-primary').click();
  });

  it('should notify that the confirm password is not matching with the original one', () => {
    cy.contains('Account').click();
    cy.contains('Register').click();
    cy.get('[formControlName="password"]').type('invalidpassword');
    cy.get('[formControlName="confirmPassword"]').type('invalidpasswordnotthesame');
    cy.get('[formControlName="username"]').type(' ');
    cy.contains('Please enter the same password')    
  });

  it('should notify that the email adress is not valid', () => {
    cy.contains('Account').click();
    cy.contains('Register').click();
    cy.get('[formControlName="email"]').type('invalidEmail');
    cy.get('[formControlName="password"]').type(' ');
    cy.contains('Please enter a valid email adress')    
  });
});
