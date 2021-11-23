describe('sadarr', () => {
  beforeEach(() => cy.visit('/iframe.html?id=resultsitemcomponent--primary&args=item;profiles;'));
  it('should render the component', () => {
    cy.get('pip-results-item').should('exist');
  });
});