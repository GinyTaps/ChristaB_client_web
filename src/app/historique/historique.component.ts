import { Component, OnInit } from '@angular/core';
import {Historique} from "./historique.model";
import {HistoriqueService} from "./historique.service";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  histos: Historique;
  // Pagination
  p: number = 1;
  currentPage = 0;
  size = 5;

  constructor(
    private histoService: HistoriqueService
  ) { }

  ngOnInit(): void {
    this.histoService.getAll().subscribe(data =>{
      this.histos = data;
    })
  }

  refreshPage() {
    window.location.reload();
  }

}
