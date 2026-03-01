import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { JeuxComponent } from './jeux/jeux';

const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'jeux', component: JeuxComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
