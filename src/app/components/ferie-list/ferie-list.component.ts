import { Component, OnInit } from '@angular/core';
import { FerieService } from 'src/app/services/ferie.service';
import { Ferie } from 'src/app/interface/ferie';

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
