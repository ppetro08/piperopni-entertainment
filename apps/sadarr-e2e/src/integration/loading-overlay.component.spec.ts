describe('sadarr', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=loadingoverlaycomponent--primary&args=diameter:35;show:false;strokeWidth:4;'
    )
  );
  it('should render the component', () => {
    cy.get('pip-loading-overlay').should('exist');
  });
});
