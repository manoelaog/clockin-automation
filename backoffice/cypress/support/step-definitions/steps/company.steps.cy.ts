import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { Companies } from '../page-objects/company-page.po';

const company = new Companies();

before(() => {
  company.loadFixture();
});

When('cadastro nova empresa com todos os campos preenchidos corretamente', function () {
  company.createNewCompany();
});

When('pesquiso a empresa cadastrada', function () {
  company.searchCompany();
});

Then('devo visualizar a empresa cadastrada na lista de empresas', function () {
  company.companyIsDisplayed();
});
