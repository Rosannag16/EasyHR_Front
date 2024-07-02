import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/interface/user-dto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: UserDTO[]; // Array di oggetti UserDTO per memorizzare gli utenti recuperati

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Quando il componente viene inizializzato, carica la lista degli utenti
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data; // Assegna i dati degli utenti recuperati dalla chiamata al servizio
      },
      (error) => {
        console.error('Error fetching users', error); // Gestisce gli errori durante il recupero degli utenti
      }
    );
  }
}
