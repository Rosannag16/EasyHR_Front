import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dipendente',
  templateUrl: './dipendente.component.html',
  styleUrls: ['./dipendente.component.css']
})
export class DipendenteComponent implements OnInit {

  userId: number = 0; // Inizializza userId con un valore di default, ad esempio 0
  dataLavoro: string = ''; // Nuova data di lavoro
  inizioOraLavoro: string = '08:00'; // Orario di inizio lavoro predefinito (8:00 AM)
  fineOraLavoro: string = '18:00'; // Orario di fine lavoro predefinito (6:00 PM)
  oreStandard: number = 8; // Ore standard di lavoro (8 ore)
  oreStraordinario: number = 0; // Ore di straordinario (inizialmente 0 ore)
  aggiornatoMessage: string = ''; // Messaggio da mostrare quando l'aggiornamento è completato

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Inizializza dati se necessario
  }

  updateWorkHours(): void {
    // Validazione dell'orario di inizio lavoro
    if (!this.validateTime(this.inizioOraLavoro)) {
      console.error('L\'orario di inizio deve essere compreso tra 8:00 e 20:00 e essere multiplo di 15 minuti.');
      return;
    }

    // Validazione dell'orario di fine lavoro
    if (!this.validateTime(this.fineOraLavoro)) {
      console.error('L\'orario di fine deve essere compreso tra 8:00 e 20:00 e essere multiplo di 15 minuti.');
      return;
    }

    // Calcolo delle ore effettive di lavoro
    const inizio = new Date(`2000-01-01T${this.inizioOraLavoro}`);
    const fine = new Date(`2000-01-01T${this.fineOraLavoro}`);

    // Verifica che l'orario di fine sia maggiore o uguale all'orario di inizio
    if (fine < inizio) {
      console.error('L\'orario di fine deve essere maggiore o uguale all\'orario di inizio');
      return;
    }

    // Calcola la durata effettiva di lavoro in ore
    let oreLavorate = (fine.getTime() - inizio.getTime()) / 1000 / 60 / 60;

    // Verifica se sono state superate le ore standard di lavoro
    if (oreLavorate > this.oreStandard) {
      this.oreStraordinario = oreLavorate - this.oreStandard;
      oreLavorate = this.oreStandard; // Imposta le ore standard al massimo consentito
    } else {
      this.oreStraordinario = 0;
    }

    // Costruisci il payload per l'aggiornamento delle ore di lavoro
    const updateData = {
      data: this.dataLavoro,
      inizioOraLavoro: this.inizioOraLavoro,
      fineOraLavoro: this.fineOraLavoro,
      oreLavorate: oreLavorate,
      oreStraordinario: this.oreStraordinario
    };

    // Invia la richiesta di aggiornamento al servizio UserService
    this.userService.updateUserWorkHours(this.userId, updateData)
      .subscribe(
        response => {
          console.log('Orari di lavoro aggiornati con successo', response);
          this.aggiornatoMessage = 'Aggiornato!';
          // Esegui altre azioni come aggiornare l'interfaccia utente o mostrare un messaggio di successo
        },
        error => {
          console.error('Errore durante l\'aggiornamento degli orari di lavoro', error);
          // Gestisci l'errore adeguatamente
        }
      );
  }

  private validateTime(time: string): boolean {
    const pattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return pattern.test(time) && time >= '08:00' && time <= '20:00' && this.isMultipleOf15(time);
  }

  private isMultipleOf15(time: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    return minutes % 15 === 0;
  }

}
