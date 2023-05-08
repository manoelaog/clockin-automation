import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { Generic } from '../page-objects/generic-po/generic.po';

const generic = new Generic();

Given('que eu acesso o backoffice', () => {
  generic.navigateToBackoffice();
});

Given('realizo login', () => {
  generic.doLogin();
});

Given('que eu estou logado no backoffice', () => {
  generic.navigateToBackoffice();
  generic.doLogin();
});

Given('acesso o menu de {string}', function (menuName: string) {
  generic.clickOnMenu(menuName);
});
