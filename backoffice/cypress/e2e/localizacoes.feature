#language: pt
@localizacao
Funcionalidade: Localizações
        Eu, como usuário, quero testar todas as funcionalidade das localizações no Backoffice.

    Contexto:
        Dado que eu estou logado no backoffice
        E acesso a area de localizacoes

    Cenario: Cadastrar nova localização
        Quando cadastro nova localizacao com todos os campos preenchidos corretamente
        E pesquiso a localização cadastrada
        Então devo visualizar a localizacao cadastrada na lista de localizacoes

    Cenario: Pesquisar localização
        Quando pesquiso a localização cadastrada
        Então devo visualizar a localizacao cadastrada na lista de localizacoes

    Cenario: Editar localização
        Quando localizo minha localização cadastrada, clico em editar
        E edito minha localização
        Então devo visualizar a localizacao atualizada na lista de localizacoes

    Cenario: Excluir localização
        Quando pesquiso a localização cadastrada
        E seleciono minha localização cadastrada, clico em remover
        E pesquiso a localização cadastrada
        Então não devo visualizar a localizacao na lista de localizacoes