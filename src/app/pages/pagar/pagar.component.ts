import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlumService } from 'src/app/servicis/alum.service';
import {Router} from '@angular/router';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit, AfterViewInit {

  loader = false;
  Germans: number;
  niaGerma: string;
  dniGerma: string;
  data = new Date();

  @ViewChild('cardInfo') cardInfo!: ElementRef;
  cardError: string | undefined = '';
  card: any;
 
ngAfterViewInit(): void {
  
  this.card = elements.create('card');
  this.card.mount(this.cardInfo.nativeElement);
  this.card.addEventListener('change', this.onChange.bind(this));
}

  constructor(private ngZone: NgZone,
    public servicio: AlumService, 
     private route:Router,
    ) {

      this.Germans = 0;
      this.niaGerma = "";
      this.dniGerma = "";

  }

  ngOnInit(): void {

  }

onChange({error}:any ) {

if(error){
  this.ngZone.run(()=>  this.cardError = error.message);
} else {
  this.ngZone.run(()=>  this.cardError = undefined);
 // console.log(this.cardError);

}
}

  async onClick(){
    this.loader = true;
    const { token, error } = await stripe.createToken(this.card);
    if(token){
    try {
      const respone = await this.servicio.charge(this.servicio.cash, token.id);
      if( respone.ok == true){
        console.log(respone);
    
        Swal.fire({
        icon: 'success',
        title: 'El teu usuari ha sigut registrat, a continuació rebràs un correu electrònic amb el resguard de la matrícula.',
        showConfirmButton: true,
        confirmButtonText: `D'acord`
      }).then(() => {
        window.location.href = 'https://ampaiesjaumeprimer.es';
      });
     
      }else{
        this.ngZone.run(()=> this.cardError = error.message);
      }
      
    } catch(error) {
      Swal.fire({
        icon: 'error',
        title: `${error.error.msg}`,
        showConfirmButton: true,
        confirmButtonText: `D'acord`
      }).then(() => {
        window.location.href = 'https://ampaiesjaumeprimer.es';
      });
    } 
    
  }

  this.loader = false;

  }


  cambio(dniGerma: string): void {
    

   
      if (this.Germans == 1 && this.niaGerma && this.dniGerma && dniGerma.length > 7 && dniGerma.length < 10 ) {
      this.servicio.alumn.dniGerma = this.dniGerma;
      this.servicio.alumn.niaGerma = this.niaGerma;
      this.servicio.alumn.germans = this.Germans;

      console.log(this.Germans);
      console.log(this.niaGerma);
      console.log(this.dniGerma.length);
      console.log(this.servicio.alumn);
      this.servicio.GetForm().subscribe(data => {
        console.log(data);
        if(data.ok == true){
          this.servicio.cash = 10
        } else {
          this.servicio.cash = 20
        }
  
    },error => {
      //console.log(error)
      this.servicio.cash = 20
    });
    }

  }



}
