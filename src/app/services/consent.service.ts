import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private readonly CONSENT_KEY = 'ga_consent';
  private readonly GA_ID = 'G-NLCP329DKB';
  private readonly GA_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${this.GA_ID}`;

  constructor() {
    this.checkConsentOnLoad();
  }

  private checkConsentOnLoad(): void {
    const consent = this.getConsent();
    
    if (consent === 'accepted' && !this.isDntEnabled()) {
      this.loadGoogleAnalytics();
    }
  }

  private isDntEnabled(): boolean {
    const windowWithDnt = window as Window & { doNotTrack?: string | null };
    const navigatorWithLegacyDnt = navigator as Navigator & { msDoNotTrack?: string | null };

    return navigator.doNotTrack === '1' || 
           navigator.doNotTrack === 'yes' || 
           windowWithDnt.doNotTrack === '1' ||
           navigatorWithLegacyDnt.msDoNotTrack === '1';
  }

  getConsent(): 'accepted' | 'rejected' | null {
    const stored = localStorage.getItem(this.CONSENT_KEY);
    return stored as 'accepted' | 'rejected' | null;
  }

  setConsent(consent: 'accepted' | 'rejected'): void {
    localStorage.setItem(this.CONSENT_KEY, consent);
    
    if (consent === 'accepted' && !this.isDntEnabled()) {
      this.loadGoogleAnalytics();
    } else {
      this.unloadGoogleAnalytics();
    }
  }

  loadGoogleAnalytics(): void {
    if (this.isGAScriptLoaded()) {
      return;
    }

    // Create and inject the gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = this.GA_SCRIPT_URL;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      window.gtag('js', new Date());
      window.gtag('config', this.GA_ID);
    };
  }

  unloadGoogleAnalytics(): void {
    // Remove gtag.js script
    const scripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag"]');
    scripts.forEach(script => script.remove());

    // Clear dataLayer
    window.dataLayer = [];
    
    // Remove gtag function
    delete window.gtag;

    // Clear GA cookies
    this.clearGACookies();
  }

  private clearGACookies(): void {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const [name] = cookie.trim().split('=');
      if (name.startsWith('_ga') || name.startsWith('_gid')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  }

  private isGAScriptLoaded(): boolean {
    return !!document.querySelector('script[src*="googletagmanager.com/gtag"]');
  }

  optOut(): void {
    this.setConsent('rejected');
    this.clearGACookies();
  }

  resetConsent(): void {
    localStorage.removeItem(this.CONSENT_KEY);
    this.unloadGoogleAnalytics();
  }
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}
