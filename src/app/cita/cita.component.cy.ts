import { ConnectionInstanceService } from "../connection-instance.service";
import { Cita } from "../models/cita.model";
import { CitaComponent } from "./cita.component";

describe('cita component tests', () => {

  const citasPaciente: Cita[] = [
    {
      id: 1,
      attribute11: 1,
      reason: 'Checkup',
      date: new Date(),
      patient_id: '55',
      diagnostico_id: 21
    },
    {
      id: 2,
      attribute11: 2,
      reason: 'reason',
      date: new Date(),
      patient_id: '25',
      diagnostico_id: 22
    }
  ];

  it('mounts', () => {

    cy.mount(CitaComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    });
  });

  it('it shows two images at the beginning of its behaviour', () => {

    cy.mount(CitaComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    });
    cy.get('[alt="verCitasUsuario"]').should('be.visible');
    cy.get('[alt="ConcertarCita"]').should('be.visible');

  })

  it('clicking on ver citas shows verCitasCard', () => {

    cy.mount(CitaComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ],
      componentProperties: {
        citasPaciente: citasPaciente
      }
    });

    cy.get('[alt="verCitasUsuario"]').click();
    cy.get('#appointemnsContainer').should('exist');
    cy.get('.cardsAppointments').should('exist');
    cy.get('.cardsAppointments').should('have.length', citasPaciente.length);
    cy.get('#editAppointments').should('have.text', 'Editar');
    cy.get('#checkDiagnosis').should('have.text', 'Ver diagnostico');
    cy.get('#deleteAppointment').should('have.text', 'Eliminar');
  });

  it('shows edit appointment card if edit button was clicked', () => {

    cy.mount(CitaComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ],
      componentProperties: {
        citasPaciente: citasPaciente
      }
    });
    cy.get('[alt="verCitasUsuario"]').click();
    cy.get('#editAppointments').click();
    cy.get('#editionCard').should('be.visible');
    cy.get('#dateAppointment').should('exist');
    cy.get('#reasonAppointment').should('exist');
  })
  it('clicking on concertarCita showsConcertarCitaCard', () => {

    cy.mount(CitaComponent, {
      providers: [
        { provide: ConnectionInstanceService }
      ]
    });
    
    cy.get('[alt="ConcertarCita"]').click();
    cy.get('.card').should('exist');
    cy.get('.form-select').should('exist');
    cy.get('#floatingDateAppointment').should('have.text', '');
    cy.get('#floatingReasonAppointment').should('have.text', '');
    cy.get('.form-select').should('have.value', null);
    cy.get('.btn-danger').should('have.text', 'Volver');
    cy.get('.btn-primary').should('have.text', 'Pedir Cita');
    cy.get('form').should('exist');
  });
});
