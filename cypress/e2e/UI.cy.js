import { faker } from "@faker-js/faker";

describe("integration test", () => {
  let partnerName = faker.person.firstName();
  let partnerSurname = faker.person.lastName();
  let partnerEmail = faker.internet.email();
  let partnerNumber = faker.phone.number();
  let partnerMessage = faker.word.words();
  it("mapal and partners, UI", () => {
    cy.visit("/company/partners");
    cy.get("p > .btn").click();
    cy.get("#clickdimensionsForm").should("exist"); // assertion 2
    cy.get("#f_3d8193bd7376eb11a81200224880bcd1").type(partnerName);
    cy.get("#f_ad75e7d67376eb11a81200224880bcd1").type(partnerSurname);
    cy.get("#f_9ca840907376eb11a81200224880bcd1").type(partnerEmail);
    cy.get("#f_1855cbb17576eb11a81200224880bcd1").type(partnerNumber);
    cy.get("#f_aef232c8d87feb11a812000d3a2ac22b").type(partnerMessage);
    cy.get("#btnSubmit").click();
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
    });
  });
});
