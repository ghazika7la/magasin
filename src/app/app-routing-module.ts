import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { GtaDetailComponent } from './gta-detail/gta-detail';
import { FifaDetailComponent } from './fifa-detail/fifa-detail';

const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'gta-detail', component: GtaDetailComponent },
  { path: 'fifa', component: FifaDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
