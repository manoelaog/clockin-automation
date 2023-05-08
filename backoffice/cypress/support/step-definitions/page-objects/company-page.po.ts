import { CompanySelectors } from './generic-po/selectors/company.selectors';
import { Selectors } from './generic-po/selectors/utils.selectors';

export class Companies {
  private companyId: string = '';
  private companyName: string = '';
  private cnpj: string = '';
  private ceicno: string = '';
  private companyAddress: string = '';

  timeOut: number = 30000;

  loadFixture(): void {
    cy.fixture('empresas').then((fixture) => {
      this.companyId = fixture.codigo;
      this.companyName = fixture.nome;
      this.cnpj = fixture.cnpj;
      this.ceicno = fixture.ceicno;
      this.companyAddress = fixture.endereco;
    });
  }

  createNewCompany(): void {
    cy.get(Selectors.buttonAdd).click();
    cy.get(CompanySelectors.companyId).type(this.companyId);
    cy.get(CompanySelectors.name).type(this.companyName);
    cy.get(CompanySelectors.cnpj).type(this.cnpj);
    cy.get(CompanySelectors.ceicno).type(this.ceicno);
    cy.get(CompanySelectors.companyAddress).type(this.companyAddress).wait(500);
    cy.contains(Selectors.googleAddress, 'Brasil').click();
    cy.get(Selectors.buttonSave).click();
    cy.contains(Selectors.toaster, 'Registro criado com sucesso').should(
      'be.visible'
    );
  }

  searchCompany(): void {
    cy.get(Selectors.simpleFilter).clear();
    cy.get(Selectors.simpleFilter).type(this.companyName);
    cy.get(Selectors.buttonSearch).click();
  }

  companyIsDisplayed(): void {
    cy.get(Selectors.overlay).should('not.exist');
    cy.get(Selectors.tableContainer)
      .contains(Selectors.td, this.companyName)
      .should('be.visible');
  }

  deleteCompany(): void {
    cy.get(Selectors.overlay).should('not.exist');
    cy.get(Selectors.tableContainer)
      .contains(Selectors.tr, this.companyName)
      .then((row: any) => {
        const children = row[0].children;
        cy.get(children[0]).click();
        cy.intercept(
          'DELETE',
          '**api/v1/entities/templates/**/goldenRecords/**'
        ).as('deleteCompany');
        cy.get(Selectors.buttonDelete).click();
        cy.wait('@deleteCompany');
      });
  }
}
