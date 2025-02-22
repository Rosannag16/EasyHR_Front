import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { FlatpickrModule } from 'angularx-flatpickr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DipendenteComponent } from './components/dipendente/dipendente.component';
import { FerieRequestComponent } from './components/ferie-request/ferie-request.component';
import { PermessiRequestComponent } from './components/permessi-request/permessi-request.component';
import { ApproveRequestComponent } from './components/approve-requests/approve-requests.component';
import { PermessoApproveRequestComponent } from './components/permesso-approve-request/permesso-approve-request.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FerieListComponent } from './components/ferie-list/ferie-list.component';
import { PermessiListComponent } from './components/permessi-list/permessi-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DipendenteComponent,
    FerieRequestComponent,
    PermessiRequestComponent,
    ApproveRequestComponent,
    PermessoApproveRequestComponent,
    UserListComponent,
    FerieListComponent,
    PermessiListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    FlatpickrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
