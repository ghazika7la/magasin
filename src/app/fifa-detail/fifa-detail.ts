import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fifa-detail',
  standalone: false,
  templateUrl: './fifa-detail.html',
  styleUrl: './fifa-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FifaDetailComponent {}
