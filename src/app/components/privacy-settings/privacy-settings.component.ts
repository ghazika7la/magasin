import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.scss']
})
export class PrivacySettingsComponent implements OnInit {
  currentConsent: 'accepted' | 'rejected' | null = null;
  dntEnabled = false;

  constructor(private consentService: ConsentService) {}

  ngOnInit(): void {
    this.currentConsent = this.consentService.getConsent();
    this.dntEnabled = navigator.doNotTrack === '1' || 
                     navigator.doNotTrack === 'yes' || 
                     window.doNotTrack === '1' ||
                     navigator.msDoNotTrack === '1';
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
}
