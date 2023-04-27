import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { Generica } from '../page-objects/generic-po/generica.po';

const generica = new Generica();

Given('que eu acesso o backoffice', () => {
  generica.acessarBackoffice();
});

Given('realizo login', () => {
  generica.realizarLogin();
});

Given('que eu estou logado no backoffice', () => {
  generica.acessarBackoffice();
  generica.realizarLogin();
});

