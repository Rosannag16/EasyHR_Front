import { Component, OnInit } from '@angular/core';
import { FerieService } from 'src/app/services/ferie.service'; // Importa il servizio FerieService per gestire le ferie
import { Ferie } from 'src/app/interface/ferie'; // Importa l'interfaccia Ferie per definire la struttura delle ferie

@Component({
  selector: 'app-ferie-list', // Selettore del componente
  templateUrl: './ferie-list.component.html', // Percorso del file HTML del template del componente
  styleUrls: ['./ferie-list.component.css'] // Array di percorsi dei file CSS di stile del componente
})
export class FerieListComponent implements OnInit {

  ferieList!: Ferie[]; // Array di ferie, inizializzato come vuoto

  constructor(private ferieService: FerieService) { } // Inietta il servizio FerieService nel costruttore

  ngOnInit(): void {
    // Metodo del ciclo di vita del componente, chiamato all'avvio
    this.ferieService.getAllFerie().subscribe(
      (data) => { // Callback per gestire la risposta di successo
        this.ferieList = data; // Assegna i dati delle ferie ottenuti dal servizio alla variabile ferieList del componente
      },
      (error) => { // Callback per gestire l'errore
        console.error('Error fetching ferie', error); // Stampa un messaggio di errore nella console se il recupero delle ferie fallisce
      }
    );
  }
}
