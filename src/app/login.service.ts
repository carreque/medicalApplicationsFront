import { Injectable } from '@angular/core';
import { ConnectionInstanceService } from './connection-instance.service';
import { Observable, from } from 'rxjs';
import { loginForm } from './models/formLogin.model';
import { GuardServiceService } from './auth/guard-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private ApiService: ConnectionInstanceService, private authService: GuardServiceService, private router: Router) { }

  login(loginObject: loginForm): Observable<any> {
    const { username, password } = loginObject;
    return from(this.ApiService.post(`/Usuarios/login?username`, loginObject));
  }

  onLogOut(): void {

    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionId');
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['login']);
  }
}
