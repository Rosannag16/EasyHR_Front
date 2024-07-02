import { Component, OnInit } from '@angular/core';
import { PermessoService } from 'src/app/services/permesso.service';
import { Permessi } from 'src/app/interface/permessi';

@Component({
  selector: 'app-permessi-list',
  templateUrl: './permessi-list.component.html',
  styleUrls: ['./permessi-list.component.css']
})
export class PermessiListComponent implements OnInit {

  permessi!: Permessi[];

  constructor(private permessiService: PermessoService) { }

  ngOnInit(): void {
    this.permessiService.getAllPermessis().subscribe(
      (data) => {
        this.permessi = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

}
