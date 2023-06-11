import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ShowUserComponent } from './user-connection/show-user/show-user.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { RegisterComponent } from './auth/register/register.component';
import { CitaComponent } from './cita/cita.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: "showUser/:id", component: ShowUserComponent },
      { path: "citas", component: CitaComponent },
      { path: "diagnostico/:id", component: DiagnosticoComponent }

    ]
  }
];


@NgModule({
  //declarations: [],

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
