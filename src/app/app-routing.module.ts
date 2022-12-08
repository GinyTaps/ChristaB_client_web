import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {DepenseComponent} from "./depense/depense.component";
import {AvisComponent} from "./avis/avis.component";
import {HistoriqueComponent} from "./historique/historique.component";
import {ReservationComponent} from "./reservation/reservation.component";

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full' }, //la première page sera le formulaire d'authentification

  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent},

  {path: 'depense', component: DepenseComponent, canActivate: [AuthGuard]},

  {path: 'avis', component: AvisComponent, canActivate: [AuthGuard]},

  {path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard]},

  {path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
