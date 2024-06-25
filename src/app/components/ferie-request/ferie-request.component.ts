import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ferie } from '../ferie';
import { Permessi } from '../permessi';
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
  permessiList: Permessi[] = [];
  userId: number | null = null; // ID dell'utente

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Ottieni l'ID dell'utente

    if (this.userId) {
      this.loadFerieRequests(this.userId); // Carica le ferie dell'utente
      this.loadPermessiRequests(this.userId); // Carica i permessi dell'utente

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

  private loadFerieRequests(userId: number): void {
    this.requestService.getFerieRequestsByUserId(userId).subscribe(
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

  private loadPermessiRequests(userId: number): void {
    this.requestService.getPermessiRequestsByUserId(userId).subscribe(
      permessiList => {
        this.permessiList = permessiList;
        console.log('Permessi ricevuti:', this.permessiList);
      },
      error => {
        console.error('Errore nel recuperare i permessi:', error);
        // Gestire l'errore nel recupero dei permessi qui
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
          this.loadFerieRequests(this.userId!);
        },
        error => {
          console.error('Errore nell\'invio della richiesta di ferie', error);
        }
      );
    }
  }

  approveFerieRequest(ferieId: number): void {
    this.requestService.approveFerieRequest(ferieId).subscribe(
      response => {
        console.log('Ferie approvate con successo', response);
        // Opzionalmente, ricarica le ferie dopo l'approvazione
        this.loadFerieRequests(this.userId!);
      },
      error => {
        console.error('Errore nell\'approvare le ferie', error);
      }
    );
  }

  rejectFerieRequest(ferieId: number): void {
    this.requestService.rejectFerieRequest(ferieId).subscribe(
      response => {
        console.log('Ferie rifiutate con successo', response);
        // Opzionalmente, ricarica le ferie dopo il rifiuto
        this.loadFerieRequests(this.userId!);
      },
      error => {
        console.error('Errore nel rifiutare le ferie', error);
      }
    );
  }

}
