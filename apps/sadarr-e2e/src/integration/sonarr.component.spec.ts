describe('sadarr', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sonarrcomponent--primary'));
  it('should render the component', () => {
    cy.get('pip-sonarr').should('exist');
  });
});