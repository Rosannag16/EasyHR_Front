import { Component, OnInit } from '@angular/core';
import { PermessoService } from 'src/app/services/permesso.service'; // Importa il servizio PermessoService per gestire i permessi
import { Permessi } from 'src/app/interface/permessi'; // Importa l'interfaccia Permessi per definire la struttura dei dati dei permessi

@Component({
  selector: 'app-permessi-list', // Selettore del componente
  templateUrl: './permessi-list.component.html', // Percorso del file HTML del template del componente
  styleUrls: ['./permessi-list.component.css'] // Array di percorsi dei file CSS di stile del componente
})
export class PermessiListComponent implements OnInit {

  permessi!: Permessi[]; // Array di permessi, inizializzato con '!' per indicare che è inizialmente non definito

  constructor(private permessiService: PermessoService) { } // Inietta PermessoService nel costruttore del componente

  ngOnInit(): void {
    // Al momento dell'inizializzazione del componente, richiede i permessi al servizio PermessoService
    this.permessiService.getAllPermessis().subscribe(
      (data) => {
        this.permessi = data; // Assegna i dati dei permessi ricevuti dalla risposta alla variabile permessi
      },
      (error) => {
        console.error('Error fetching employees', error); // Gestisce gli errori nel recupero dei permessi
      }
    );
  }

}
