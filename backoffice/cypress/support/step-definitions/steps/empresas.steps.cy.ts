import { Empresas } from '../page-objects/empresas-page.po';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const empresas = new Empresas();

before(() => {
  empresas.carregarFixture();
});

Given('acesso a area de empresas', () => {
  empresas.acessarEmpresas();
});

When('cadastro nova empresa com todos os campos preenchidos corretamente', function () {
  empresas.cadastrarEmpresaComTodosCamposPreenchidos();
});

When('pesquiso a empresa cadastrada', function () {
  empresas.pesquisarPorEmpresa();
});

Then('devo visualizar a empresa cadastrada na lista de empresas', function () {
  empresas.visualizarEmpresaCadastrada();
});
