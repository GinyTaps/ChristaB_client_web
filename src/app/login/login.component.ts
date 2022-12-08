import { Component, OnInit } from '@angular/core';
import {User} from "../user/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication.service";
import {UserService} from "../user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*routeSub: any;
  recover_key: boolean = false;
  key_step: boolean = false;
  email_sent: boolean = false;
  email_valid: boolean = false;
  authorityRes: boolean;*/

  user:User = new User();
  users:User;
  check: boolean;

  errorEmail: string;
  errorPwd: string;
  errorCode: string;
  showE: boolean = false; //pour afficher le mesage d'erreur
  showP: boolean = false;
  showC: boolean = false;
  mode: number;
  loading: any;
  passConf: string;
  btnClicked: boolean;


  /*keyForm = new FormGroup({
    code: new FormControl('', Validators.required),
    newpass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confpass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', Validators.email)
  });*/

  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  recoverKey: boolean = false;
  keyStep: boolean = false;
  emailSent: boolean = false;
  emailValid: boolean = false;
  checkKeyStep: boolean = false;
  keyForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newpass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confpass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.pattern(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ), Validators.required])
  });
  errorMail: string;


  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private loginService: LoginService,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    public activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    // this.key_step = true;
    this.mode = 1;

  }

  previousState() {
    window.history.back();
    // this.location.back();
  }

  checkEmail(e: any) {
    // console.log(e.data);
    if( e.data !== this.user.email) {
      this.showP = false;
    }
  }

  checkPass(e: any) {
    // console.log(e.data);
    if( e.data !== this.user.password) {
      this.showP = false;
    }
  }

  onLogin(d){
    // this.btnClicked = true;
    this.spinner.show(undefined, {type: 'ball-spin-clockwise',
      color: 'blue', fullScreen: true});
    setTimeout((ev) => {
      this.loginService.login(d).subscribe((res) => {
        let jwt = res.headers.get('Authorization');
        this.authService.saveToken(jwt);
        if (res.status === 200) {
          console.log(res.status);
          this.userService.getByEmail(this.user.email).subscribe(data => {
            this.users = data;
            this.spinner.hide();
            // console.log(this.users);
            this.loginService.loadCurrentUserId(this.users.idUtilisateur);
            this.loginService.loadCurrentUserF(this.users.idTypeFonction);
            this.isAuthorised(this.users.idUtilisateur);
            // this.isAuthorised(this.users.idTypeFonction);
          });
          // this.btnClicked = false;
        } else {
          console.log(res.status);
          this.spinner.hide();
          this.showP = true;
          this.errorPwd = 'Mot de passe ou email incorrecte';
          console.log(res.status);
          // console.log(res.body);
          this.btnClicked = false;
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.showP = true;
        this.errorPwd = 'Mot de passe ou email incorrecte';
        this.btnClicked = false;
      });
    });
  }

  isAuthorised(id) {
    // console.log(id);
    if(id as number == 1 || id as number == 7) {
      console.log('****** Autorisé ******');
      this.router.navigateByUrl('/home');
    } else {
      this.authService.initCredentials();
      console.log('****** Pas autorisé ******');
      this.showP = true;
      this.errorPwd = 'Impossible de se connecter avec ces identifiants';
      this.router.navigateByUrl('/login');
    }
  }

  isAuthenticated() {
    return this.authService.isAdmin();
  }

  isAllowed() {
    return (this.authService.isAdmin()) || (this.authService.isUser() && +localStorage.getItem('ID_User') == 7);
  }

  /*************** Ré-initialisation du mot de passe ***************/

  initPassword() {
    this.mode = 2;
    this.emailValid = true;
  }

  RecoverKey() {
    this.mode = 2;
  }

  CheckEmail() {
    if (this.user.email && this.re.test(this.user.email)) {
      this.emailValid = true;
      this.SendEmail();
    } else {
      this.emailValid = false;
      this.errorMail = 'Entrer une adresse mail valide';
    }
  }

  checkCode(e: any) {
    if (e.target.value.length != 6) {
      this.showC = true;
      this.errorCode = 'Longueur du code incorrecte';
    } else {
      this.showC = false;
      this.errorCode = '';
    }
  }

  KeyStep() {
    this.loginService.verifCode(this.user.email, this.user.code).subscribe(data => {
      if (data) {
        this.keyStep = this.keyForm.controls['code'].value === this.user.renewPasswordCode;
        this.emailSent = false;
        this.showC = false;
        this.mode = 4;
      } else {
        this.showC = true;
        this.errorCode = 'Code incorrecte';
      }
    });
  }

  SendEmail() {
    this.spinner.show(undefined, {type: 'ball-spin-clockwise',
      color: 'blue', fullScreen: true});
    setTimeout(() => {

      this.loginService.recupPass(this.user.email).subscribe((res) => {
        console.log(res.status);
        if (res.status == 200) {
          this.spinner.hide();
          this.checkKeyStep = true;
          this.mode = 3;
        } else {
          this.spinner.hide();
          this.mode = 2;
          this.emailValid = false;
          this.errorMail = 'Email incorrecte ou inexistant sur le serveur';
        }
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        this.mode = 2;
        this.emailValid = false;
        this.errorMail = 'Email incorrecte ou inexistant sur le serveur';
      });
    });
  }
  showToast() {
    this.toast.success("Mot de passe réinitialisé avec succès", '');
  }

  initialize() {
    this.mode = 1;
    this.user = new User();
  }

  changePass(data) {
    this.spinner.show(undefined, {type: 'ball-spin-clockwise',
      color: 'blue', fullScreen: true});
    setTimeout((ev) => {
      console.log(ev);

    if (this.keyForm.controls['newpass'].value != this.keyForm.controls['confpass'].value) {
      this.spinner.hide();
      console.log('An error occured');
    } else {
      this.loginService.reInitPass(this.user).subscribe(res => {
        if (res.status == 200) {
          this.spinner.hide();
          this.initialize();
          this.showToast();
        }
      }, error => {
        this.spinner.hide();
      });
    }
    });
  }

  //user pass recovery step 1 show the section
  /*RecoverKey(){
    this.recover_key = !this.recover_key;
    this.email_sent = false;
  }

  CheckEmail(email: string): boolean{
    ////Request to check if the entered email is valid ---------------------------------------
    return true;
  }

  //user pass recovery step 2:: send email
  SendEmail(){
    this.email_valid = (this.keyForm.controls['email'].valid  && this.CheckEmail(this.keyForm.controls['email'].value));
    if(this.email_valid) {
      this.loginService.recupPass(this.user.email).subscribe(res => {
        if(res) {
          // console.log(res)
          this.email_sent = true;
        } else {
          this.email_sent = false;
        }
      });
      // console.log(this.email_sent);
      return this.email_sent; //  = this.check;

      /!*if(this.email_valid){
        //Send email request here ------------------------------------------------
        console.log('Email sent!!!');
        this.email_sent = true;
      }*!/
    }
  }

  //code sent to email. The users enterd the right key
  KeyStep(){
    //Checking key here -------------------------------------------------
    //this.key_step = this.authService.username === 'mykey'; //replace username by user code (sample)
    // this.key_step = this.keyForm.controls['code'].value === 'mykey';
    this.loginService.verifCode(this.user.email, this.user.renewPasswordCode).subscribe(data => {
      if(data) {
        this.key_step = this.keyForm.controls['code'].value === this.user.renewPasswordCode;
      } else {
        this.key_step = false;
      }
    });
  }

  //FINAL STEP ON PASSWORD RECOVERY
  changePass(){
    //checking that the two passwords aren't diffrent
    if(this.keyForm.controls['newpass'].value != this.keyForm.controls['confpass'].value)
      console.log('An error occured');

    else{
      this.loginService.reInitPass(this.user, this.keyForm.controls['confpass'].value,
        this.keyForm.controls['email'].value, this.keyForm.controls['code'].value).subscribe(res => {
        // console.log(res);
        this.onSaveSuccess(res);
      });
      console.log('password change success!');
      this.recover_key = !this.recover_key;
    }
  }

  subscribeToSaveResponse(result: Observable<User>) {
    result.subscribe((res: User) => {
      this.onSaveSuccess(res);
    });
  }
  /!*private onSaveSuccess( result ) {
    this.eventManager.broadcast( { name: 'userListModification'} );
    // this.ngOnInit();
    this.router.navigateByUrl('/login');
  }*!/
*/

}
