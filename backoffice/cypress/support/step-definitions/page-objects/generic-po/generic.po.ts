import { Selectors } from './selectors/utils.selectors';

export class Generic {
  url: string = Cypress.config('baseUrl');

  navigateToBackoffice(): void {
    cy.visit(this.url);
  }

  doLogin(): void {
    cy.intercept('POST', '**/api/v1/queries/filter**').as('postQuerie');
    cy.get(Selectors.email).type(Cypress.env('email'));
    cy.get(Selectors.password).type(Cypress.env('password'), { log: false });
    cy.get(Selectors.buttonLogin).click();
    cy.wait('@postQuerie');
  }

  clickOnMenu(menuName: string): void {
    cy.get(Selectors.menuIcon).contains(menuName).click({ force: true });
  }

  successMessageIsDisplayed(message: string): void {
    cy.contains(Selectors.toaster, message).should('be.visible');
  }
}
