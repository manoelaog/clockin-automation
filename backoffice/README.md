# Automação de testes E2E: CLOCK-IN BACKOFFICE

## Conteúdo

- [Preparação do ambiente](#environment)
- [Estruturação das pastas](#folders)
- [Criando um teste](#test-development)
  - [Feature](#feature)
  - [Step](#step)
  - [Page object](#page-object)
- [Execução](#test-execution)
- [Links Úteis](#utilities)

---

<a id="environment"></a>

## Preparação do ambiente

---

1. Verifique se todas as dependências estão instaladas.
   > `npm install`

2. Os testes são executados de forma independente da aplicação. Certifique-se que o ambiente esteja rodando.

---

<a id="folders"></a>

## Estruturação das pastas

---

Os testes estão separados por menu, assim, para cada menu do Backoffice que automatizarmos, teremos pelo menos 3 arquivos: _feature, step e page-object_. 

Estes arquivos estão organizados da seguinte forma:

**cypress/**

- **e2e**: Devem estar os arquivos com a descrição dos cenários em BDD (features). É aconselhável que tenha pelo menos um arquivo por funcionalidade. Extensão dos arquivos: '.feature'.
- **support/step-definitions/steps**: São os arquivos que vão implementar os testes descritos nas features. Cada passo do BDD será uma função neste arquivo. Passos iguais não precisam ser implementados duas vezes e, caso sejam usados em muitas features (Ex. login), pode deixá-lo como um passo genérico. Extensão dos arquivos: '.steps.cy.ts'.
- **support/step-definitions/page-objects**: Para ajudar na manutenção dos testes, as interações com a tela são feitos por métodos nesses arquivos. Os steps (implementação dos testes) irão consumir estes métodos. Também é recomendável que não tenham métodos repetidos em muitos arquivos, pois caso necessite alterá-los futuramente, a manutenção será mais rápida. Extensão dos arquivos: '.po.ts'.


Já os relatórios gerados ao final da execução, possuem a seguinte estrutura:

**cypress/**

- **report/html**: Após a execução dos testes será gerado um relatório em html com o resultado das execuções.
- **report/json**: Durante as execuções, um json será alimentado com os dados dos testes para que o relatório html possa ser gerado.
- **report/utils**: Os arquivos de configuração do relatório estão armazenados nesta pasta. Estes arquivos são fixos e não devem ser apagados.


---

<a id="test-development"></a>

## Criando um teste

---

<a id="#feature"></a>

### **Feature**

O primeiro arquivo que deve ser criado é a feature. Ela deve conter uma breve descrição da funcionalidade e os cenários que serão automatizados, em BDD. Se atentem para steps mais genéricos, para que eles possam ser reutilizados, quando necessário.

```feature
Funcionalidade: Pagamento
        Eu, como usuário, quero consultar os holerites e seus detalhes quando acessar a página de pagamento.

    Cenário: CT001 - Visualização geral dos holerites
        Dado que eu estou logado no meu RH
        Quando clico no menu "Pagamento,Envelope de Pagamento"
        Então são exibidos os holerites com os respectivos valores e data de pagamento
```

Ao descrever um cenário na feature, é possível 'marcar' o teste para que ele seja executado individualmente (ou para que não seja executado), com uma tag.

```feature
@wip
Cenário: CT005 - A página é redirecionada para a Gestão de Times ao clicar em ver mais no card de Férias
```


<a id="step"></a>

### **Step**

Neste arquivo serão implementados os testes utilizando as funções _Given, When, Then_, correspondendo aos passos descritos no arquivo de feature, sendo que (geralmente):

| Function | Passo correspondente | Observação                                                                                                  |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Given            | Dado                 | É executada a pré-condição do teste. Ex.: login                                                             |
| When             | Quando               | Uma ação relacionada a funcionalidade é executada. Ex.: clique em um botão, preenchimento de um formulário. |
| Then             | Então                | Validação do resultado da ação realizada.  


Observação: Nas features é possível utilizar a palavra reservada `E`, para que o cenário fique mais legível, neste caso, a função implementada será a mesmo ao qual o `E` se refere. Exemplo:


```feature
# arquivo.feature

    Cenário: Excluir cadastro

        Dado que acesso a url
        E faço o login
        Quando acesso à página de cadastro
        E clico em excluir
        Entao a mensagem de sucesso é exibida
        E o cadastro não é mais exibido
```

Neste exemplo, o `E` é inserido para que a descrição seja mais fluída, porém, ao criar o step que implementará esse passo, a função utilizada deve ser `Given/When/Then`. Por exemplo:

```ts
// arquivo.steps.cy.ts

    Given('que acesso a url', function() {});
    Given('faço o login', function() {});

    When('acesso à página de cadastro', function() {});
    When('clico em excluir', function() {});

    Then('a mensagem de sucesso é exibida', function() {});
    Then('o cadastro não é mais exibido', function() {});
```

Todos os cenários o passo "Então/Then" deve validar o resultado da ação feita anteriormente. Para isso o Cypress disponibiliza duas opções: 

_`Chai`_ : Integrado ao cypress, basta utilizá-lo nas comparações, sem qualquer importação:

```ts
    Then('a página Localizações é exibida', function () {
        generic.getPageTitle().then(pageTitle => {
            expect(pageTitle).to.be.equal(pageName);
        });
    });
```

_`Should`_ : É utilizado "encadeado" às funções do cypress:

```ts
    Then('a página Localizações é exibida', function () {
        generic.getPageTitle().should('have.text', pageName);
    });
```

Os steps também podem receber parâmetros vindos das features, evitando que tenha repetições de código.
Exemplo: 


```feature 
# arquivo.feature

Cenário: CT001 - Exibição da página Empresas
    Dado que eu estou logada
    Quando clico no menu "Empresas"
    Então a página "Empresas" é carregada

Cenário: CT002 - Exibição da página Dispositivos
    Dado que eu estou logada
    Quando clico no menu "Dispositivos"
    Então a página "Dispositivos" é carregada
```

```ts
// arquivo.steps.cy.ts

    When('clico no menu {string}', function(menuName: string) {});

    Then('a página {string} é carregada', function(pageName: string) {});
```

Dessa forma, o mesmo step pode ser executado em ambos os cenários, com a mesma implementação.

<a id="page-object"></a>

### **Page object**

Na page object iremos criar métodos para interagir com as telas do produto, e expô-los através da classe para que os testes possam acessá-los:

```ts
// arquivo.po.ts

export class GenericElements {
  private pageTitle = 'app-home h1,app-page-header h2';

  public async getPageTitle(): Cypress.Chainable<string> {
    return cy.get(this.pageTitle).invoke('text');
  }
}
```

```ts
// arquivo.step.cy.ts

import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { Generic } from '../page-objects/generic.po';

const generic = new GenericElements();

Then('a página Localizações é exibida', function (pageName: string) {
    generic.getPageTitle().then(pageTitle => {
        expect(pageTitle).to.be.equal(pageName);
    });
});
```

---

<a id="test-execution"></a>

## Execução

---

Os testes end-to-end são executados a partir de dois comandos: 
- `npx cypress open` : O cypress é aberto, e você pode escolher o browser que será executado e a feature durante a navegação. É ótimo para quando está desenvolvendo os testes pois possui a função `watch files`, ele reexecuta os testes conforme o código é alterado.
- `npx cypress run` : É executado em modo headless, ou seja, a execução será feita em memória e o browser não será aberto. É uma ótima opção para validações de teste sistêmicos e execuções em esteira.

-É possível também executar apenas um arquivo de feature, ou apenas um teste. Para isso basta incluir uma tag acima da funcionalidade/cenário e utilizá-la junto ao parâmetro, no momento da execução: `npx cypress run --env tags="@empresas" `


---

<a id="utilities"></a>

## Links Úteis

---

- [Linguagem Gherkin - BDD](https://cucumber.io/docs/gherkin/reference/)
- [De/Para Gherkin Inglês -> Português (pt)](https://cucumber.io/docs/gherkin/languages/)
- [Funções Cypress](https://docs.cypress.io/api/commands/click)
- [Validações (expect) - Chai](https://www.chaijs.com/api/bdd/)
- [Seletores CSS - básicos](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Selectors)
- [Seletores CSS - pseudo-classes](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Pseudo-classes)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)


