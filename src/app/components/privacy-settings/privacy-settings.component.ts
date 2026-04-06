import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-privacy-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.scss']
})
export class PrivacySettingsComponent implements OnInit {
  currentConsent: 'accepted' | 'rejected' | null = null;
  dntEnabled = false;

  constructor(private consentService: ConsentService) {}

  ngOnInit(): void {
    this.currentConsent = this.consentService.getConsent();
    this.dntEnabled = this.getDntStatus();
  }

  acceptAll(): void {
    this.consentService.setConsent('accepted');
    this.currentConsent = 'accepted';
  }

  rejectAll(): void {
    this.consentService.setConsent('rejected');
    this.currentConsent = 'rejected';
  }

  resetConsent(): void {
    this.consentService.resetConsent();
    this.currentConsent = null;
  }

  clearCookies(): void {
    this.consentService.optOut();
    this.currentConsent = 'rejected';
  }

  private getDntStatus(): boolean {
    const windowWithDnt = window as Window & { doNotTrack?: string | null };
    const navigatorWithLegacyDnt = navigator as Navigator & { msDoNotTrack?: string | null };

    return (
      navigator.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      windowWithDnt.doNotTrack === '1' ||
      navigatorWithLegacyDnt.msDoNotTrack === '1'
    );
  }
}
