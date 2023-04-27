describe('Login Modal', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/')
  });

  it('should display the login modal when clicking on the login button', () => {
    cy.contains('Account').click();
    cy.contains('Login').click();
    cy.get('.modal-dialog').should('be.visible');
    cy.get('.modal-title').should('contain', 'Login');
    cy.get('form').should('be.visible');
  });

  it('should display error toast notification when login button is clicked and backend is not started', () => {
    cy.contains('Account').click();
    cy.contains('Login').click();
    cy.get('[formControlName="usernameEmail"]').type('invaliduser');
    cy.get('[formControlName="password"]').type('invalidpassword');
    cy.intercept('POST', 'http://localhost:61150/api/UserAccounts/login', (req) => {
      req.on('response', (res) => {
        if (res.statusCode == 500) {
          cy.get('.text-danger').should('contain', 'Incorrect password or the user account does not exist.');
        }
      });
    });
    cy.get('.btn-primary').click();
  });
  
  it('should display an error message if the user enters an incorrect username or password', () => {
    cy.contains('Account').click();
    cy.contains('Login').click();
    cy.get('[formControlName="usernameEmail"]').type('invaliduser');
    cy.get('[formControlName="password"]').type('invalidpassword');
    cy.intercept('POST', 'http://localhost:61150/api/UserAccounts/login', (req) => {
      req.on('response', (res) => {
        if (res.statusCode == 404) {
          cy.get('.text-danger').should('contain', 'Incorrect password or the user account does not exist.');
        }
      });
    });
    cy.get('.btn-primary').click();
  });
});
