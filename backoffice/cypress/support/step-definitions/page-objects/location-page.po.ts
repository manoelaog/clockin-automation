import { LocationSelectors } from './generic-po/selectors/location.selectors';
import { Selectors } from './generic-po/selectors/utils.selectors';

export class Locations {
  private locationId: string = '';
  private description: string = '';
  private address_1: string = '';
  private address_2: string = '';

  loadFixture(): void {
    cy.fixture('localizacoes').then(fixture => {
      this.locationId = fixture.codigo;
      this.description = fixture.descricao;
      this.address_1 = fixture.endereco_1;
      this.address_2 = fixture.endereco_2;
    });
  }

  changeCompany(): void {
    cy.get(Selectors.tableContainer)
      .contains(Selectors.tr, this.description)
      .then((row: any) => {
        const children = row[0].children;
        cy.get(Selectors.overlay).should('not.exist');
        cy.get(children[5]).click();
      });
  }

  createNewLocation(): void {
    cy.get(Selectors.buttonAdd).click();
    cy.get(LocationSelectors.locationId).type(this.locationId);
    cy.get(LocationSelectors.locationDescription).type(this.description);
    cy.get(LocationSelectors.timezone).click();
    cy.contains(LocationSelectors.timeZoneItem, 'America/Sao_Paulo').click();
    cy.get(LocationSelectors.locationAddress).type(this.address_1).wait(500);
    cy.contains('Brasil').click();
    cy.get(LocationSelectors.addressRadius).type('500');
    cy.get(Selectors.buttonSave).click();
    cy.get(Selectors.modalAdd).should('not.exist');
  }

  changeLocation(): void {
    cy.get(LocationSelectors.locationAddress).clear();
    cy.get(LocationSelectors.locationAddress).first().type(this.address_2).wait(500);
    cy.contains('SP').click();
    cy.get(LocationSelectors.addressRadius).first().type('500');
    cy.get(Selectors.buttonSave).click();
    cy.get(Selectors.modalAdd).should('not.exist');
  }

  deleteLocation(): void {
    cy.get(Selectors.overlay).should('not.exist');
    cy.get(Selectors.tableContainer)
      .contains(Selectors.tr, this.description)
      .then((row: any) => {
        const children = row[0].children;
        cy.get(children[0]).click();
        cy.intercept('DELETE', '**api/v1/entities/templates/**/goldenRecords/**').as('deleteLocation');
        cy.get(LocationSelectors.buttonDeleteLocation).contains('Remover').click();
        cy.wait('@deleteLocation');
        this.clearSearch();
      });
    cy.get(Selectors.overlay).should('not.exist');
  }

  searchLocation(): void {
    cy.get(Selectors.simpleFilter).type(this.description);
    cy.get(Selectors.buttonSearch).click();
  }

  clearSearch(): void {
    cy.get(Selectors.simpleFilter).clear();
    cy.get(Selectors.buttonSearch).click();
  }

  locationIsDisplayed(description: string): void {
    cy.get(Selectors.overlay).should('not.exist');
    cy.get(Selectors.tableContainer)
      .contains(Selectors.td, description)
      .should('be.visible');
  }
  
  locationIsNotDisplayed(): void {
    cy.get(Selectors.overlay).should('not.exist');
    cy.get(Selectors.tableContainer)
      .contains(Selectors.td, 'Nenhum dado encontrado')
      .should('be.visible');
  }
}
