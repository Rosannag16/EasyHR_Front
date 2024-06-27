import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DipendenteComponent } from './components/dipendente/dipendente.component';
// import { RequestComponent } from './components/request/request.component';
import { FerieRequestComponent } from './components/ferie-request/ferie-request.component';
import { PermessiRequestComponent } from './components/permessi-request/permessi-request.component';
import { ApproveRequestComponent } from './components/approve-requests/approve-requests.component';
import { PermessoApproveRequestComponent } from './components/permesso-approve-request/permesso-approve-request.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dipendente', component: DipendenteComponent },
  // { path: 'request', component: RequestComponent }, // Aggiunta della rotta per RequestComponent
  { path: 'ferie', component: FerieRequestComponent },
  { path: 'permessi', component: PermessiRequestComponent },
  { path: 'approve-requests', component: ApproveRequestComponent},
  { path: 'permesso-approve-requests', component: PermessoApproveRequestComponent},

  // Aggiungi altre rotte se necessario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
