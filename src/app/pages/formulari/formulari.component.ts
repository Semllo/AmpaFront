import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlumService } from 'src/app/servicis/alum.service';
import { ValidacionesComponent } from 'src/app/validaciones/validaciones/validaciones.component';
import {Router} from '@angular/router';

interface Genere {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})

export class FormulariComponent implements OnInit {

  fileName = '';
  usuario: FormGroup;
  files: File[] = [];
  imageUrl: any [] = [];
  DNI = ``;
  ui = new Date();

  generes: Genere[] = [
    {value: 'F', viewValue: 'Femení'},
    {value: 'M', viewValue: 'Masculí'},
    {value: 'A', viewValue: 'Altre'}
  ];

  nivells: string[] = ['ESO', 'BATXILLERAT', 'CFGM', 'CFGS', 'FP BÀSICA', 'FP BÀSICA 2a oportunitat'];
  cursos: string[] = ['Primer','Segon','Tercer','Quart', 'PAC', 'PMAR', 'PR'];
  modalitats : string[] = ['Humanitats i ciències socials','Ciències i tecnològic'];
  cicles1: string[]  = ['Electromecànica de vehicles - Matí','Instal·lacions de telecomunicacions - Matí','Instal·lacions elèctriques i automàtiques - Matí',`Curses auxiliars d'infermeria - Nit`, `Curses auxiliars d'infermeria - Vesprada`, 'Emergències Sanitaries - Vesprada', 'Tècnic en Fabricació i Ennobliment de productes tèxtils - Vesprada'];
  cicles2: string[] = [' Automoció - Matí','Automatització i Robòtica - Matí','Higiene Bucodental - Matí'];
  FPBasica: string [] = ['Transport i manteniment de vehicles'];
  FPBasica2: string [] = ['Instal·lacions electròniques i mecànica'];

  constructor( public servicio: AlumService,
    private route:Router  ) { 

    this.usuario = new FormGroup({
      auth0: new FormControl(true, [Validators.required, Validators.minLength(0), Validators.requiredTrue]),
      auth1: new FormControl(false, []),
      auth2: new FormControl(false, []),
      correu: new FormControl('marcsemperlloret@gmail.com', [Validators.required, Validators.minLength(2), Validators.email]),
      curs: new FormControl('PAC', [Validators.required, Validators.minLength(0)]),
      curspro: new FormControl('Primer', [Validators.required, Validators.minLength(2)]),
      data: new FormControl(new Date(), [Validators.required, Validators.minLength(8),ValidacionesComponent.data]),
      dni: new FormControl('20059394J', [Validators.required, Validators.minLength(7), Validators.maxLength(9), ValidacionesComponent.DNI,]),
      dniGerma: new FormControl('000000T', [Validators.required, Validators.minLength(7), Validators.maxLength(9), ValidacionesComponent.DNI,]),
      domicili: new FormControl('Carrer San Josep, 11', [Validators.required, Validators.minLength(2)]),
      edad:  new FormControl(-1, [Validators.required]),
      genero: new FormControl('M', [Validators.required, Validators.minLength(1)]),
      germans: new FormControl('1', [Validators.required]),
      images: new FormControl([], [Validators.required, ]),
      localitat: new FormControl('Beniatjar', [Validators.required, Validators.minLength(2)]),
      localitatnaix: new FormControl('Beniatjar', [Validators.required, Validators.minLength(2)]),
      nacionalitat: new FormControl('Española', [Validators.required, Validators.minLength(2)]),
      naiximent: new FormControl('Beniatjar', [Validators.required, Validators.minLength(2)]),
      nia: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
      niaGerma: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
      nivell: new FormControl('ESO', [Validators.required, Validators.minLength(1)],),
      nom: new FormControl('Marc', [Validators.required, Validators.minLength(2)]),
      pais: new FormControl('España', [Validators.required, Validators.minLength(2)]),
      postal: new FormControl('46844', [Validators.required, Validators.minLength(2)]),
      primer: new FormControl('Semper', [Validators.required, Validators.minLength(2)]),
      procedencia: new FormControl('IES Les foies', [Validators.required, Validators.minLength(2)]),
      provincia: new FormControl('València', [Validators.required, Validators.minLength(2)]),
      repetidor: new FormControl('1', [Validators.required]),
      segon: new FormControl('Lloret', [Validators.required, Validators.minLength(2)]),
      tel: new FormControl('693737393', [Validators.required, Validators.minLength(2), ValidacionesComponent.tel]),
      tutor1: new FormGroup({   
        correuTutor: new FormControl('correu@tutor.com', []),   
        dniTutor: new FormControl('000000T', []),
        nomTutor: new FormControl('Nom tutor', []),
        primerTutor: new FormControl('Apellido tutor', []),
        telTutor: new FormControl('111111111', []),
      }),   
      tutor2: new FormGroup({   
        correuTutor: new FormControl('correu@tutor.com', []),   
        dniTutor: new FormControl('000000T', []),
        nomTutor: new FormControl('Nom tutor', []),
        primerTutor: new FormControl('Apellido tutor', []),
        telTutor: new FormControl('111111111', []),
      }),
    },[], );
  
  }


