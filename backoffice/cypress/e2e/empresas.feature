#language: pt
@empresa
Funcionalidade: Validar a aba empresas
    Eu, como usuário, testar todas as funcionalidade das empresas no BO.

    Contexto:
        Dado que eu estou logado no backoffice
        E acesso o menu de "Empresas"

    Cenario: CT001 - Cadastrar nova empresa no Backoffice
        Quando cadastro nova empresa com todos os campos preenchidos corretamente
        E pesquiso a empresa cadastrada
        Então devo visualizar a empresa cadastrada na lista de empresas
        