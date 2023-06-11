import { ActivatedRoute, Router } from "@angular/router";
import { DiagnosticoComponent } from "./diagnostico.component";
import { ConnectionInstanceService } from "../connection-instance.service";
import { of } from "rxjs";
import { Cita } from "../models/cita.model";

describe('Diagnostico component', () => {

  const citas: Cita[] =
    [
      {
        id: 4,
        date: new Date(),
        reason: "Dolor de vientre",
        attribute11: 10,
        patient_id: '4',
        diagnostico_id: 3
      }
    ];

  it('mounts', () => {
    cy.mount(DiagnosticoComponent, {
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } },
        { provide: ConnectionInstanceService },
        { provide: Router }
      ]
    });
  });

  it('checks to create a diagnosis', () => {

    cy.mount(DiagnosticoComponent, {
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } },
        { provide: ConnectionInstanceService },
        { provide: Router }
      ],

      componentProperties: {
        id_cita: 4,
        toCreateDiagnosis: true,
        appointmentsWithoutDiagnosis: citas
      }
    });

    cy.get('#rowWithoutDiagnosis').should('exist');
    cy.get('.cardsAppointments').should('have.length', citas.length);
    cy.get('#textAreaDisease').should('exist');
    cy.get('#medicDiagnosis').should('contain.text', citas[0].attribute11);
    cy.get('#reasonDiagnosis').should('contain.text', citas[0].reason);
    cy.get('#dateDiagnosis').should('contain.text', citas[0].date);
    cy.get('#textAreaDisease').should('have.text', '');
  });
})
