/// <reference types="cypress"/>

import faker from "faker";
const bookData = {
  title: faker.company.catchPhrase(),
  description: faker.company.catchPhrase(),
  author: faker.name.findName(),
};

beforeEach(() => {
  cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
  cy.visit("/");
  cy.login("test@test.com", "test");
});

describe("Favorite books testing", () => {
  it('Add book to favorites through "Add New"', () => {
    cy.createFavoriteBook(bookData);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain", bookData.title);
  });

  it('Add book to favorites through "Book page"', () => {
    cy.addBookFavorite(bookData);
    cy.contains(bookData.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookData.title).should("be.visible");
  });

  it("Delete book from favorites", () => {
    cy.createFavoriteBook(bookData);
    cy.visit("/favorites");
    cy.contains(bookData.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookData.title).should("not.exist");
  });
});
