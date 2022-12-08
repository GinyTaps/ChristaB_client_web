import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { EnginComponent } from './engin/engin.component';
import {DatePipe} from "@angular/common";
import { DepenseComponent } from './depense/depense.component';
import { AvisComponent } from './avis/avis.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NgxSpinnerModule} from "ngx-spinner";
import {NgxPaginationModule} from "ngx-pagination";
import { HistoriqueComponent } from './historique/historique.component';
import { ReservationComponent } from './reservation/reservation.component';
// import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    NavbarComponent,
    EnginComponent,
    DepenseComponent,
    AvisComponent,
    HistoriqueComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    // RouterModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    Storage,
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
