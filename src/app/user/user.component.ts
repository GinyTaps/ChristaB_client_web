import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "./user.model";
import {Engin} from "../engin/engin.model";
import {UserService} from "./user.service";
import {EnginService} from "../engin/engin.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {ToastrService} from "ngx-toastr";
import {TypeFonction} from "./typeFonction.model";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  user: User = new User();
  users: User;
  userAdmin: User = new User();
  typeFonctions:TypeFonction;
engins: Engin; // Array<Engin> = new Array<Engin>();
engin: Engin = new Engin();
mode: number;
photo: any;
photoEF: any; photoEP: any; photoEA: any;
photoCGR: any; photoCGV: any;
photoPCR: any; photoPCV: any;
photoAssuR: any; photoAssuV: any;
cnibR: any; cnibV: any; cnibT; any;
showModal: boolean = false;
image: any;
fonction: string;

// Pagination
  p: number = 1;
  currentPage = 0;
  size = 5;

  constructor(
    private toast: ToastrService,
    private authService: AuthenticationService,
    private userService: UserService,
    private enginService: EnginService,
    private loginService: LoginService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.mode = 1;
    this.getAll();
    this.inittialize();

  }

  isAuthenticated() {
    return this.authService.isAdmin();
  }


  getAll() {
    this.userService.getAll().subscribe(data=>{
      this.users = data;
      // console.log(this.users);
    })
  }

  validateUser(){
    if(this.user.validated){

    } else {
      this.userService.validated(this.user).subscribe(res=>{
        // console.log(res);
        this.ngOnInit();
        this.showSuccess();
      })
    }

  }

  showSuccess() {
    this.toast.success("Mail d'activation envoyé avec succès!", 'Validation de compte!');
  }

  inittialize() {
    this.userAdmin = new User();
    this.user = new User();
    this.photo = null;
    this.photoEP = null;
    this.photoCGR = null;
    this.photoPCR = null;
    this.photoAssuR = null;
    this.fonction = null;
    this.cnibR = null;
  }

  backDetail() {
    this.mode = 1;
    this.getAll();
  }

  sanitizeImageUrl(p: string): SafeUrl {
    // console.log(this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + p));
    return this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + p);
  }

  detailsUser(u: User) {
    this.mode = 2;
    this.userService.getByEmail(u.email).subscribe(data=>{
      this.user = data;
      // console.log(this.user);
      let p = this.user.photo;
      if(p != null) {
        let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + p);
        this.photo = this.sanitizeImageUrl(p); // sanitizedUrlP;
        // console.log(sanitizedUrlP);
      }
      let c = this.user.cnib;
      if(c !== null) {
        var cnibRecto = c.split(',')[0];
        if(cnibRecto !== null) {
          let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + c);
          this.cnibR = sanitizedUrlR;
        } else {
          let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + c);
          this.cnibR = sanitizedUrlR;
        }
        /*var cnibRecto = c.split(',')[0];
        var cnibVerso = c.split(',')[1];
        var cnibTenant = c.split(',')[c.split(',').length-1];*/
        // console.log(cnibRecto);
        // let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+cnibRecto);
        // this.cnibR = sanitizedUrlR;
        /*let sanitizedUrlV = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+cnibVerso);
        this.cnibV = sanitizedUrlV;
        let sanitizedUrlT = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+cnibTenant);
        this.cnibT = sanitizedUrlT;*/
      }
      if(this.user.idTypeFonction != 1) {
        this.fonction = 'Passager';
      } else {
        this.fonction = 'Conducteur';
      }
      /************* Appel à ses engins *************/
      this.enginService.getAllByUser(this.user.idUtilisateur).subscribe(data=>{
        let eng: any;
        this.engins = data;
        eng = data;
        // console.log(this.engins);
        for(let e of eng) {
          /*console.log(e);
          console.log(e.photoEngin);*/
          /************ Affichage des photos de l'engins ********/
          let pe = e.photoEngin;
          if(pe !== null) {
            var peProfil = pe.split(',')[1];
            if(peProfil != null) {
              let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + pe);
              this.photoEP = sanitizedUrlP;
              // console.log(this.photoEP);
            } else {
              let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + pe);
              this.photoEP = sanitizedUrlP;
              // console.log(this.photoEP);
            }
            /*var peFace = pe.split(',')[0];
            var peProfil = pe.split(',')[1];
            var peArriere = pe.split(',')[pe.split(',').length-1];*/
            // console.log(cnibRecto);
            /*let sanitizedUrlF = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+peFace);
            this.photoEF = sanitizedUrlF;
            let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+peProfil);
            let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+pe);
            this.photoEP = sanitizedUrlP;*/

            /*let sanitizedUrlA = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+peArriere);
            this.photoEA = sanitizedUrlA;*/
          }
          /************ Affichage des photos de la carte grise ********/
          let cg = e.carteGrise;
          if(cg !== null) {
            var cgRecto = cg.split(',')[0];
            if(cgRecto != null) {
              let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + cgRecto);
              this.photoCGR = sanitizedUrlR;
            } else {
              let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + cg);
              this.photoCGR = sanitizedUrlR;
            }
            /*var cgRecto = cg.split(',')[0];
            var cgVerso = cg.split(',')[1];
            let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+cgRecto);
            let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+cg);
            this.photoCGR = sanitizedUrlR;*/
            /*let sanitizedUrlV = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+cgVerso);
            this.photoCGV = sanitizedUrlV;*/
          }
          /************ Affichage des photos du permis ********/
          let pc = e.photoPermis;
          if(pc !== null) {
            var pcRecto = pc.split(',')[0];
            if(pcRecto != null) {
              let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + pcRecto);
              this.photoPCR = sanitizedUrlR;
            } else {
              let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + pc);
              this.photoPCR = sanitizedUrlR;
            }
            /*var pcRecto = pc.split(',')[0];
            var pcVerso = pc.split(',')[1];
            let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+pcRecto);
            let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+pc);
            this.photoPCR = sanitizedUrlR;*/
            /*let sanitizedUrlV = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+pcVerso);
            this.photoPCV = sanitizedUrlV;*/
          }
          /************ Affichage des photos de l'assurance ********/
          let assur = e.photoAssurance;
          if(assur !== null) {
            var assurRecto = assur.split(',')[0];
            if(assurRecto != null) {
              let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + assurRecto);
              this.photoAssuR = sanitizedUrlR;
            } else {
              let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + assur);
              this.photoAssuR = sanitizedUrlR;
            }
            /*var assurRecto = assur.split(',')[0];
            var assurVerso = assur.split(',')[1];
            let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+assurRecto);
            let sanitizedUrlR = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+assur);
            this.photoAssuR = sanitizedUrlR;*/
            /*let sanitizedUrlV = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl+assurVerso);
            this.photoAssuV = sanitizedUrlV;*/
          }
          /************** Fin ***********/
        }

      })
    });
    this.userService.getUser(u.email).subscribe(data=>{
      this.userAdmin = data;
      // console.log(this.userAdmin.validated);
      if(!this.userAdmin.validated) {
      }
    })
  }

  /************* Edition *************/

  getAllTF() {
    this.userService.getAllFonctions().subscribe(data=>{
      this.typeFonctions = data;
    })
  }

  editUser(u: User) {
      this.mode = 3;
      this.getAllTF();
      this.userService.getByEmail(u.email).subscribe(data=>{
        this.user = data;
        console.log(this.user);
        let p = this.user.photo;
        if(p != null) {
          let sanitizedUrlP = this.sanitizer.bypassSecurityTrustUrl(this.userService.fileUrl + p);
          this.photo = sanitizedUrlP;
        }
      });
  }


  selectTypeFonction(e:any) {
    console.log(e.target);
    console.log(e.target.value);
    this.user.idTypeFonction = e.target.value;
  }

  showEditSuccess() {
    this.toast.success("Compte édité avec succès", 'Edition');
  }

  showEditFail() {
    this.toast.error("Compte non édité", 'Echec');
  }

  save() {
    console.log(this.user);
      this.userService.editUser(this.user).subscribe(res=>{
        console.log(res);
        this.ngOnInit();
        this.showEditSuccess();
      }, error => {
        this.showEditFail();
      });
  }

  retour(){
    this.ngOnInit();
  }

  logOut() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  disableUser(u: User) {
    /*this.userService.disable(u).subscribe(res=>{
      console.log(res);
    });*/
  }

  showDisableSuccess() {
    this.toast.success("Compte désactivé avec succès", 'Activation');
  }

  /********** Pour élargir la photo **********/
  show(img: any) {
    this.showModal = true;
    this.image = img;
  }

  hide() {
    this.showModal = false;
  }

  refreshPage() {
    window.location.reload();
  }
}
