
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserConnectionComponent } from './user-connection/user-connection.component';
import { ShowUserComponent } from './user-connection/show-user/show-user.component';
import { AddEditUserComponent } from './user-connection/add-edit-user/add-edit-user.component';
import { ConnectionInstanceService } from './connection-instance.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CitaComponent } from './cita/cita.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';

@NgModule({
  declarations: [
    AppComponent,
    UserConnectionComponent,
    ShowUserComponent,
    AddEditUserComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    CitaComponent,
    DiagnosticoComponent
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage
  ],

  providers: [ConnectionInstanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
