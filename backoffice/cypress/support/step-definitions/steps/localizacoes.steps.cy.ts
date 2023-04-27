import { Localizacoes } from '../page-objects/localizacoes-pagina.po';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const localizacoes = new Localizacoes();

before(() => {
  localizacoes.carregarFixture();
});

Given('acesso a area de localizacoes', function () {
  localizacoes.acessarLocalizacoes();
});

When('cadastro nova localizacao com todos os campos preenchidos corretamente', function () {
  localizacoes.cadastrarLocalizacaoComTodosCamposPreenchidos();
});

When('localizo minha localização cadastrada, clico em editar', function () {
  localizacoes.localizarLocalizacaoCadastradaEditar();
});

When('edito minha localização', function () {
  localizacoes.editarLocalizacao();
});

When('seleciono minha localização cadastrada, clico em remover', function () {
  localizacoes.removerLocalizacao();
});

When('pesquiso a localização cadastrada', function () {
  localizacoes.pesquisarPorLocalizacao();
});

Then('devo visualizar a localizacao cadastrada na lista de localizacoes', function () {
  localizacoes.visualizarLocalizacaoCadastrada();
});

Then('devo visualizar a localizacao atualizada na lista de localizacoes', function () {
  localizacoes.visualizarLocalizacaoAtualizada();
});

Then('não devo visualizar a localizacao na lista de localizacoes', function () {
  localizacoes.naoDevoVisualizarLocalizacao();
});
