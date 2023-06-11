import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from, mergeMap, switchMap } from 'rxjs';
import { Diagnostico } from '../models/Diagnostico.model';
import { ApiResponse } from '../models/ApiResponse.model';
import { ConnectionInstanceService } from '../connection-instance.service';
import { User } from '../models/Usuario.model';
import { Cita } from '../models/cita.model';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent {

  id_cita: number = 0;
  initialState = {
    id: 0,
    expertAssestment: '',
    disease: '',
    cita_id: 0
  };
  diagnosticoCompleto: Diagnostico = { ...this.initialState };
  appointmentsWithoutDiagnosis: Cita[] = [];
  disease: string = '';

  medic: User = {
      id: 0,
      name: '',
      lastnames: '',
      key: '',
      address: '',
      cardNumber: '',
      discriminator: '',
      memberShipNumber: '',
      nss: null,
      password: null,
      tlf: '',
      user: ''
  };
  toCreateDiagnosis: boolean = false;

  constructor(private router: ActivatedRoute, private apiService: ConnectionInstanceService, private routerNavigation: Router) { }
  ngOnInit() {
    this.id_cita = parseInt(this.router.snapshot.params['id']);
    this.toCreateDiagnosis = !isNaN(this.id_cita) ? false : true;
    console.log(typeof (this.id_cita));
    if (!this.toCreateDiagnosis) this.getDiagnostico();
    if (this.toCreateDiagnosis) this.getAppointsmentWithoutDiagnosis();
  }

  isToCreateDiagnosis(): boolean {
    return this.toCreateDiagnosis;
  }
  getDiagnostico(): void {
    const diagnosticoObservable$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>(`GetDiagnosticoFromCita/${this.id_cita}`));
    diagnosticoObservable$.pipe(

      switchMap(data => {
        this.diagnosticoCompleto = data.result;
        const medicoObservable$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>(`Usuarios/${this.diagnosticoCompleto.expertAssestment}`));
        return medicoObservable$;
      })
    ).subscribe(data => this.medic = data.result);
  }

  getAppointsmentWithoutDiagnosis(): void {
    const appointsmentsWithoutDiagnosis$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>('/CitasUsuarioSinDiagnostico'));
    appointsmentsWithoutDiagnosis$.subscribe(data => this.appointmentsWithoutDiagnosis = data.result);
  }


  asignarCitaDiagnostico(cita : any): void {

    if (cita == undefined) return;
    this.diagnosticoCompleto.expertAssestment = cita.attribute11.toString();
    this.diagnosticoCompleto.disease = this.disease;
    this.diagnosticoCompleto.cita_id = cita.id;
    const creationDiagnosisPost$: Observable<ApiResponse> = from(this.apiService.post<ApiResponse>(`Diagnosticos`, this.diagnosticoCompleto));
    creationDiagnosisPost$.pipe(
      mergeMap((data: any) => {
        cita.diagnostico_id = data.id;
        const citaUpdated$: Observable<ApiResponse> = from(this.apiService.put<ApiResponse>(`Citas/${cita.id}`, cita));
        return citaUpdated$;
      })
    ).subscribe(data => console.log(data));

    this.routerNavigation.navigate(['citas']);
  }

  editDiagnostico(): void {
    this.apiService.put(`/Diagnosticos/${this.diagnosticoCompleto.id}`, this.diagnosticoCompleto);
    this.routerNavigation.navigate(['citas']);
  }
}
