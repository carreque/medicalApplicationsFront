import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../login.service';
import { loginForm } from '../../models/formLogin.model';
import { Router } from '@angular/router';
import { GuardServiceService } from '../guard-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {

  formObject: loginForm = {
    username: '',
    password: ''
  };

  @Output() clicked = new EventEmitter();

  constructor(private loginService: LoginService, private router: Router, private authService: GuardServiceService) { }

  onLogin() {
    this.loginService.login(this.formObject).subscribe(
      (response) => {
        this.authService.setIsLoggedIn(true);
        localStorage.setItem('sessionToken', response.result.token);
        localStorage.setItem('sessionId', response.result.id);
        this.router.navigate(['citas']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
