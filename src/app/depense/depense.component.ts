import { Component, OnInit } from '@angular/core';
import {Depense} from "./depense.model";
import {DepenseService} from "./depense.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  depenses: Depense;
  depense: Depense = new Depense();
  users: User;
  user: User = new User();
  mode: number;
  solde: number = 0;
  photo: any;
  show: boolean = false;

  // Pagination
  p: number = 1;
  currentPage = 0;
  size = 5;


  constructor(
    private depenseService: DepenseService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.mode = 1;
  }

  refreshPage() {
    window.location.reload();
  }

  getAll() {
    this.depenseService.getAll().subscribe(data=>{
      this.depenses = data;
    });
    this.userService.getAll().subscribe(data=>{
      // console.log(data);
      if(data.length >0) {
        let arr = data.filter(item => item.idTypeFonction == 1);
        // console.log(arr);
        this.users = arr;
      }
    })

  }

  detailsUser(u: User) {
    this.mode = 2;
    this.userService.getByEmail(u.email).subscribe(data=>{
      this.user = data;
      // console.log(this.user);
      let p = this.user.photo;
      if(p != null) {
        let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+p);
        this.photo = sanitizedUrlP;
      }
    });
      /************* Appel à ses trajets terminés *************/
      this.depenseService.getAllByUser(this.user.idUtilisateur).subscribe(data=>{
        this.depenses = data;
        for(var i = 0; i < Array(this.depenses).length; ++i){
          if(Array(this.depenses)[i].crediter){
            this.show = true;
            this.solde += Array(this.depenses)[i].montantDecompte;
          }
        }
        console.log(this.solde);
      });
  }

  payer() {
    this.depense.debiter = true;
      this.depenseService.update(this.depense).subscribe(res=>{
        console.log(res);
        this.solde = 0;
        this.show = false;
        this.mode = 1;
      });
  }

  retour(){
    this.ngOnInit();
  }

}
