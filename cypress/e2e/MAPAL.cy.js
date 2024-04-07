import { faker } from "@faker-js/faker";
const partnerPage = require("../fixtures/pages/partnerPage.json");

describe("MAPAL website", () => {
  let partnerName = faker.person.firstName();
  let partnerSurname = faker.person.lastName();
  let partnerEmail = faker.internet.email();
  let partnerNumber = faker.phone.number();
  let partnerMessage = faker.word.words();
  it("mapal and partners, UI", () => {
    cy.visit("/company/partners");
    cy.get("p > .btn").click();
    cy.get(partnerPage.form).should("exist"); // assertion 2
    cy.get(partnerPage.name).type(partnerName);
    cy.get(partnerPage.surname).type(partnerSurname);
    cy.get(partnerPage.EMAIL).type(partnerEmail);
    cy.get(partnerPage.number).type(partnerNumber);
    cy.get(partnerPage.message).type(partnerMessage);
    cy.get(partnerPage.mainButton).click();
    cy.contains("This field is required. Please enter a value.").should(
      "exist"
    );
  });

  it("mapal and workforce, UI", () => {
    cy.clearCookies();
    cy.visit("/login");
    cy.get(".cm-btn").click();
    cy.get(":nth-child(1) > .card > .card-body > .stretched-link")
      .should("have.attr", "href") // assertion 1
      .then((href) => {
        cy.visit(href);
      });
  });

  it("mapal, API", () => {
    cy.request({
      method: "GET",
      url: `/login`,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const contentType = response.headers["content-type"];
      expect(contentType).to.exist;
      expect(contentType).to.include("text/html; charset=utf-8");
    });
  });
});
