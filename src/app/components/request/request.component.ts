// import { Component, OnInit } from '@angular/core';
// import { RequestService } from '../request.service';
// import { Ferie } from '../ferie';
// import { Permessi } from '../permessi';

// @Component({
//   selector: 'app-request',
//   templateUrl: './request.component.html',
//   styleUrls: ['./request.component.css']
// })
// export class RequestComponent implements OnInit {

//   ferieList: Ferie[] = [];
//   permessiList: Permessi[] = [];

//   constructor(private requestService: RequestService) { }

//   ngOnInit(): void {
//     this.loadFerieRequests();
//     this.loadPermessiRequests();
//   }

//   private loadFerieRequests(): void {
//     this.requestService.getAllFerieRequests()
//       .subscribe(
//         ferieList => {
//           this.ferieList = ferieList;
//           console.log('Ferie ricevute:', this.ferieList);
//         },
//         error => {
//           console.error('Errore durante il recupero delle richieste di ferie', error);
//         }
//       );
//   }

//   private loadPermessiRequests(): void {
//     this.requestService.getAllPermessiRequests()
//       .subscribe(
//         permessiList => {
//           this.permessiList = permessiList;
//           console.log('Permessi ricevuti:', this.permessiList);
//         },
//         error => {
//           console.error('Errore durante il recupero delle richieste di permessi', error);
//         }
//       );
//   }

// }
