import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { Locations } from '../page-objects/location-page.po';

const location = new Locations();

before(() => {
  location.loadFixture();
});

When(
  'cadastro nova localizacao com todos os campos preenchidos corretamente',
  function () {
    location.createNewLocation();
  }
);

When('localizo minha localização cadastrada, clico em editar', function () {
  location.changeCompany();
});

When('edito minha localização', function () {
  location.changeLocation();
});

When('seleciono minha localização cadastrada, clico em remover', function () {
  location.deleteLocation();
});

When('pesquiso a localização cadastrada', function () {
  location.searchLocation();
});

Then(
  'devo visualizar a localizacao cadastrada na lista de localizacoes',
  function () {
    location.locationIsDisplayed('Localizações teste Kaic Cypress');
  }
);

Then(
  'devo visualizar a localizacao atualizada na lista de localizacoes',
  function () {
    location.locationIsDisplayed('Rua Manguari, Jardim Andarai');
  }
);

Then('não devo visualizar a localizacao na lista de localizacoes', function () {
  location.locationIsNotDisplayed();
});
