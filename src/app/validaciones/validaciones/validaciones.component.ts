import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrls: ['./validaciones.component.css']
})
export class ValidacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static tel(control: FormControl): ValidationErrors | null {
    let nro = control.value;
    if( !(/^\d{9}$/.test(nro)) ) {
      return {valido: true};
    } else {
      return null;
    }
  }

  static DNI(control: FormControl): ValidationErrors | null {
    
  
    // console.log(control);
    let nro = control.value;
    return ValidacionesComponent.DNIC(nro);
  }

 
  static DNIC(nro:any): ValidationErrors | null {



    let dni = nro;


    var numero, lete, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        lete = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != lete) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return {DNI: false};
        }else{
            //alert('Dni correcto');
            return null;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return {DNI: false};
    }
    





   //console.log(nro);
   /*
    if(nro)
    letra = (nro.substring(0, nro.length - 1)) % 23;
    switch (letra) {
      case 0:
      if (nro.charAt(nro.length - 1) == 'T') {
        return null;
      } else { return {DNI: false} }
      case 1:
        if (nro.charAt(nro.length - 1) == 'R') {
          return null;
        } else { return {DNI: false} }
      case 2:
        if (nro.charAt(nro.length - 1) == 'W') {
          return null;
        } else { return {DNI: false} }
      case 3:
        if (nro.charAt(nro.length - 1) == 'A') {
          return null;
        } else { return {DNI: false} }
      case 4:
        if (nro.charAt(nro.length - 1) == 'G') {
          return null;
        } else { return {DNI: false} }
      case 5:
        if (nro.charAt(nro.length - 1) == 'M') {
          return null;
        } else { return {DNI: false} }
      case 6:
        if (nro.charAt(nro.length - 1) == 'Y') {
          return null;
        } else { return {DNI: false} }
        case 7:
          if (nro.charAt(nro.length - 1) == 'F') {
            return null;
          } else { return {DNI: false} }
      case 8:
        if (nro.charAt(nro.length - 1) == 'P') {
          return null;
        } else { return {DNI: false} }
      case 9:
        if (nro.charAt(nro.length - 1) == 'D') {
          return null;
        } else { return {DNI: false} }
        break;
      case 10:
        if (nro.charAt(nro.length - 1) == 'X') {
          return null;
        } else { return {DNI: false} }
      case 11:
        if (nro.charAt(nro.length - 1) == 'B') {
          return null;
        } else { return {DNI: false} }
      case 12:
        if (nro.charAt(nro.length - 1) == 'N') {
          return null;
        } else { return {DNI: false} }
      case 13:
        if (nro.charAt(nro.length - 1) == 'J') {
          return null;
        } else { return {DNI: false} }
      case 14:
        if (nro.charAt(nro.length - 1) == 'Z') {
          return null;
        } else { return {DNI: false} }
      case 15:
        if (nro.charAt(nro.length - 1) == 'S') {
          return null;
        } else { return {DNI: false} }
      case 16:
        if (nro.charAt(nro.length - 1) == 'Q') {
          return null;
        } else { return {DNI: false} }
      case 17:
        if (nro.charAt(nro.length - 1) == 'V') {
          return null;
        } else { return {DNI: false} }
      case 18:
        if (nro.charAt(nro.length - 1) == 'H') {
          return null;
        } else { return {DNI: false} }
        case 19:
          if (nro.charAt(nro.length - 1) == 'L') {
            return null;
          } else { return {DNI: false} }
          case 20:
        if (nro.charAt(nro.length - 1) == 'C') {
          return null;
        } else { return {DNI: false} }
          case 21:
        if (nro.charAt(nro.length - 1) == 'K') {
          return null;
        } else { return {DNI: false} }
      case 22:
        if (nro.charAt(nro.length - 1) == 'E') {
          return null;
        } else { return {DNI: false} }
        default: {
          if (nro.charAt(0) == 'E') {}
          return {DNI: false} }
    }
*/
  }
}