  ngOnInit(): void {
   
    this.usuario.get("germans")?.valueChanges.subscribe(selectedValue => {
     if(selectedValue == 1) {
      this.usuario.get('dniGerma')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(9), ValidacionesComponent.DNI,]);
      this.usuario.get('niaGerma')?.setValidators( [Validators.required, Validators.minLength(6)]);

      this.usuario.get('dniGerma')?.updateValueAndValidity();
      this.usuario.get('niaGerma')?.updateValueAndValidity();
     } else {

      this.usuario.get('dniGerma')?.clearValidators();
      this.usuario.get('niaGerma')?.clearValidators();

      this.usuario.get('dniGerma')?.updateValueAndValidity();
      this.usuario.get('niaGerma')?.updateValueAndValidity();

     }
    });

    this.usuario.get("data")?.valueChanges.subscribe(selectedValue => {
      this.usuario.get('edad')?.setValue(this.edad(selectedValue));

      if(this.edad(selectedValue)<18){
        this.usuario.get('tutor1')?.get('correuTutor')?.setValidators([Validators.required, Validators.minLength(2), Validators.email]);
        this.usuario.get('tutor1')?.get('dniTutor')?.setValidators([Validators.required, ValidacionesComponent.DNI]);
        this.usuario.get('tutor1')?.get('nomTutor')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.usuario.get('tutor1')?.get('primerTutor')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.usuario.get('tutor1')?.get('telTutor')?.setValidators([Validators.required, Validators.minLength(2), ValidacionesComponent.tel]);

        this.usuario.get('tutor1')?.get('correuTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('dniTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('nomTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('primerTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('telTutor')?.updateValueAndValidity();

      } else {

        this.usuario.get('tutor1')?.get('correuTutor')?.clearValidators();
        this.usuario.get('tutor1')?.get('dniTutor')?.clearValidators();
        this.usuario.get('tutor1')?.get('nomTutor')?.clearValidators();
        this.usuario.get('tutor1')?.get('primerTutor')?.clearValidators();
        this.usuario.get('tutor1')?.get('telTutor')?.clearValidators();

        this.usuario.get('tutor1')?.get('correuTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('dniTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('nomTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('primerTutor')?.updateValueAndValidity();
        this.usuario.get('tutor1')?.get('telTutor')?.updateValueAndValidity();

      }

    });
    
  }
  ///////////////////////////////////////
  //            Enviar formulari       //
  ///////////////////////////////////////
  validar() {
    
    this.servicio.alumn = this.usuario.value;

    console.log( this.servicio.alumn);
    /*this.servicio.GetForm(this.usuario).subscribe(data => {

      if(data.ok == true){
        this.servicio.cash = 10
      } else {
        this.servicio.cash = 20
      }

  },error => {
    //console.log(error)
    this.servicio.cash = 20
  });*/
    //this.servicio.PostForm(this.usuario);
    //console.log(this.usuario.value);

    //this.route.navigate(['/pagar']); // navigate to other page
    

  }

 
  ///////////////////////////////////////
  //            Calcul edat            //
  ///////////////////////////////////////
 edad(selectedValue:Date){
  let hoy = new Date();
  let edad = hoy.getFullYear() - selectedValue.getFullYear();
  let m = hoy.getMonth() - selectedValue.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < selectedValue.getDate())) {
      edad--;
  }
  return edad;
 }

   ///////////////////////////////////////
  //            Pintar upload          //
  ///////////////////////////////////////
  onFileSelected(event: any) {

    if( event.target.files.length > 0) {
    
      for(let i = 0; i < event.target.files.length; i++ ) {
        let reader = new FileReader();

        if (this.files.length >= 3 )
          continue;

        if(this.files.includes(event.target.files[i]))
        continue;    
        this.files.push(event.target.files[i]);
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = () => {
          //console.log(reader.result);
          this.imageUrl.push(reader.result);
        };
      }
    }

    this.usuario.value.images = this.imageUrl;

}


  eliminar (indice: number) {

    this.files.splice(indice, 1);
    this.imageUrl.splice(indice, 1);
   
  }

  reset(){
    console.log('reset')
    this.usuario.reset();
  }
}
