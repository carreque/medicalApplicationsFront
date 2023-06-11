import { Component } from '@angular/core';
import { ConnectionInstanceService } from '../../connection-instance.service';
import { Observable, from, map } from 'rxjs';
import { User } from '../../models/Usuario.model';
import { ApiResponse } from '../../models/ApiResponse.model';
import { GuardServiceService } from '../../auth/guard-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})

export class ShowUserComponent {

  constructor(private apiService: ConnectionInstanceService, private router: ActivatedRoute, private loginService: LoginService) { };
  user: User = {
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
  }
  id_user: number = 0;

  ngOnInit(): void {

    this.id_user = this.router.snapshot.params['id'];
    this.getUser();
  }

  getUser(): void {

    const userObservable$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>(`Usuarios/${this.id_user}`));
    userObservable$.subscribe(data => {
      this.user = data.result
      this.user.discriminator = this.user.memberShipNumber != null ? 'Medico' : 'Paciente';
    });
  }

  editUser(): void {

    this.apiService.put<ApiResponse>(`Usuarios/${this.id_user}`, this.user);
  }

  deleteUser(): void {
    const userId = localStorage.getItem('sessionId');
    this.apiService.delete<ApiResponse>(`/CitasFromUser/${userId}`);
    this.apiService.delete<ApiResponse>(`/Usuarios/${userId}`);
    this.loginService.onLogOut();
  }

}
