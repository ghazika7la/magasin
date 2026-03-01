import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from './models/game';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';
import { CartService } from './services/cart';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('magasin-jeux');
  @ViewChild('cart') cart!: ShoppingCart;
  @ViewChild('header') header!: Header;
  
  games: Game[] = [
    {
      id: 1,
      name: 'GTA 5',
      price: 69.99,
      image: 'https://picsum.photos/seed/gta5/300/200',
      description: 'Le retour de la franchise la plus attendue avec un monde ouvert immense et des graphiques ultra-réalistes.'
    },
    {
      id: 2,
      name: 'FIFA 24',
      price: 59.99,
      image: 'https://picsum.photos/seed/fifa24/300/200',
      description: 'Le meilleur jeu de football avec des graphiques photoréalistes et une IA de jeu révolutionnaire.'
    },
    {
      id: 3,
      name: 'Call of Duty Modern Warfare III',
      price: 79.99,
      image: 'https://picsum.photos/seed/callduty/300/200',
      description: 'Action intense et multijoueur compétitif avec des graphiques de nouvelle génération et des modes de jeu innovants.'
    }
  ];

  constructor(private cartService: CartService) {}

  ngAfterViewInit(): void {
    // Mettre à jour le compteur du panier périodiquement
    setInterval(() => {
      if (this.header) {
        this.header.totalItems = this.cartService.getTotalItems();
      }
    }, 100);
  }

  openCart(): void {
    if (this.cart) {
      this.cart.openCart();
    }
  }

  scrollToJeux(): void {
    document.getElementById('jeux')?.scrollIntoView({ behavior: 'smooth' });
  }
}
