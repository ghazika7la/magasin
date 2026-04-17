import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { Accueil } from './accueil/accueil';
import { GtaDetailComponent } from './gta-detail/gta-detail';
import { FifaDetailComponent } from './fifa-detail/fifa-detail';

@NgModule({
  declarations: [
    AppComponent,
    Accueil,
    GtaDetailComponent,
    FifaDetailComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent]
})
export class AppModule { }
