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
    console.log(this.loader);
    this.servicio.GetUsuari().subscribe(data => {
      console.log('No ets membre de lampa');
        if (data.ok == true) {

          this.servicio.PrePayment(this.servicio.cash).subscribe(data => {
      
      
      
            let correus = this.servicio.alumn.correu;
      
              if(this.servicio.alumn.tutor1.correu){
                correus = this.servicio.alumn.tutor1.correu;
            }
            console.log('Pagado por ' + correus);

             stripe.confirmCardPayment(
               data.client_secret, 
               {
                receipt_email: correus,
                payment_method: {
                  card: this.card,
                  billing_details: {
                    email: correus,
                    name: this.servicio.alumn.nom + " " + this.servicio.alumn.primer + " " + this.servicio.alumn.segon,
                    address: {
                      
                      city: this.servicio.alumn.localitat,
                      state: this.servicio.alumn.provincia,
                      postal_code: this.servicio.alumn.postal
                    }
            
            }
          }
        },
      
        ).then((result:any) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
      
            this.ngZone.run(()=>  this.cardError = result.error.message);
            this.loader = false;

            console.log(result.error.message);
          } else {
            // The payment has been processed!
            console.log('Se ha pagado con exito');
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
      
      
              if(data.ok == true)
               this.servicio.charge().subscribe(data => {
                this.loader = false;

                Swal.fire({
                  icon: 'success',
                  title: 'El teu usuari ha sigut registrat, a continuació rebràs un correu electrònic amb el resguard de la matrícula.',
                  showConfirmButton: true,
                  confirmButtonText: `D'acord`
                }).then(() => {
                  window.location.href = 'https://ampaiesjaumeprimer.es';
                });
      
             }) 
      
            }
          }
        });
            
          
        });

        } else {
          this.loader = false;

          console.log('Ja ets membre de lampa');
          Swal.fire({
            icon: 'error',
            title: `Ja ets membre de l'AMPA aquest any`,
            showConfirmButton: true,
            confirmButtonText: `D'acord`
          })

        }

    },error => {
      this.loader = false;

      console.log('Ja ets membre de lampa');
      Swal.fire({
        icon: 'error',
        title: `Ja ets membre de l'AMPA aquest any`,
        showConfirmButton: true,
        confirmButtonText: `D'acord`
      })
    }
    );

   
    /* const { token, error } = await stripe.createToken(this.card);
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
    
  } */


  }


  cambio(dniGerma: string): void {
      this.servicio.cash = 20;
      console.log( `Germans: ${this.Germans} niaGErma: ${this.niaGerma} dniGerma: ${this.dniGerma}` );
      console.log(this.Germans == 1 && this.niaGerma && this.dniGerma && dniGerma.length > 7 && dniGerma.length < 10 &&  this.servicio.alumn.nia != this.niaGerma && this.servicio.alumn.dni != this.dniGerma);
      if (this.Germans == 1 && this.niaGerma && this.dniGerma && dniGerma.length > 7 && this.servicio.alumn.nia != this.niaGerma && this.servicio.alumn.dni != this.dniGerma) {
      this.servicio.alumn.dniGerma = this.dniGerma;
      this.servicio.alumn.niaGerma = this.niaGerma;
      this.servicio.alumn.germans = this.Germans;

      //console.log(this.Germans);
      //console.log(this.niaGerma);
      //console.log(this.dniGerma);
      console.log(this.servicio.alumn.dniGerma);
      this.servicio.GetForm().subscribe(data => {
        console.log(data);
        if(data.ok == true){
          this.servicio.cash = 10
        } else {
          this.servicio.cash = 20
        }
  
        this.servicio.alumn.cognomgerma = data.usuarioDB[0].nom + " " + data.usuarioDB[0].primer + " " + data.usuarioDB[0].segon + " que cursa " + data.usuarioDB[0].curs +" "+ data.usuarioDB[0].cicle +" "+ data.usuarioDB[0].nivell;
    },error => {
      //console.log(error)
      this.servicio.cash = 20
    });
    }

  }



}
