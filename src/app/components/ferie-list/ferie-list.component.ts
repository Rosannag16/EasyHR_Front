import { Component, OnInit } from '@angular/core';
import { FerieService } from '../ferie.service';
import { Ferie } from '../ferie';

@Component({
  selector: 'app-ferie-list',
  templateUrl: './ferie-list.component.html',
  styleUrls: ['./ferie-list.component.css']
})
export class FerieListComponent implements OnInit {

  ferieList!: Ferie[];

  constructor(private ferieService: FerieService) { }

  ngOnInit(): void {
    this.ferieService.getAllFerie().subscribe(
      (data) => {
        this.ferieList = data;
      },
      (error) => {
        console.error('Error fetching ferie', error);
      }
    );
  }
}
