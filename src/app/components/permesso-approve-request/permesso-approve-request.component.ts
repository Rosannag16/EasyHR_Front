import { Component, OnInit } from '@angular/core';
import { Permessi } from 'src/app/interface/permessi';
import { PermessoService } from 'src/app/services/permesso.service';

@Component({
  selector: 'app-permesso',
  templateUrl: './permesso-approve-request.component.html',
  styleUrls: ['./permesso-approve-request.component.css']
})
export class PermessoApproveRequestComponent implements OnInit {
  permessoList: Permessi[] = []; // Array per memorizzare la lista di permessi in attesa

  constructor(private permessoService: PermessoService) {}

  ngOnInit(): void {
    this.loadPermessi(); // Metodo per caricare i permessi in attesa all'inizializzazione del componente
  }

  private loadPermessi(): void {
    this.permessoService.getAllPermessi().subscribe(
      (permessiList: Permessi[]) => {
        // Filtra i permessi per mostrarne solo quelli in attesa o non ancora stati
        this.permessoList = permessiList.filter(permesso => permesso.stato === 'In attesa' || permesso.stato === null);
        console.log('Richieste di permesso ricevute:', this.permessoList);
      },
      (error) => {
        console.error('Errore nel recuperare i permessi:', error);
      }
    );
  }
  
  // Metodo per approvare una richiesta di permesso
  approvePermesso(permessoId: number): void {
    this.permessoService.approvePermessiRequest(permessoId).subscribe(
      response => {
        console.log('Richiesta di permesso approvata con successo', response);
        this.updatePermessoStatus(permessoId, 'Approvato'); // Aggiorna lo stato del permesso dopo l'approvazione
      },
      error => {
        console.error('Errore nell\'approvare la richiesta di permesso', error);
      }
    );
  }

  // Metodo per rifiutare una richiesta di permesso
  rejectPermesso(permessoId: number): void {
    this.permessoService.rejectPermessiRequest(permessoId).subscribe(
      response => {
        console.log('Richiesta di permesso rifiutata con successo', response);
        this.updatePermessoStatus(permessoId, 'Rifiutato'); // Aggiorna lo stato del permesso dopo il rifiuto
      },
      error => {
        console.error('Errore nel rifiutare la richiesta di permesso', error);
      }
    );
  }

  // Metodo per aggiornare lo stato di un permesso nella lista dopo l'approvazione o il rifiuto
  updatePermessoStatus(id: number, stato: string): void {
    this.permessoService.updatePermessoStatus(id, stato).subscribe(
      (response) => {
        console.log('Risposta dal server:', response);
        this.removePermessoRequestFromList(id); // Rimuove la richiesta di permesso dalla lista visualizzata
      },
      (error) => {
        console.error('Errore nell\'aggiornare lo stato del permesso:', error);
      }
    );
  }

  // Metodo privato per rimuovere una richiesta di permesso dalla lista visualizzata
  private removePermessoRequestFromList(permessoId: number): void {
    this.permessoList = this.permessoList.filter(permesso => permesso.id !== permessoId);
  }

}
