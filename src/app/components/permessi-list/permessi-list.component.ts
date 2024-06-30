import { Component, OnInit } from '@angular/core';
import { PermessoService } from '../permesso.service';
import { Permessi } from '../permessi';

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
