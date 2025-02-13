# Testes_Cypress_K6_Postman
Testes Automatizados com Cypress, K6 e Postman


---------------------------------------------------------------------------------
1. Instalando Node.jse npm:

> 1.1. Baixe e instale o Node.jsa partir do site oficial: Node.js.

> 1.2. Verifique se o Node.jse o npm estão instalados corretamente:

node -v
npm -v


---------------------------------------------------------------------------------
2. Configurando o Projeto para Testes de UI com Cypress:

> 2.1. Abra o VSCode e abra a pasta onde você deseja criar seu projeto (vá em File > Open Folder).

> 2.2. No terminal do VSCode (Terminal > New Terminal), rode os seguintes comandos para configurar o projeto:

mkdir cypress-test
cd cypress-test
npm init -y
npm install cypress --save-dev
npx cypress open


> 2.3. Isso abrirá a interface do Cypress. Feche a interface do Cypress para continuar configurando os arquivos de teste.

> 2.4. Crie a estrutura de pastas e arquivos:

cypress-test/
│
└── cypress/
    └── e2e/
        └── cadastroUsuario.cy.js


> 2.5. Arquivo de Testes: cadastroUsuario.cy.js.

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


---------------------------------------------------------------------------------
3. Configurando o Projeto para Testes de API com Postman:

> 3.1. No Postman importe /Postman/TestesPostman.json e rode os testes.


---------------------------------------------------------------------------------
4. Configurando o Projeto para Testes de Performance com K6:

> 4.1. Certifique-se de ter o K6 instalado:

npm install -g k6


> 4.2. No VSCode, crie um arquivo chamado loadTest.js na pasta raiz do projeto.


> 4.3. Código para o arquivo loadTest.js - Este teste simula 100 usuários acessando a API simultaneamente durante 30 segundos e verifica o status da resposta e o tempo de resposta:

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // 100 usuários simultâneos em 30 segundos
  ],
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/users');
  check(res, {
    'Status 200': (r) => r.status === 200,
    'Tempo de resposta menor que 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}


> 4.3. Comando para rodar o arquivo de teste com o K6 no VS Code:

k6 run loadTest.js


---------------------------------------------------------------------------------
