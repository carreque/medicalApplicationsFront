import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/Usuario.model';
import { ConnectionInstanceService } from '../../connection-instance.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  initialStateUser : User = {
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
  patient: boolean = false;
  medic: boolean = false;
  newUser: User = { ...this.initialStateUser };

  constructor(private apitService: ConnectionInstanceService, private router: Router) { };

  isMedic(): boolean {
    return this.medic;
  }

  isPatient(): boolean {
    return this.patient;
  }

  setMedic(value: boolean, event: any): void {
    this.medic = value;
    this.patient = false;
    event.stopPropagation();
  }

  setPatient(value: boolean, event: any): void {
    this.patient = value;
    this.medic = false;
    event.stopPropagation();
  }

  setBoth(value: boolean, event: any): void {
    this.patient = value;
    this.medic = value;
    this.newUser = { ...this.initialStateUser };
    event.stopPropagation();
  }

  createNewUser(): void {

    this.newUser.discriminator = this.newUser.cardNumber.length > 0 ? 'Paciente' : 'Medico';
    this.apitService.post('/Usuarios/Register', this.newUser);
    this.router.navigate(['login']);
  }
}
