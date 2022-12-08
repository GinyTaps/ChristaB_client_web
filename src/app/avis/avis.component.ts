import { Component, OnInit } from '@angular/core';
import {Avis} from "./avis.model";
import {AvisService} from "./avis.service";

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {

  avis: Avis;
  // Pagination
  p: number = 1;
  currentPage = 0;
  size = 5;

  constructor(
    private avisService: AvisService
  ) { }

  ngOnInit(): void {
    this.avisService.getAll().subscribe(data => {
      this.avis = data;
    })
  }

  refreshPage() {
    window.location.reload();
  }



}
