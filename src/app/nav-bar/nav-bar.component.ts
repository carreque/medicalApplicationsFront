import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GuardServiceService } from '../auth/guard-service.service';
import { Observable, from } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse.model';
import { ConnectionInstanceService } from '../connection-instance.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() activeLink: string = '';
  userSession: string | any = localStorage.getItem('sessionId');
  isMedic: boolean = false;
  constructor(private router: Router, private authService: GuardServiceService, private apiService: ConnectionInstanceService) { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser(): void {
    const observable$: Observable<ApiResponse> = from(this.apiService.get<ApiResponse>(`/Usuarios/${this.userSession}`));
    observable$.subscribe(data => {
      console.log(data.result);
      this.isMedic = data.result.nss != null ? false : true;
    })
  }

  isUserMedic(): boolean {
    return this.isMedic;
  }

  onLogOut(): void {

    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionId');
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['login']);
  }
}
