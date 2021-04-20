import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IniciComponent } from './pages/inici/inici.component';
import { FormulariComponent } from './pages/formulari/formulari.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagarComponent } from './pages/pagar/pagar.component';

const routes: Routes = [
  { path: '', redirectTo: '/inici', pathMatch: 'full' },
  { path: 'formulari', component: FormulariComponent, data: { titulo: ' Matricula ' }},
  { path: 'pagar', component: PagarComponent, data: { titulo: ' Métode de pagament ' }},
  { path: 'inici', component: IniciComponent, data: { titulo: ' Benvingut ' }},
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
