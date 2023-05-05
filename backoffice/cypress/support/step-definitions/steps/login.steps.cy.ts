import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { Login } from '../page-objects/login-page.po';

const login = new Login();

When('digito um email invalido', function () {
  login.doLogin(Cypress.env('emailFake'), Cypress.env('password'));
  login.clickOnLoginButton();
});

When('digito uma senha invalida', function () {
  login.doLogin(Cypress.env('email'), '123456789');
  login.clickOnLoginButton();
});

When('digito um ambiente incorreto', function () {
  login.setTenant('clockinBeta');
});

When('digito uma organizacao invalida', function () {
  login.setOrganization('clockinBeta');
});

When('clico em esqueci minha senha', function () {
  login.clickOnForgotPassword();
});

When('digito email aleatorio', function () {
  login.setEmail(Cypress.env('emailFake'));
  login.clickOnLoginButton();
});

When('digito email invalido', function () {
  login.setEmail('clockin');
});

When('digito email valido', function () {
  login.setEmail(Cypress.env('email'));
  login.clickOnLoginButton();
});

Then('devo visualizar mensagem {string}', function (text: string) {
  login.instructionsMessageIsDisplayed(text);
});

Then('a mensagem de erro {string} é exibida', function (errorMessage: string) {
  login.errorMessageIsDisplayed(errorMessage);
});
