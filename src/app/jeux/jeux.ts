import { Component } from '@angular/core';

@Component({
  selector: 'app-jeux',
  standalone: false,
  templateUrl: './jeux.html',
  styleUrls: ['./jeux.css']
})
export class JeuxComponent {

  acheterJeu(nomJeu: string, prix: number) {
    const confirmation = confirm(`Voulez-vous acheter ${nomJeu} pour ${prix}€ ?`);
    
    if (confirmation) {
      alert(`Achat confirmé ! ${nomJeu} a été ajouté à votre bibliothèque.`);
      // Simulation d'achat réussi
    }
  }

}
