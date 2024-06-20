import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DipendenteComponent } from './components/dipendente/dipendente.component';
import { RequestComponent } from './components/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    DipendenteComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlatpickrModule.forRoot(), // Importa FlatpickrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
