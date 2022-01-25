import { AuthenticationResponseModel } from 'apps/sadarr/src/app/api/models/user.model';
import { ConfirmRegistration } from 'apps/sadarr/src/app/authentication/models/confirm-registration.model';

//     cy.window().its('store').invoke('dispatch', {
//       type: '[Authentication/API] Login Success',
//       authenticationResponse,
//     });

describe('authentication', () => {
  describe('login', () => {
    beforeEach(() => cy.visit('/authentication/login'));

    it('should set cookie and localstorage', () => {
      const email = 'test@test.com';
      const authenticationResponseModel: AuthenticationResponseModel = {
        email,
        firstName: 'test',
        lastName: 'test',
        userId: 1,
        token: 'testToken',
      };

      cy.get('#email input').type('test@test.com');
      cy.get('#password input').type('test');
      cy.intercept(
        'POST',
        '/api/authenticate/login',
        authenticationResponseModel
      );
      cy.get('form')
        .submit()
        .should(() => {
          expect(localStorage.getItem('currentUser')).to.not.be.null;
        });
      cy.getCookie('Bearer')
        .its('value')
        .should('equal', authenticationResponseModel.token);
    });

    describe('form validation', () => {
      it('should error on required inputs', () => {
        cy.get('#email input').focus().blur();
        cy.get('#password input').focus().blur();
        cy.get('#email').should('have.class', 'ng-invalid');
        cy.get('#password').should('have.class', 'ng-invalid');
      });

      it('should error on email', () => {
        cy.get('#email input').type('test').blur();
        cy.get('#email .mat-error').contains('Invalid email');
      });
    });
  });

  describe('register', () => {
    beforeEach(() => {
      cy.visit('/authentication/register');
    });

    it('should show thank you for registering', () => {
      cy.intercept('POST', '/api/authenticate/register', {
        message: 'User registered',
      });

      cy.get('#email input').type('test@test.com');
      cy.get('#firstName input').type('FirstName');
      cy.get('#lastName input').type('LastName');
      cy.get('#password input').type('test');
      cy.get('#confirmPassword input').type('test');

      cy.get('form').submit();

      cy.get('.authentication-body h2').contains('Thanks for registering!');
    });

    describe('form validation', () => {
      it('should error on required inputs', () => {
        cy.get('#email input').focus().blur();
        cy.get('#firstName input').focus().blur();
        cy.get('#lastName input').focus().blur();
        cy.get('#password input').focus().blur();
        cy.get('#confirmPassword input').focus().blur();

        cy.get('#email').should('have.class', 'ng-invalid');
        cy.get('#firstName').should('have.class', 'ng-invalid');
        cy.get('#lastName').should('have.class', 'ng-invalid');
        cy.get('#password').should('have.class', 'ng-invalid');
        cy.get('#confirmPassword').should('have.class', 'ng-invalid');
      });

      it('should error on email', () => {
        cy.get('#email input').type('test').blur();
        cy.get('#email .mat-error').contains('Invalid email');
      });

      it('should error on confirm password', () => {
        cy.get('#password input').type('test');
        cy.get('#confirmPassword input').type('test2').blur();
        cy.get('#confirmPassword .mat-error').contains(
          'Passwords do not match'
        );
      });
    });
  });

  describe('confirm registration', () => {
    const confirmRegistration: ConfirmRegistration = {
      token: 'testToken',
      userId: 1,
    };

    beforeEach(() => {
      cy.visit('/authentication/confirm-registration?userId=1&token=testToken');

      cy.intercept('POST', '/api/authenticate/confirmregistration', {
        message: 'Confirmed user registration',
      }).as('confirmRequest');
    });

    it('should send confirm registration request with data from url', () => {
      cy.get('button').click();
      cy.wait('@confirmRequest').then((interception) => {
        expect(interception.request.body).to.eql(confirmRegistration);
      });
    });

    it('should display registration complete view', () => {
      cy.get('button').click();
      cy.get('h1').contains('Registration Complete');
    });
  });
});
