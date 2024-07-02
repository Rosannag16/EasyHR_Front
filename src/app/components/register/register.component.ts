import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  nome: string = '';
  cognome: string = '';

  userRegistered: boolean = false;
  registrationMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      nome: this.nome,
      cognome: this.cognome
    };

    this.authService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.registrationMessage = response; // Salva il messaggio di conferma dal backend
        this.userRegistered = true; // Indica che l'utente è stato registrato con successo
      },
      error => {
        console.error('Registration failed', error);
        this.registrationMessage = 'Errore durante la registrazione'; // Gestisce l'errore in caso di fallimento della registrazione
        this.userRegistered = false;
      }
    );
  }
}
