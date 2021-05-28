import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlumService } from 'src/app/servicis/alum.service';
import { ValidacionesComponent } from 'src/app/validaciones/validaciones/validaciones.component';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { Moment } from 'moment';



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

  minDate: Date;
  maxDate: Date;

  generes: Genere[] = [
    {value: 'F', viewValue: 'Femení'},
    {value: 'M', viewValue: 'Masculí'},
    {value: 'A', viewValue: 'Altre'}
  ];



  nivells: string[] = ['ESO', 'BATXILLERAT', 'CFGM', 'CFGS', 'FP BÀSICA', 'CE'];
  cursos: string[] = ['Primer','Segon','Tercer','Quart', 'PMAR', 'PR4'];
  modalitats : string[] = ['Humanitats i Ciències Socials','Ciències i Tecnologia'];
  cicles1: string[]  = ['Electromecànica de Vehicles – Diürn','Instal·lacions de Telecomunicacions – Diürn','Instal·lacions Elèctriques i Automàtiques – Vespertí',`Cures Auxiliars d'Infermeria – Diürn`, `Cures Auxiliars d'Infermeria – Vespertí`, 'Emergències Sanitàries – Vespertí', 'Tècnic en Fabricació i Ennobliment de productes tèxtils – Diürn'];
  cicles2: string[] = ['Automoció – Diürn','Automatització i Robòtica – Diürn','Higiene Bucodental – Diürn','Documentació Sanitaria – Vespertí'];
  FPBasica: string [] = ['Transport i Manteniment de Vehicles'];
  FPBasica2: string [] = ['CIBERSEGURETAT EN ENTORNS DE LES TEC.D’OPERACIÓ – Vespertí'];

  constructor( public servicio: AlumService,
    private route:Router,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer  ) { 

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date();

    this.usuario = new FormGroup({
      auth0: new FormControl(true, [Validators.required, Validators.minLength(0), Validators.requiredTrue]),
      auth1: new FormControl(true, []),
      auth2: new FormControl(false, []),
      correu: new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]),
      curs: new FormControl('', [Validators.required, Validators.minLength(0)]),
      cicle: new FormControl('', []),
      curspro: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cognomgerma: new FormControl('', []),
      data: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(9)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9), ValidacionesComponent.DNI,]),
      dniGerma: new FormControl('', []),
      domicili: new FormControl('', [Validators.required, Validators.minLength(2)]),
      edad:  new FormControl(-1, [Validators.required]),
      genero: new FormControl('', [Validators.required, Validators.minLength(1)]),
      germans: new FormControl('', []),
      images: new FormControl([], [Validators.required, ]),
      localitat: new FormControl('', [Validators.required, Validators.minLength(2)]),
      localitatnaix: new FormControl('', [Validators.required, Validators.minLength(2)]),
      nacionalitat: new FormControl('', [Validators.required, Validators.minLength(2)]),
      naiximent: new FormControl('', [Validators.required, Validators.minLength(2)]),
      nia: new FormControl('', [Validators.required, Validators.minLength(6)]),
      niaGerma: new FormControl('', []),
      nivell: new FormControl('', [Validators.required, Validators.minLength(1)],),
      nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
      pais: new FormControl('', [Validators.required, Validators.minLength(2)]),
      postal: new FormControl('', [Validators.required, Validators.minLength(2)]),
      primer: new FormControl('', [Validators.required, Validators.minLength(2)]),
      procedencia: new FormControl('', [Validators.required, Validators.minLength(2)]),
      provincia: new FormControl('', [Validators.required, Validators.minLength(2)]),
      repetidor: new FormControl('2', []),
      segon: new FormControl('', [Validators.required, Validators.minLength(2)]),
      tel: new FormControl('', [Validators.required, Validators.minLength(2), ValidacionesComponent.tel]),
      tutor1: new FormGroup({   
        correuTutor: new FormControl('', []),   
        dniTutor: new FormControl('', []),
        nomTutor: new FormControl('', []),
        primerTutor: new FormControl('', []),
        telTutor: new FormControl('', []),
      }),   
      tutor2: new FormGroup({   
        correuTutor: new FormControl('', []),   
        dniTutor: new FormControl('', []),
        nomTutor: new FormControl('', []),
        primerTutor: new FormControl('', []),
        telTutor: new FormControl('', []),
      }),
    },[], );
  
  }


  ngOnInit(): void {
   /* this.usuario.get("germans")?.valueChanges.subscribe(selectedValue => {
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
    });*/

    this.usuario.get("data")?.valueChanges.subscribe(selectedValue => {
      if(selectedValue != undefined) {
        selectedValue = selectedValue._d;
        
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

      }
     

    });
    
  }
  ///////////////////////////////////////
  //            Enviar formulari       //
  ///////////////////////////////////////
  validar() {
    
    // this.usuario.value.images = this.imageUrl;

    this.servicio.imageUrl = this.imageUrl;
    console.log( this.usuario.value);

    this.servicio.alumn = this.usuario.value;

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
    console.log(this.servicio.alumn);

    this.route.navigate(['/pagar']); // navigate to other page
    

  }

 
  ///////////////////////////////////////
  //            Calcul edat            //
  ///////////////////////////////////////
 edad(selectedValue:any){


  if(selectedValue != null){
  let hoy = new Date();
  let edad = hoy.getFullYear() - selectedValue.getFullYear();
  let m = hoy.getMonth() - selectedValue.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < selectedValue.getDate())) {
      edad--;
  }
  return edad;
 } else {
   return 0;
 }
 }

   ///////////////////////////////////////
  //            Pintar upload          //
  ///////////////////////////////////////
  onFileSelected(event: any) {

    //console.log(event.target.files);
    if( event.target.files.length > 0) {
    
      for(let i = 0; i < event.target.files.length; i++ ) {
        let reader = new FileReader();

        if (this.files.length >= 3 )
          continue;

        if(this.files.includes(event.target.files[i]))
        continue; 
        
        if(!event.target.files[i].name.includes('.jpg') && !event.target.files[i].name.includes('.png')  && !event.target.files[i].name.includes('.pdf') && !event.target.files[i].name.includes('.JPG') && !event.target.files[i].name.includes('.PNG') ){
          this._snackBar.open('Per motius de seguretat, sols es poden adjuntar documents jpg, png o pdf.', `D'acord.`);
          continue; 
        }

        this.files.push(event.target.files[i]);
        reader.readAsDataURL(event.target.files[i]);
        
        reader.onload = () => {
          
          let safeUrl;

          if(typeof reader.result == 'string')
          safeUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result);
          
          this.imageUrl.push(safeUrl);
        };
      }
    }

    //console.log(this.usuario.value.images);
}


  eliminar (indice: number) {

    this.files.splice(indice, 1);
    this.imageUrl.splice(indice, 1);
   
  }

  reset(){
    this.files.splice(0, this.files.length);
    this.imageUrl.splice(0, this.imageUrl.length);;
    this.usuario.reset();
  }

  infoDNI() {

    Swal.fire({
      icon: 'info',
      html: `
      <h2 style="text-align: left"><strong>Informació.</strong></h2>
      <h3 style="text-align: left"><strong>
      1r Document Identificatiu:<br><br>  </strong>
      <i class="fas fa-arrow-right"></i>&nbsp; En el cas de ser menor de 18 anys algun dels documents següents: DNI,     
        targeta d’identitat d’estranger, expedida per la comissaria de policia o    
        oficina d’estrangers, certificat d’empadronament en un municipi, visat      
        d’estudis o targeta d’estudiant estranger.<br><br>      
        <i class="fas fa-arrow-right"></i>&nbsp; En el cas de ser major de 18 anys algun dels documents següents: DNI, targeta      
        d’identitat d’estranger, expedida per la comissaria de policia o oficina      
        d’estrangers, visat d’estudis o targeta d’estudiant estranger.<br>      

      <br> 
      <strong>2n Document (SIP)</strong>
      <br><br>
  

      <strong>3r Document (tarjeta situación especial):</strong><br><br>   

      <i class="fas fa-arrow-right"></i>&nbsp; Família nombrosa.<br>     
      <i class="fas fa-arrow-right"></i>&nbsp; Família Monoparental.<br>    
      <i class="fas fa-arrow-right"></i>&nbsp; Certificat de grau de minusvalía.<br>    
      <i class="fas fa-arrow-right"></i>&nbsp; Document acreditatiu d’algu cas especial.<br><br>    

      </h3>`,
      confirmButtonText:  `D'acord`
    })

  }

  infoEspaecial() {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })

  }
}
