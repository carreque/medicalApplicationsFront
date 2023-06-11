import { Component } from '@angular/core';
import { ConnectionInstanceService } from '../connection-instance.service';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/Usuario.model';
import { ApiResponse } from '../models/ApiResponse.model';

@Component({
  selector: 'app-user-connection',
  templateUrl: './user-connection.component.html',
  styleUrls: ['./user-connection.component.css']
})
export class UserConnectionComponent {

  /*constructor(private apiService: ConnectionInstanceService, private router: ActivatedRoute) { };
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
      this.user.discriminator = this.user.memberShipNumber.length > 0 ? 'Medico' : 'Paciente';
    });
    }
    */
  
}
