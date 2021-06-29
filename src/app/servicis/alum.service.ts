import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class AlumService {

  cash: number;
  alumn: any;
  imageUrl: any [] = [];

  constructor(private http: HttpClient) { 

    this.cash = 20;
  }

  public GetForm() {
    //console.log(formData);

    console.log('Germans?');
   return this.http.post<any>(`${ base_url }/usuarios/germans`, this.alumn);  


  }

  public GetUsuari() {
    //console.log(formData);
    console.log('Ja ets membre de lampa?');
   return this.http.post<any>(`${ base_url }/usuarios/usuari`, this.alumn);  


  }

  charge( ){

    this.alumn.images = this.imageUrl;

    console.log('Guardando el usuario');
    return this.http.post<any>(`${ base_url }/usuarios/pagar`, {
      usuario: this.alumn 
    } );

  }

  PrePayment (cantidad:number ) {

    return this.http.post<any>(`${ base_url }/usuarios/secret`, {
      cantidad: cantidad,
      usuario: this.alumn 
    } );

  }

}
 