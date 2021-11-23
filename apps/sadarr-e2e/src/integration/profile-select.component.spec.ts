describe('sadarr', () => {
  beforeEach(() => cy.visit('/iframe.html?id=profileselectcomponent--primary&args=profiles;disabled;required;'));
  it('should render the component', () => {
    cy.get('pip-profile-select').should('exist');
  });
});