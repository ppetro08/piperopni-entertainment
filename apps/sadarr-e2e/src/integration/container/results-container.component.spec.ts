describe('sadarr', () => {
  beforeEach(() => cy.visit('/iframe.html?id=resultscontainercomponent--primary&args=data;showNoResultsFound;profiles;'));
  it('should render the component', () => {
    cy.get('pip-results-container').should('exist');
  });
});