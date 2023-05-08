#language: pt
@empresas
Funcionalidade: Validar a aba empresas
    Eu, como usuário, testar todas as funcionalidade das empresas no BO.

    Contexto:
        Dado que eu estou logado no backoffice
        E acesso o menu de "Empresas"

    Cenario: CT001 - Cadastrar nova empresa no Backoffice
        Quando cadastro nova empresa com todos os campos preenchidos corretamente
        E pesquiso a empresa cadastrada
        Então devo visualizar a empresa cadastrada na lista de empresas
        
    Cenario: CT002 - Excluir empresa no Backoffice (quando não há vínculos)
        Quando pesquiso a empresa cadastrada 
        E seleciono e clico em excluir
        Então a mensagem "Registro excluidos com sucesso" é exibida