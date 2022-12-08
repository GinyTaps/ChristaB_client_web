import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Urls {

  /*************** Air box adresse ip *************/
  public urlAirBoxRes = 'http://192.168.1.152:8082/';
  public urlAirBoxSec = 'http://192.168.1.152:8087/';
  public urlAirBoxPaie = 'http://192.168.1.152:8088/';

  /*************** Bafa adresse ip *************/
  public urlBafaRes = 'http://192.168.1.18:8082/';
  public urlBafaSec = 'http://192.168.1.18:8087/';
  public urlBafaPaie = 'http://192.168.1.18:8088/';

  /*public urlBafaRes = 'http://192.168.43.241:8082/';
  public urlBafaSec = 'http://192.168.43.241:8087/';
  public urlBafaPaie = 'http://192.168.43.241:8088/';*/

  /**************** One plus 6 adresse ip ********/
  /*public urlOnePlusRes = 'http://192.168.43.207:8082';
  public urlOnePlusSec = 'http://192.168.43.207:8087';
  public urlOnePlusPaie = 'http://192.168.43.207:8088';*/

  /*************** Adresse locale *************/
  public urlLocalRes = 'http://localhost:8082/';
  public urlLocalSec = 'http://localhost:8087/';
  public urlLocalPaie = 'http://localhost:8088/';

  /*************** Adresse du déploiement *************/
  public urlResT = 'https://christab.herokuapp.com/';
  public urlSecT = 'https://christabsecurity.herokuapp.com/';
  public urlPaieT = 'https://christabsecurity.herokuapp.com/';

  /*************** Adresse du déploiement définitif *************/

  /*public urlRes = 'https://christabres.herokuapp.com/';
    public urlSec = 'https://christabsec.herokuapp.com/';
    public urlPaie = 'https://christabpaie.herokuapp.com/';*/

  /************* Adresse ip utilisée *********/
  public urlUsedRes = this.urlRes;
  public urlUsedAvis = this.urlAvis;
  public urlUsedhisto = this.urlHisto;
  public urlUsedResIm = this.urlImg;
  public urlUsedSec = this.urlSec;
  public urlUsedPaie = this.urlPaie;

  /*public urlUsedRes = this.urlBafaRes;
  public urlUsedSec = this.urlBafaSec;
  public urlUsedPaie = this.urlBafaPaie;
  public urlUsedResIm = this.urlImg;*/


}

