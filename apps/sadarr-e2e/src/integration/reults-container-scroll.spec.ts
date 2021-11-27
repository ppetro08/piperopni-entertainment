describe('results container scroll', () => {
  it('radarr - scroll to top when user searches again', () => {
    cy.visit('/radarr');
    cy.get('.radarr-search').type('batman');
    cy.get('.radarr-results-container .cdk-virtual-scroll-viewport').scrollTo(
      0,
      2000
    );

    cy.get('.radarr-search').type('{selectall}dark knight');
    cy.get('.radarr-results-container .cdk-virtual-scroll-viewport');
  });

  it('sonar scroll to top when user searches again', () => {
    cy.visit('/sonarr');
    cy.get('.sonarr-search').type('the blacklist');
    cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport').scrollTo(
      0,
      2000
    );

    cy.get('.sonarr-search').type('{selectall}the blacklist');
    cy.get('.sonarr-results-container .cdk-virtual-scroll-viewport');
  });
});
