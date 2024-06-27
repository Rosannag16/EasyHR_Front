import { Component, OnInit } from '@angular/core';
import { Ferie } from '../ferie'; // Assicurati di importare correttamente il modello Ferie
import { FerieService } from '../ferie.service'; // Assicurati di importare correttamente il service FerieService

@Component({
  selector: 'app-approve-ferie',
  templateUrl: './approve-requests.component.html',
  styleUrls: ['./approve-requests.component.css']
})
export class ApproveRequestComponent implements OnInit {
  ferieList: Ferie[] = [];

  constructor(private ferieService: FerieService) {}

  ngOnInit(): void {
    this.loadFerieRequests();
  }

  private loadFerieRequests(): void {
    this.ferieService.getAllFerie().subscribe(
      ferieList => {
        this.ferieList = ferieList.filter(ferie => ferie.stato === 'In attesa' || ferie.stato === null);
        console.log('Richieste di ferie ricevute:', this.ferieList);
      },
      error => {
        console.error('Errore nel recuperare le richieste di ferie:', error);
      }
    );
  }
  

  approveFerie(ferieId: number): void {
    this.ferieService.approveFerieRequest(ferieId).subscribe(
      response => {
        console.log('Richiesta di ferie approvata con successo', response);
        this.updateFerieStatus(ferieId, 'Approvata'); // Chiamata per aggiornare lo stato
        this.removeFerieRequestFromList(ferieId);
      },
      error => {
        console.error('Errore nell\'approvare la richiesta di ferie', error);
      }
    );
  }

  rejectFerie(ferieId: number): void {
    this.ferieService.rejectFerieRequest(ferieId).subscribe(
      response => {
        console.log('Richiesta di ferie rifiutata con successo', response);
        this.updateFerieStatus(ferieId, 'Rifiutata'); // Chiamata per aggiornare lo stato
        this.removeFerieRequestFromList(ferieId);
      },
      error => {
        console.error('Errore nel rifiutare la richiesta di ferie', error);
      }
    );
  }

  updateFerieStatus(ferieId: number, stato: string): void {
    this.ferieService.updateFerieStatus(ferieId, stato).subscribe(
      response => {
        console.log('Stato della ferie aggiornato con successo', response);
        // Non è necessario fare nulla di specifico qui, se la risposta non è JSON valido
      },
      error => {
        console.error('Errore nell\'aggiornare lo stato della ferie', error);
        // Gestisci gli errori qui
      }
    );
  }
  

  private removeFerieRequestFromList(ferieId: number): void {
    this.ferieList = this.ferieList.filter(ferie => ferie.id !== ferieId);
  }
}
