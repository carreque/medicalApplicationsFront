import { createOutputSpy } from "cypress/angular";
import { ConnectionInstanceService } from "../../connection-instance.service";
import { LoginService } from "../../login.service";
import { LoginComponent } from "./login.component";
import { any } from "cypress/types/bluebird";

describe('loginComponent', () => {

  it('mounts', () => {

    cy.mount(LoginComponent, {
      providers: [
        { provide: LoginService },
        { provide: ConnectionInstanceService }
      ],
    })
    cy.get('h2').should('have.text', '¡Bienvenido a su aplicación de Confianza!');
    cy.get('input').should('have.text', '');
    cy.get('button').should('have.text', 'Login');
    cy.get('form').should('exist');
    cy.get('a').should('have.text', '¿No tienes una cuenta?');

  })

  it('Dispatches an event when click on login button', () => {
    cy.mount(LoginComponent, {
      providers: [
        { provide: LoginService },
        { provide: ConnectionInstanceService }
      ],

      componentProperties: {
        clicked: {
          emit:  cy.spy().as('onMethodLogin')
        } as any
      }
    })
    cy.get('#username').type('Benjamin');
    cy.get('#password').type('123456');
    cy.get('button').click();
    cy.url().should('contain', '/login');    
  })
})


