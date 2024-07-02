import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dipendente',
  templateUrl: './dipendente.component.html',
  styleUrls: ['./dipendente.component.css']
})
export class DipendenteComponent implements OnInit {
  dataLavoro: string = '';
  inizioOraLavoro: string = '08:00';
  fineOraLavoro: string = '18:00';
  oreStandard: number = 8;
  oreStraordinario: number = 0;
  aggiornatoMessage: string = '';

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    // Esegui eventuali operazioni di inizializzazione qui
  }

  updateWorkHours(): void {
    this.submitWorkHours();
  }

  private submitWorkHours(): void {
    const userId = this.authService.getUserId();
    if (userId === -1) {
      console.error('User ID is invalid. Ensure the user is logged in.');
      return;
    }

    const updateData = {
      dataLavoro: this.dataLavoro || null,
      inizioOraLavoro: this.inizioOraLavoro,
      fineOraLavoro: this.fineOraLavoro,
      oreLavorate: 0,
      oreStraordinario: 0
    };

    this.userService.updateUserWorkHours(userId, updateData).subscribe(
      response => {
        console.log('Risposta dal server:', response);
        console.log('Orari di lavoro aggiornati con successo', response);
        this.aggiornatoMessage = 'Aggiornato!';
      },
      error => {
        console.error('Errore durante l\'aggiornamento degli orari di lavoro', error);
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
