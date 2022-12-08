export class User {

  idUtilisateur?: number;
  nom?: string;
  prenom?: string;
  tel?: number;
  telSos?: number;
  photo?: any;
  typeDocument: string;
  numeroCnib: string;
  dateInscription: string;
  dateDelivrance: string;
  dateExpiration: string;
  lieuDelivrance: string;
  cnib: any;
  cnibR?: any;
  cnibV?: any;
  cnibT?: any;
  idTypeFonction?: any;

  constructor(
    public idAppUser?: number,
    public email?: string,
    public emailOld?: string,
    public password?: string,
    public passwordConfirmed?: string,
    public renewPasswordCode?: number,
    public renewPasswordLimitTime?: any,
    public activated?: number,
    public validated?: number,
    public code?: number,
    public roles?: any,
  )
  { }
}
