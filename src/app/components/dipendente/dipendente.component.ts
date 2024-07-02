import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; // Importa il servizio UserService per gestire gli utenti
import { AuthService } from 'src/app/services/auth.service'; // Importa il servizio AuthService per gestire l'autenticazione degli utenti

@Component({
  selector: 'app-dipendente',
  templateUrl: './dipendente.component.html',
  styleUrls: ['./dipendente.component.css']
})
export class DipendenteComponent implements OnInit {
  dataLavoro: string = ''; // Data di lavoro dell'utente
  inizioOraLavoro: string = '08:00'; // Ora di inizio lavoro predefinita
  fineOraLavoro: string = '18:00'; // Ora di fine lavoro predefinita
  oreStandard: number = 8; // Ore standard di lavoro
  oreStraordinario: number = 0; // Ore di straordinario
  aggiornatoMessage: string = ''; // Messaggio di aggiornamento

  constructor(private userService: UserService, private authService: AuthService) { } // Inietta i servizi UserService e AuthService nel costruttore

  ngOnInit(): void {
    // Esegui eventuali operazioni di inizializzazione qui
  }

  // Metodo per aggiornare gli orari di lavoro dell'utente
  updateWorkHours(): void {
    this.submitWorkHours(); // Chiama il metodo privato per inviare gli orari di lavoro al backend
  }

  // Metodo privato per inviare gli orari di lavoro al backend tramite il servizio UserService
  private submitWorkHours(): void {
    const userId = this.authService.getUserId(); // Ottiene l'ID dell'utente autenticato dal servizio AuthService
    if (userId === -1) { // Verifica se l'ID dell'utente è valido
      console.error('User ID is invalid. Ensure the user is logged in.'); // Stampa un errore se l'ID dell'utente non è valido
      return; // Esce dal metodo se l'ID dell'utente non è valido
    }

    const updateData = {
      dataLavoro: this.dataLavoro || null, // Data di lavoro (opzionale)
      inizioOraLavoro: this.inizioOraLavoro, // Ora di inizio lavoro
      fineOraLavoro: this.fineOraLavoro, // Ora di fine lavoro
      oreLavorate: 0, // Ore lavorate (potenziale utilizzo futuro)
      oreStraordinario: 0 // Ore di straordinario (potenziale utilizzo futuro)
    };

    // Chiamata al metodo updateUserWorkHours del servizio UserService per aggiornare gli orari di lavoro dell'utente
    this.userService.updateUserWorkHours(userId, updateData).subscribe(
      response => {
        console.log('Risposta dal server:', response); // Log della risposta dal server
        console.log('Orari di lavoro aggiornati con successo', response); // Log dell'avvenuto aggiornamento degli orari di lavoro
        this.aggiornatoMessage = 'Aggiornato!'; // Imposta il messaggio di aggiornamento
      },
      error => {
        console.error('Errore durante l\'aggiornamento degli orari di lavoro', error); // Gestisce gli errori durante l'aggiornamento degli orari di lavoro
      }
    );
  }

  // Metodo privato per validare il formato dell'ora
  private validateTime(time: string): boolean {
    const pattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // Pattern per il formato HH:mm
    return pattern.test(time) && time >= '08:00' && time <= '20:00' && this.isMultipleOf15(time); // Valida l'ora rispettando le regole specificate
  }

  // Metodo privato per verificare se l'ora è multiplo di 15 minuti
  private isMultipleOf15(time: string): boolean {
    const [hours, minutes] = time.split(':').map(Number); // Estrae ore e minuti dal formato HH:mm
    return minutes % 15 === 0; // Verifica se i minuti sono multipli di 15
  }
}
