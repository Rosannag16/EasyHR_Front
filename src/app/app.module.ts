import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { FlatpickrModule } from 'angularx-flatpickr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DipendenteComponent } from './components/dipendente/dipendente.component';
// import { RequestComponent } from './components/request/request.component';
import { FerieRequestComponent } from './components/ferie-request/ferie-request.component';
import { PermessiRequestComponent } from './components/permessi-request/permessi-request.component';
import { ApproveRequestComponent } from './components/approve-requests/approve-requests.component';
import { PermessoApproveRequestComponent } from './components/permesso-approve-request/permesso-approve-request.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    DipendenteComponent,
    // RequestComponent,
    FerieRequestComponent,
    PermessiRequestComponent,
    ApproveRequestComponent,
    PermessoApproveRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule
    FlatpickrModule.forRoot(), // Import FlatpickrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
