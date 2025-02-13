/// <reference types="cypress"/>

describe('Cadastro de Usuário', () => {
    beforeEach(() => {
        cy.wait(2000)
        cy.visit('https://www.guiademoteis.com.br/usuario/cadastro')
    })
  
    it('Exibir ensagem de sucesso ao efetuar o cadastro de usuário corretamente', () => {
        cy.get('#Nome').type('Usuário Teste')
        cy.get('#sexo-Masculino').click()
        cy.get('#DataNascimento').type('01012000')
        cy.get('#Cep').type('12345-678')
        cy.get('#Email').type('usuario2@teste2.com')
        cy.get('#ConfEmail').type('usuario2@teste2.com')
        cy.get('#Senha').type('SenhaForte1')
        cy.get('#checkbox-privacy').click()
        cy.get('.btCadastrar').click()
        cy.contains('Tudo Ok! Seu cadastro VIP Guia de Motéis foi concluido com sucesso.').should('be.visible')
    })
  
    it('Exibir mensagens de erro ao enviar formulário com campos obrigatórios vazios', () => {
        cy.get('.btCadastrar').click()
        cy.get('#qtip-1-content > .error').contains('Campo nome obrigatório!').should('be.visible')
        cy.get('#qtip-0-content').contains('Campo sexo obrigatório!').should('be.visible')
        cy.get('#qtip-2-content > .error').contains('Campo Data Nascimento obrigatório!').should('be.visible')
        cy.get('#qtip-3-content > .error').contains('Campo CEP obrigatório!').should('be.visible')
        cy.get('#qtip-4-content > .error').contains('Campo email obrigatório!').should('be.visible')
        cy.get('#qtip-5-content > .error').contains('Campo Conf. de Senha obrigatório!').should('be.visible') // Esse alerta está com a descrição errada
        cy.get('#qtip-6-content > .error').contains('Campo senha obrigatório!').should('be.visible')
        cy.get('#qtip-7-content > .error').contains('É preciso concordar com os termos de uso').should('be.visible')
    })
  
    it('Exibir erro de validação para senha fraca', () => {
        cy.get('#Nome').type('Usuário Teste')
        cy.get('#sexo-Masculino').click()
        cy.get('#DataNascimento').type('01012000')
        cy.get('#Cep').type('12345-678')
        cy.get('#Email').type('usuario1@teste.com')
        cy.get('#ConfEmail').type('usuario1@teste.com')
        cy.get('#Senha').type('123')
        cy.get('#checkbox-privacy').click()
        cy.get('.btCadastrar').click()
        cy.contains('Senha deve ter 4 ou mais caracteres.').should('be.visible')
        //cy.contains('A senha deve ter mínimo 8 caracteres, 1 letra maiúscula e 1 número.').should('be.visible')
    })
  
    it('Exibir erro ao digitar e-mails diferentes', () => {
        cy.get('#Nome').type('Usuário Teste')
        cy.get('#sexo-Masculino').click()
        cy.get('#DataNascimento').type('01012000')
        cy.get('#Cep').type('12345-678')
        cy.get('#Email').type('usuario1@teste.com')
        cy.get('#ConfEmail').type('usuario1@teste1.com')
        cy.get('#Senha').type('123456')
        cy.get('#checkbox-privacy').click()
        cy.get('.btCadastrar').click()
        cy.get('#qtip-0-content > .error').contains('O campo confirmação de email deve ser identico ao campo email.').should('be.visible')
    })
})
  