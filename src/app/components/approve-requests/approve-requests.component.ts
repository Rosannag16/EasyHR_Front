import { Component, OnInit } from '@angular/core';
import { Ferie } from 'src/app/interface/ferie'; // Importa l'interfaccia Ferie
import { FerieService } from 'src/app/services/ferie.service'; // Importa il servizio FerieService per gestire le richieste di ferie

@Component({
  selector: 'app-approve-ferie',
  templateUrl: './approve-requests.component.html',
  styleUrls: ['./approve-requests.component.css']
})
export class ApproveRequestComponent implements OnInit {
  ferieList: Ferie[] = []; // Array per memorizzare le richieste di ferie

  constructor(private ferieService: FerieService) {} // Inietta il servizio FerieService nel costruttore

  ngOnInit(): void {
    this.loadFerieRequests(); // Chiama il metodo per caricare le richieste di ferie all'avvio del componente
  }

  // Metodo privato per caricare le richieste di ferie
  private loadFerieRequests(): void {
    this.ferieService.getAllFerie().subscribe(
      ferieList => {
        // Filtra le richieste di ferie in attesa o con stato nullo
        this.ferieList = ferieList.filter(ferie => ferie.stato === 'In attesa' || ferie.stato === null);
        console.log('Richieste di ferie ricevute:', this.ferieList); // Stampa le richieste di ferie ricevute nella console
      },
      error => {
        console.error('Errore nel recuperare le richieste di ferie:', error); // Gestisce gli errori nel recupero delle ferie
      }
    );
  }
  
  // Metodo per approvare una richiesta di ferie
  approveFerie(ferieId: number): void {
    this.ferieService.approveFerieRequest(ferieId).subscribe(
      response => {
        console.log('Richiesta di ferie approvata con successo', response); // Log della conferma di approvazione
        this.updateFerieStatus(ferieId, 'Approvata'); // Chiamata per aggiornare lo stato della ferie
        this.removeFerieRequestFromList(ferieId); // Rimuove la richiesta di ferie dalla lista
      },
      error => {
        console.error('Errore nell\'approvare la richiesta di ferie', error); // Gestisce gli errori nell'approvazione delle ferie
      }
    );
  }

  // Metodo per rifiutare una richiesta di ferie
  rejectFerie(ferieId: number): void {
    this.ferieService.rejectFerieRequest(ferieId).subscribe(
      response => {
        console.log('Richiesta di ferie rifiutata con successo', response); // Log della conferma di rifiuto
        this.updateFerieStatus(ferieId, 'Rifiutata'); // Chiamata per aggiornare lo stato della ferie
        this.removeFerieRequestFromList(ferieId); // Rimuove la richiesta di ferie dalla lista
      },
      error => {
        console.error('Errore nel rifiutare la richiesta di ferie', error); // Gestisce gli errori nel rifiuto delle ferie
      }
    );
  }

  // Metodo per aggiornare lo stato di una richiesta di ferie
  updateFerieStatus(ferieId: number, stato: string): void {
    this.ferieService.updateFerieStatus(ferieId, stato).subscribe(
      response => {
        console.log('Stato della ferie aggiornato con successo', response); // Log dell'aggiornamento dello stato
        // Non è necessario fare nulla di specifico qui, se la risposta non è un JSON valido
      },
      error => {
        console.error('Errore nell\'aggiornare lo stato della ferie', error); // Gestisce gli errori nell'aggiornamento dello stato delle ferie
        // Gestisci gli errori qui
      }
    );
  }

  // Metodo privato per rimuovere una richiesta di ferie dalla lista
  private removeFerieRequestFromList(ferieId: number): void {
    this.ferieList = this.ferieList.filter(ferie => ferie.id !== ferieId); // Filtra la lista per rimuovere la ferie con l'ID specificato
  }
}
