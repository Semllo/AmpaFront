import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { IniciComponent } from './pages/inici/inici.component';
import { FormulariComponent } from './pages/formulari/formulari.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesComponent } from './validaciones/validaciones/validaciones.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';


import {MatCheckboxModule} from '@angular/material/checkbox';
import { AlumService } from './servicis/alum.service';
import { PagarComponent } from './pages/pagar/pagar.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import {MatSnackBarModule} from '@angular/material/snack-bar';






@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    IniciComponent,
    FormulariComponent,
    ValidacionesComponent,
    PagarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule, 
    FormsModule,
    ReactiveFormsModule, 
    MatCheckboxModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  AlumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
