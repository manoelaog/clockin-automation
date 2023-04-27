#language: pt
@login
Funcionalidade: Login no Backoffice
    Eu, como usuário, quero testar o login e reset de senha do backoffice.

    Contexto: 
        Dado que eu acesso o backoffice

    Cenario: Verifica login invalido
        Quando digito um email invalido
        Então devo visualizar mensagem de login incorreto 
        
    Cenario: Verifica senha invalido
        Quando digito uma senha invalida
        Então devo visualizar mensagem de senha incorreta

    Cenario: Verifica ambiente invalido
        Quando digito um ambiente incorreto
        Então devo visualizar mensagem de ambiente nao encontrado 

    Cenario: Verifica organizacão invalida
        Quando digito uma organizacao invalida
        Então devo visualizar mensagem de organizacao invalida

    Cenario: Verifica esqueci minha senha com email aleatório
        Quando clico em esqueci minha senha e digito email aleatorio
        Então devo visualizar mensagem de email incorreta, tente novamente

    Cenario: Verifica esqueci minha senha com email invalido
        Quando clico em esqueci minha senha e digito email invalido
        Então devo visualizar mensagem de email invalido

    Cenario: Verifica esqueci minha senha com email valido
        Quando clico em esqueci minha senha e digito email valido
        Então devo visualizar mensagem de instrucoes no email