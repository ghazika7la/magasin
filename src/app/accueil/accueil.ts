import { ChangeDetectionStrategy, Component } from '@angular/core';

interface StoreGame {
  route: string;
  name: string;
  price: string;
  image: string;
  shortDescription: string;
}

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accueil {
  readonly games: StoreGame[] = [
    {
      route: '/gta-detail',
      name: 'GTA V',
      price: '39,99 EUR',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      shortDescription: 'Un monde ouvert immense, de l action et une aventure urbaine legendaire.'
    },
    {
      route: '/fifa',
      name: 'FIFA 24',
      price: '54,99 EUR',
      image:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
      shortDescription: 'Toute l intensite du football moderne avec des matchs rapides et spectaculaires.'
    }
  ];
}
