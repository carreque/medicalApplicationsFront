import { Component } from '@angular/core';
import { ConnectionInstanceService } from '../connection-instance.service';
import { User } from '../models/Usuario.model';
import { Cita } from '../models/cita.model';
import { Observable, from } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})


export class CitaComponent {

  initialState : Cita = {
    id: 0,
    date: new Date(),
    reason: '',
    attribute11: 0,
    patient_id: null,
    diagnostico_id: 0
  };

  medicsList: User[] = [];
  cita: Cita = { ...this.initialState };
  citasPaciente: Cita[] = [];
  verCitas: boolean = false;
  concertarCita: boolean = false;
  editarCita: boolean = false;

  constructor(private apiService: ConnectionInstanceService, private router : Router)
  {
    this.apiService.setAuthToken(localStorage.getItem('sessionToken'));
  }

  ngOnInit(): void {
    this.apiService.setAuthToken(localStorage.getItem('sessionToken'));
    this.getMedics();
  }
  getAllAppointments(): void {
    const idPatient = localStorage.getItem('sessionId');
    const apiObservable$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>(`/CitasUsuario/${idPatient}`));
    apiObservable$.subscribe(data => this.citasPaciente = data.result);
  }
  createAppointment(): void {

    if (localStorage.getItem('sessionId') == null || this.cita.attribute11 == 0 || this.cita.reason.length == 0) return;

    this.cita.patient_id = localStorage.getItem('sessionId');
    this.apiService.post<ApiResponse>('/Citas', this.cita);
    this.setBothAppointmentsValues(false);
  }

  getMedics(): void {
    const medicsObservable$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>('/Medicos'));
    medicsObservable$.subscribe(data => {
      this.medicsList = data.result.filter((medic: { id: string }) => medic.id.toString() !== localStorage.getItem('sessionId') )
    });
  }

  updateAppointment(): void {

    this.apiService.put < ApiResponse>('/Citas', this.cita);
  }

  deleteAppointment(): void {

  }

  setIsVerCitas(value: boolean, event : any): void {
    this.verCitas = value;
    this.concertarCita = false;
    this.editarCita = false;
    event.stopPropagation;
  }

  setIsConcertarCitas(value: boolean, event: any): void {
    this.concertarCita = value;
    this.verCitas = false;
    this.editarCita = false;
    event.stopPropagation;
  }

  setIsEditarCitas(value: boolean, event: any, citaAEditar:any): void {
    this.editarCita = value;
    this.verCitas = false;
    this.concertarCita = false;
    this.cita = citaAEditar;
    event.stopPropagation;
  }

  isConcertarCita(): boolean {
    return this.concertarCita;
  }

  isVerCitas(): boolean {
    return this.verCitas;
  }

  isEditarCita(): boolean {
    return this.editarCita;
  }

  setBothAppointmentsValues(value: boolean): void {
    this.concertarCita = value;
    this.verCitas = value;
    this.editarCita = value;
    this.cita = { ...this.initialState };
    this.citasPaciente = [];
  }

  searchDoctor(citaPaciente: Cita): string {

    if (citaPaciente == undefined) return '';
    const doctorFounded = this.medicsList.find(medic => medic.id == citaPaciente.attribute11);
    return doctorFounded != null ? (doctorFounded.name + doctorFounded.lastnames) : '';
  }

  redirectoToItsDiagnostico(idCita: number): void{

    this.router.navigate([`diagnostico/${idCita}`]);
  }

  editAppointment(): void {

    this.apiService.put(`/Citas/${this.cita.id}`, this.cita);
    this.setBothAppointmentsValues(false);
  }

  deleteCita(cita : any, event: any): void {

    this.apiService.delete(`/Diagnosticos/${cita.diagnostico_id}`);
    this.apiService.delete(`/Citas/${cita.id}`);
    this.setBothAppointmentsValues(false);
    event.stopPropagation;
  } 
}
