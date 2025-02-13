describe('Formulário de Cadastro', () => {
    beforeEach(() => {
      cy.visit('https://jsonplaceholder.typicode.com/users');
    });
  
    it('Deve exibir mensagem de sucesso ao enviar formulário corretamente', () => {
      cy.get('#nome').type('Usuário Teste');
      cy.get('#email').type('usuario@teste.com');
      cy.get('#confirmacaoEmail').type('usuario@teste.com');
      cy.get('#senha').type('SenhaForte1');
      cy.get('#submit').click();
      cy.contains('Cadastro realizado com sucesso').should('be.visible');
    });
  
    it('Deve exibir mensagens de erro ao enviar formulário com campos obrigatórios vazios', () => {
      cy.get('#submit').click();
      cy.contains('Campo obrigatório').should('be.visible');
    });
  
    it('Deve exibir erro de validação para senha fraca', () => {
      cy.get('#senha').type('12345');
      cy.get('#submit').click();
      cy.contains('Senha fraca').should('be.visible');
    });
  
    it('Deve exibir erro ao digitar e-mails diferentes', () => {
      cy.get('#email').type('usuario@teste.com');
      cy.get('#confirmacaoEmail').type('diferente@teste.com');
      cy.get('#submit').click();
      cy.contains('Os e-mails não coincidem').should('be.visible');
    });
  });
  