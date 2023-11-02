/// <reference types="cypress"/>

describe("login process", () => {
  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit("/");
  });

  it("logs in successfully with correct credentials", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("shows an error when email is not entered", () => {
    cy.login(null, "test");
    cy.get("#mail")
      .should("have.attr", "required")
      .then((isRequired) => {
        expect(isRequired).to.be.true;
      });
    cy.get("#mail")
      .then((el) => el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("shows an error when password is not entered", () => {
    cy.login("test@test.com", null);
    cy.get("#pass")
      .should("have.attr", "required")
      .then((isRequired) => {
        expect(isRequired).to.be.true;
      });
    cy.get("#pass")
      .then((el) => el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("logs out", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Log out").click();
    cy.contains("Log in").should("be.visible");
  });
});
