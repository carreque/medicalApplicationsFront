import { ConnectionInstanceService } from "../../connection-instance.service";
import { RegisterComponent } from "./register.component"

describe('registerComponent', () => {

  it('it shows two images when its render', () => {
    cy.mount(RegisterComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    });
    cy.get('[alt="imagenPacient"]').should('be.visible');
    cy.get('[alt="imagenMedico"]').should('be.visible');
  })

  it('it shows card to register as a medic', () => {
    cy.mount(RegisterComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    });
    cy.get('#registerCardForMedic').click();
    cy.get('input[type=text]').should('have.text', '');
    cy.get('.btn-primary').should('have.text', 'Registrarse');
    cy.get('.btn-danger').should('have.text', 'Volver');
  })

  it('it shows card to register as a patient', () => {
    cy.mount(RegisterComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    });
    cy.get('#registerCardForPatient').click();
    cy.get('input[type=text]').should('have.text', '');
    cy.get('.btn-primary').should('have.text', 'Registrarse');
    cy.get('.btn-danger').should('have.text', 'Volver');
  })
})
