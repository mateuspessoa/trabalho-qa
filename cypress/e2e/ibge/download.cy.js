/// <reference types="cypress" />

context("Acesso ao site do IBGE", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit("https://www.ibge.gov.br/");
  });

  it('Rolar a tela até um pouco antes do elemento "Cidades e Estados"', () => {
    const offset = -100;

    cy.contains("h2", "Cidades e Estados").then(($el) => {
      cy.window().then((win) => {
        const topPosition = $el[0].getBoundingClientRect().top + win.scrollY;
        cy.scrollTo(0, topPosition + offset);
      });
    });

    cy.contains("h2", "Cidades e Estados").should("be.visible");
  });

  it('Abrir Seletor de Estados e baixar o arquivo de dados"', () => {
    cy.get("#nomeAreaTerritorialHome").then(($select) => {
      $select.css("display", "block");

      cy.wrap($select).select("Acre - 12");

      cy.wait(4000);

      cy.get("button.botao-dropdown").click();

      cy.contains("button.botao", "XLS").click();
    });
  });
});
