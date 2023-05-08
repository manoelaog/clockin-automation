#language: pt
@localizacao
Funcionalidade: Localizações
        Eu, como usuário, quero testar todas as funcionalidade das localizações no Backoffice.

    Contexto:
        Dado que eu estou logado no backoffice
        E acesso o menu de "Localizações"

    Cenario: CT001 - Cadastrar nova localização
        Quando cadastro nova localizacao com todos os campos preenchidos corretamente
        E pesquiso a localização cadastrada
        Então devo visualizar a localizacao cadastrada na lista de localizacoes

    Cenario: CT002 - Pesquisar localização
        Quando pesquiso a localização cadastrada
        Então devo visualizar a localizacao cadastrada na lista de localizacoes

    Cenario: CT003 - Editar localização
        Quando localizo minha localização cadastrada, clico em editar
        E edito minha localização
        Então devo visualizar a localizacao atualizada na lista de localizacoes

    Cenario: CT004 - Excluir localização
        Quando pesquiso a localização cadastrada
        E seleciono minha localização cadastrada, clico em remover
        Então a mensagem "Registro excluidos com sucesso" é exibida