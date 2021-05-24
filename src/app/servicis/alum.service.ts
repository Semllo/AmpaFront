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

  constructor(private http: HttpClient) { 

    this.cash = 0;
  }

  public GetForm( formData: any ) {
    //console.log(formData);

   return this.http.post<any>(`${ base_url }/usuarios/germans`, formData.value);  


  }

  charge( cantidad:number, tokenID:String ){

    return this.http.post<any>(`${ base_url }/usuarios/pagar`, {
      cantidad: cantidad,
      stripeToken: tokenID,
      usuario: this.alumn 
    } ).toPromise();

  }

}
 