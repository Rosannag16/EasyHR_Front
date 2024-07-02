import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

import { Permessi } from 'src/app/interface/permessi';
import { PermessoService } from 'src/app/services/permesso.service';

@Component({
  selector: 'app-permessi-request',
  templateUrl: './permessi-request.component.html',
  styleUrls: ['./permessi-request.component.css']
})
export class PermessiRequestComponent implements OnInit {
  permessiForm!: FormGroup;
  permessiList: Permessi[] = [];
  userId: number | null = null; // ID dell'utente
  permessoService: any;

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Ottieni l'ID dell'utente

    if (this.userId) {
      this.loadPermessiRequests(this.userId); // Carica i permessi dell'utente

      this.permessiForm = this.fb.group({
        dataInizio: ['', Validators.required],
        dataFine: ['', Validators.required],
        motivo: ['', Validators.required],
      });
    } else {
      console.error('ID utente non trovato. Assicurati di aver effettuato l\'accesso.');
      // Puoi gestire il caso in cui l'ID utente non è disponibile qui
    }
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
    if (this.permessiForm.valid && this.userId) {
      this.requestService.addPermessiRequest(
        this.userId,
        this.permessiForm.value.dataInizio,
        this.permessiForm.value.dataFine,
        this.permessiForm.value.motivo
      ).subscribe(
        response => {
          console.log('Richiesta di permessi inviata con successo', response);
          // Opzionalmente, ricarica i permessi dopo l'invio della richiesta
          this.loadPermessiRequests(this.userId!);
        },
        error => {
          console.error('Errore nell\'invio della richiesta di permessi', error);
        }
      );
    }
  }

  approvePermessiRequest(permessoId: number): void {
    this.requestService.approvePermessiRequest(permessoId).subscribe(
      response => {
        console.log('Permessi approvati con successo', response);
        // Opzionalmente, ricarica i permessi dopo l'approvazione
        this.loadPermessiRequests(this.userId!);
      },
      error => {
        console.error('Errore nell\'approvare i permessi', error);
      }
    );
  }

  rejectPermessiRequest(permessoId: number): void {
    this.requestService.rejectPermessiRequest(permessoId).subscribe(
      response => {
        console.log('Permessi rifiutati con successo', response);
        // Opzionalmente, ricarica i permessi dopo il rifiuto
        this.loadPermessiRequests(this.userId!);
      },
      error => {
        console.error('Errore nel rifiutare i permessi', error);
      }
    );
  }

  private loadPermessi(): void {
    this.permessoService.getAllPermessi().subscribe(
      (permessiList: Permessi[]) => {
        this.permessiList = permessiList.filter(permesso => permesso.stato === 'In attesa' || permesso.stato === null);
        console.log('Richieste di permesso ricevute:', this.permessiList); // Assicurati che qui venga stampata correttamente la lista filtrata
      },
      (error: any) => {
        console.error('Errore nel recuperare i permessi:', error);
      }
    );
  }
  getPermessiStatus(permesso: Permessi): string {
    if (!permesso.stato) {
      return 'In attesa';
    }
  
    switch (permesso.stato.toUpperCase()) {
      case 'APPROVATO':
        return 'Approvato';
      case 'RIFIUTATO':
        return 'Rifiutato';
      default:
        return 'In attesa';
    }
  }
  

}
