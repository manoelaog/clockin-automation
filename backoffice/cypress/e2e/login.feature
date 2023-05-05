#language: pt
@login
Funcionalidade: Login no Backoffice
    Eu, como usuário, quero testar o login e reset de senha do backoffice.

    Contexto: 
        Dado que eu acesso o backoffice

    Cenario: CT001 - Verifica login inválido
        Quando digito um email invalido
        Então a mensagem de erro "Incorrect login was used." é exibida
        
    Cenario: CT002 - Verifica senha inválida
        Quando digito uma senha invalida
        Então a mensagem de erro "Incorrect password was used" é exibida

    Cenario: CT003 - Verifica ambiente inválido
        Quando digito um ambiente incorreto
        Então a mensagem de erro "Tenant not found" é exibida

    Cenario: CT004 - Verifica organizacão invalida
        Quando digito uma organizacao invalida
        Então a mensagem de erro "Invalid organization, please try again." é exibida

    Cenario: CT005 - Verifica esqueci minha senha com email aleatório
        Quando clico em esqueci minha senha 
        E digito email aleatorio
        Então a mensagem de erro "Invalid email account, please try again." é exibida

    Cenario: CT006 - Verifica esqueci minha senha com email inválido
        Quando clico em esqueci minha senha 
        E digito email invalido
        Então a mensagem de erro "Invalid Email" é exibida

    Cenario: CT007 - Verifica esqueci minha senha com email válido
        Quando clico em esqueci minha senha 
        E digito email valido
        Então devo visualizar mensagem "An email with instructions to reset your password has been sent to"