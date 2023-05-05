
export class Login {
  private inputEmail = '#email';
  private inputPassword = '#password';
  private buttonLogin = 'button[type="submit"]';
  private errorMessage = '.gate-error , .c-danger';
  private linkForgotPassword = '.gate-nav';
  private inputTenant = '#tenant';
  private inputOrganization = '#organization';
  private deleteOrganization = '#organization ~ div>button';
  private instructionsMessage = '.gate-field';

  doLogin(email: string, senha: string): void {
    cy.get(this.inputEmail).type(email);
    cy.get(this.inputPassword).type(senha, { log: false });
  }

  clickOnLoginButton(): void {
    cy.get(this.buttonLogin).click();
  }

  clickOnForgotPassword(): void {
    cy.get(this.linkForgotPassword).click();
  }

  setTenant(tenantName: string): void {
    cy.get(this.inputTenant).clear();
    cy.get(this.inputTenant).type(tenantName);
  }

  setOrganization(organizationName: string): void {
    cy.get(this.deleteOrganization).click();
    cy.get(this.inputOrganization).type(organizationName);
    cy.get(this.buttonLogin).click();
  }

  setEmail(email: string): void {
    cy.get(this.inputEmail).type(email);
  }

  errorMessageIsDisplayed(message: string): void {
    cy.get(this.errorMessage).should('have.text', message);
  }

  instructionsMessageIsDisplayed(text: string): void {
    cy.get(this.instructionsMessage).should('contain.text', text);
  }
}
