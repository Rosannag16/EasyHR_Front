import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ferie } from '../ferie';
import { AuthService } from '../auth.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-ferie-request',
  templateUrl: './ferie-request.component.html',
  styleUrls: ['./ferie-request.component.css']
})
export class FerieRequestComponent implements OnInit {
  ferieForm!: FormGroup;
  ferieList: Ferie[] = [];
  userId: number | null = null; // ID dell'utente

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Ottieni l'ID dell'utente

    if (this.userId) {
      this.loadFerieRequests(); // Carica le ferie dell'utente

      this.ferieForm = this.fb.group({
        dataInizio: ['', Validators.required],
        dataFine: ['', Validators.required],
        motivo: ['', Validators.required],
      });
    } else {
      console.error('ID utente non trovato. Assicurati di aver effettuato l\'accesso.');
      // Puoi gestire il caso in cui l'ID utente non è disponibile qui
    }
  }

  private loadFerieRequests(): void {
    this.requestService.getFerieRequestsByUserId(this.userId!).subscribe(
      ferieList => {
        this.ferieList = ferieList;
        console.log('Ferie ricevute:', this.ferieList);
      },
      error => {
        console.error('Errore nel recuperare le ferie:', error);
        // Gestire l'errore nel recupero delle ferie qui
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
