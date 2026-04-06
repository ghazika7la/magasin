import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-consent-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consent-banner.component.html',
  styleUrls: ['./consent-banner.component.scss']
})
export class ConsentBannerComponent implements OnInit {
  showBanner = false;

  constructor(
    private consentService: ConsentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const consent = this.consentService.getConsent();
    this.showBanner = consent === null;
  }

  acceptConsent(): void {
    this.consentService.setConsent('accepted');
    this.showBanner = false;
  }

  rejectConsent(): void {
    this.consentService.setConsent('rejected');
    this.showBanner = false;
  }

  openSettings(): void {
    this.router.navigate(['/privacy']);
  }
}
