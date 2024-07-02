import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup e Validators per gestire i form
import { Ferie } from 'src/app/interface/ferie'; // Importa l'interfaccia Ferie per definire la struttura delle ferie
import { AuthService } from 'src/app/services/auth.service'; // Importa il servizio AuthService per gestire l'autenticazione dell'utente
import { RequestService } from 'src/app/services/request.service'; // Importa il servizio RequestService per gestire le richieste di ferie

@Component({
  selector: 'app-ferie-request', // Selettore del componente
  templateUrl: './ferie-request.component.html', // Percorso del file HTML del template del componente
  styleUrls: ['./ferie-request.component.css'] // Array di percorsi dei file CSS di stile del componente
})
export class FerieRequestComponent implements OnInit {
  ferieForm!: FormGroup; // Form Group per gestire il form delle ferie
  ferieList: Ferie[] = []; // Array di ferie
  userId: number | null = null; // ID dell'utente

  constructor(
    private requestService: RequestService, // Servizio RequestService per gestire le richieste di ferie
    private fb: FormBuilder, // FormBuilder per la gestione dei form
    private authService: AuthService // Servizio AuthService per gestire l'autenticazione dell'utente
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Ottieni l'ID dell'utente dall'AuthService

    if (this.userId) {
      this.loadFerieRequests(); // Carica le ferie dell'utente

      this.ferieForm = this.fb.group({
        dataInizio: ['', Validators.required], // Campo data di inizio con validatore required
        dataFine: ['', Validators.required], // Campo data di fine con validatore required
        motivo: ['', Validators.required], // Campo motivo con validatore required
      });
    } else {
      console.error('ID utente non trovato. Assicurati di aver effettuato l\'accesso.');
      // Gestisci il caso in cui l'ID utente non sia disponibile
    }
  }

  private loadFerieRequests(): void {
    this.requestService.getFerieRequestsByUserId(this.userId!).subscribe(
      ferieList => {
        this.ferieList = ferieList; // Assegna le ferie ricevute alla variabile ferieList
        console.log('Ferie ricevute:', this.ferieList);
      },
      error => {
        console.error('Errore nel recuperare le ferie:', error);
        // Gestisci l'errore nel recupero delle ferie
      }
    );
  }

  onSubmit(): void {
    if (this.ferieForm.valid && this.userId) {
      this.requestService.addFerieRequest(
        this.userId,
        this.ferieForm.value.dataInizio,
        this.ferieForm.value.dataFine,
        this.ferieForm.value.motivo
      ).subscribe(
        response => {
          console.log('Richiesta di ferie inviata con successo', response);
          // Opzionalmente, ricarica le ferie dopo l'invio della richiesta
          this.loadFerieRequests();
        },
        error => {
          console.error('Errore nell\'invio della richiesta di ferie', error);
        }
      );
    }
  }

  getFerieStatus(ferie: Ferie): string {
    if (!ferie.stato) {
      return 'In attesa';
    }
  
    switch (ferie.stato) {
      case 'Approvata':
        return 'Approvata';
      case 'Rifiutata':
        return 'Rifiutata';
      default:
        return 'In attesa';
    }
  }
}
