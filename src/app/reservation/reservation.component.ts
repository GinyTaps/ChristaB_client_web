import { Component, OnInit } from '@angular/core';
import {Reservation} from "./reservation.model";
import {AuthenticationService} from "../authentication.service";
import {ReservationService} from "./reservation.service";
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation: Reservation = new Reservation();
  reservations: Array<Reservation>;
  user: User = new User();
  users: User;
  userName: string;

  // Pagination
  p: number = 1;
  currentPage = 0;
  size = 5;

  constructor(
    private authService: AuthenticationService,
    private reservationService: ReservationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllCancelled();
  }

  getAllCancelled() {
    this.reservationService.getAllCancelled().subscribe(data=>{
      this.reservations = data;
    })
  }

  showUser(id: number) {
    if(id != undefined) {
      this.userService.getById(id).subscribe(data=>{
        this.user = data;
        console.log(this.user);
        this.userName = this.user.nom+'-'+this.user.prenom;
      });
    }
    console.log('Infos user: '+this.userName);
    return this.userName;
  }

  detailsReservation(r: Reservation) {

  }


}
