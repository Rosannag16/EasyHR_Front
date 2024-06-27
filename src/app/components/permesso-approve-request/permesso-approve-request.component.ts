import { Component, OnInit } from '@angular/core';
import { Permessi } from '../permessi';
import { PermessoService } from '../permesso.service';

@Component({
  selector: 'app-permesso',
  templateUrl: './permesso-approve-request.component.html',
  styleUrls: ['./permesso-approve-request.component.css']
})
export class PermessoApproveRequestComponent implements OnInit {
  permessoList: Permessi[] = [];

  constructor(private permessoService: PermessoService) {}

  ngOnInit(): void {
    this.loadPermessi();
  }

  private loadPermessi(): void {
    this.permessoService.getAllPermessi().subscribe(
      (permessiList: Permessi[]) => {
        this.permessoList = permessiList.filter(permesso => permesso.stato === 'In attesa' || permesso.stato === null);
        console.log('Richieste di permesso ricevute:', this.permessoList);
      },
      (error) => {
        console.error('Errore nel recuperare i permessi:', error);
      }
    );
  }
  
  

  approvePermesso(permessoId: number): void {
    this.permessoService.approvePermessiRequest(permessoId).subscribe(
      response => {
        console.log('Richiesta di permesso approvata con successo', response);
        this.updatePermessoStatus(permessoId, 'Approvato');
      },
      error => {
        console.error('Errore nell\'approvare la richiesta di permesso', error);
      }
    );
  }

  rejectPermesso(permessoId: number): void {
    this.permessoService.rejectPermessiRequest(permessoId).subscribe(
      response => {
        console.log('Richiesta di permesso rifiutata con successo', response);
        this.updatePermessoStatus(permessoId, 'Rifiutato');
      },
      error => {
        console.error('Errore nel rifiutare la richiesta di permesso', error);
      }
    );
  }

  updatePermessoStatus(id: number, stato: string): void {
    this.permessoService.updatePermessoStatus(id, stato).subscribe(
      (response) => {
        console.log('Risposta dal server:', response);
        this.removePermessoRequestFromList(id);
      },
      (error) => {
        console.error('Errore nell\'aggiornare lo stato del permesso:', error);
      }
    );
  }

  private removePermessoRequestFromList(permessoId: number): void {
    this.permessoList = this.permessoList.filter(permesso => permesso.id !== permessoId);
  }

}
