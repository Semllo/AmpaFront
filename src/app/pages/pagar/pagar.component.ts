import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlumService } from 'src/app/servicis/alum.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit, AfterViewInit {

  loader = false;

  @ViewChild('cardInfo') cardInfo!: ElementRef;
  cardError: string | undefined = '';
  card: any;
 
ngAfterViewInit(): void {
  
  this.card = elements.create('card');
  this.card.mount(this.cardInfo.nativeElement);
  this.card.addEventListener('change', this.onChange.bind(this));
}

  constructor(private ngZone: NgZone,
    public servicio: AlumService,) { }

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
        this.servicio.PostForm(this.servicio.alumn);
        console.log(respone);
    
        Swal.fire({
        icon: 'success',
        title: 'El teu usuari ha sigut registrat, a continuació rebràs un correu electrònic amb el resguard de la matrícula.',
        showConfirmButton: true,
        confirmButtonText: `D'acord`
      })
      }else{
        this.ngZone.run(()=> this.cardError = error.message);
      }
      
    } catch(error) {
      Swal.fire({
        icon: 'error',
        title: `${error.error.msg}`,
        showConfirmButton: true,
        confirmButtonText: `D'acord`
      })
    } 
    
  }

  this.loader = false;

  }

}
