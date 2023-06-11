import { ConnectionInstanceService } from "../connection-instance.service"
import { NavBarComponent } from "./nav-bar.component"

describe('navbarComponent', () => {
  it('mounts', () => {
    cy.mount(NavBarComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    })
  });

  it('appears all the links', () => {
    cy.mount(NavBarComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ],

      componentProperties: {
        isMedic: true
      }
    });

    cy.get('.nav-link').should('have.length', '4');
    cy.get('#medicTab').should('be.visible');
  });

  it('diagnosis tab doesn´t appear', () => {
    cy.mount(NavBarComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ],

      componentProperties: {
        isMedic: false
      }
    });

    cy.get('.nav-link').should('have.length', '3');
    cy.get('#medicTab').should('not.exist');
  });
})
