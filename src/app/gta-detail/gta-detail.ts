import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gta-detail',
  standalone: false,
  templateUrl: './gta-detail.html',
  styleUrl: './gta-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GtaDetailComponent {}
