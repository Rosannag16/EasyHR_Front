import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Ferie } from '../ferie';
import { Permessi } from '../permessi';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  userId: number = 1; // Sostituisci con l'ID dell'utente attualmente loggato

  // Variabili per le richieste di ferie
  dataInizioFerie: string = '';
  dataFineFerie: string = '';
  motivoFerie: string = '';
  ferieList: Ferie[] = [];

  // Variabili per le richieste di permessi
  dataInizioPermessi: string = '';
  dataFinePermessi: string = '';
  motivoPermessi: string = '';
  permessiList: Permessi[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  addRequest(type: string): void {
    if (type === 'ferie') {
      this.requestService.addFerieRequest(this.userId, this.dataInizioFerie, this.dataFineFerie, this.motivoFerie)
        .subscribe(response => {
          console.log('Richiesta ferie aggiunta con successo', response);
          this.loadRequests(); // Ricarica la lista dopo l'aggiunta
          this.resetFields('ferie');
        }, error => {
          console.error('Errore durante l\'aggiunta della richiesta di ferie', error);
        });
    } else if (type === 'permessi') {
      this.requestService.addPermessiRequest(this.userId, this.dataInizioPermessi, this.dataFinePermessi, this.motivoPermessi)
        .subscribe(response => {
          console.log('Richiesta permessi aggiunta con successo', response);
          this.loadRequests(); // Ricarica la lista dopo l'aggiunta
          this.resetFields('permessi');
        }, error => {
          console.error('Errore durante l\'aggiunta della richiesta di permessi', error);
        });
    }
  }

  private loadRequests(): void {
    this.loadFerieRequests();
    this.loadPermessiRequests();
  }

  private loadFerieRequests(): void {
    this.requestService.getFerieRequestsByUserId(this.userId)
      .subscribe(
        ferieList => {
          this.ferieList = ferieList;
          console.log('Ferie ricevute:', this.ferieList);
        },
        error => {
          console.error('Errore durante il recupero delle richieste di ferie', error);
        }
      );
  }

  private loadPermessiRequests(): void {
    this.requestService.getPermessiRequestsByUserId(this.userId)
      .subscribe(
        permessiList => {
          this.permessiList = permessiList;
          console.log('Permessi ricevuti:', this.permessiList);
        },
        error => {
          console.error('Errore durante il recupero delle richieste di permessi', error);
        }
      );
  }

  private resetFields(type: string): void {
    if (type === 'ferie') {
      this.dataInizioFerie = '';
      this.dataFineFerie = '';
      this.motivoFerie = '';
    } else if (type === 'permessi') {
      this.dataInizioPermessi = '';
      this.dataFinePermessi = '';
      this.motivoPermessi = '';
    }
  }

}
