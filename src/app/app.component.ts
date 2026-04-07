import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConsentBannerComponent } from './components/consent-banner/consent-banner.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ConsentBannerComponent],
  template: `
    <button
      type="button"
      style="position: fixed; right: 1rem; bottom: 1rem; z-index: 1000;"
      (click)="trackTestButtonClick()"
    >
      Tester événement GA
    </button>
    <router-outlet></router-outlet>
    <app-consent-banner></app-consent-banner>
  `
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  trackTestButtonClick(): void {
    this.sendEvent('test_button_click', {
      event_category: 'engagement',
      event_label: 'Tester événement GA',
      value: 1,
    });
  }

  private trackPageView(url: string): void {
    const path = url || '/';
    this.sendEvent('page_view', {
      page_title: document.title,
      page_path: path,
      page_location: `${window.location.origin}${path}`,
    });
  }

  private sendEvent(eventName: string, params: Record<string, unknown>): void {
    if (typeof window === 'undefined') {
      return;
    }

    const gtagFn = (window as Window & { gtag?: (...args: any[]) => void }).gtag;

    if (typeof gtagFn !== 'function') {
      return;
    }

    gtagFn('event', eventName, params);
  }
}
