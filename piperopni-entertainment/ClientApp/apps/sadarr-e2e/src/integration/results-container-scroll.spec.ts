import { AuthenticationResponseModel } from 'apps/sadarr/src/app/api/models/user.model';

// TODO:P - Intercept the requests and return the objects so it is no reliant on the service running

describe('results container scroll', () => {
  beforeEach(() => {
    cy.visit('/');
    // TODO:P - Move this to a shared location to be reused
    const authenticationResponseModel: AuthenticationResponseModel = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      userId: 1,
      token: 'testToken',
    };
    localStorage.setItem(
      'currentUser',
      JSON.stringify(authenticationResponseModel)
    );
  });

  it('radarr - scroll to top when user searches again', () => {
    cy.visit('/radarr');
    cy.get('.radarr-search').type('batman');

    cy.intercept('http://piperopni.ddns.net:38084/api/v3/movie/**').as(
      'movieSearch'
    );
    cy.wait('@movieSearch').its('response.statusCode').should('equal', 200);

    cy.get('.radarr-results-container .cdk-virtual-scroll-viewport').scrollTo(
      0,
      200
    );
    cy.get('.radarr-results-container .cdk-virtual-scroll-viewport')
      .invoke('prop', 'scrollTop')
      .should('equal', 200);

    cy.get('.radarr-search').type('{selectall}dark knight');
    cy.get('.radarr-results-container .cdk-virtual-scroll-viewport')
      .invoke('prop', 'scrollTop')
      .should('equal', 0);
  });

  it('sonarr scroll to top when user searches again', () => {
    cy.visit('/sonarr');
    cy.get('.sonarr-search').type('the blacklist');

    cy.intercept('http://piperopni.ddns.net:38082/api/v3/series/**').as(
      'tvShowSearch'
    );
    cy.wait('@tvShowSearch').its('response.statusCode').should('equal', 200);

    cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport').scrollTo(
      0,
      200
    );
    cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport')
      .invoke('prop', 'scrollTop')
      .should('equal', 200);

    cy.get('.sonarr-search').type('{selectall}the blacklist');
    cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport')
      .invoke('prop', 'scrollTop')
      .should('equal', 0);
  });
});
