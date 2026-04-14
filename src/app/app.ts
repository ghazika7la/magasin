import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AfterViewInit, ApplicationRef, Component, DestroyRef, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private readonly appRef = inject(ApplicationRef);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly title = signal('magasin-jeux');

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.appRef.isStable
      .pipe(
        filter((isStable) => isStable),
        take(1)
      )
      .subscribe(() => {
        this.captureRenderedHtml('initial render');

        this.router.events
          .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            this.captureRenderedHtml('navigation end');
          });
      });
  }

  private captureRenderedHtml(reason: string): void {
    requestAnimationFrame(() => {
      const appRootHtml = this.hostElement.nativeElement.outerHTML;
      const fullDocumentHtml = document.documentElement.outerHTML;

      console.group(`Rendered HTML snapshot (${reason})`);
      console.log('<app-root> HTML:', appRootHtml);
      console.log('Full document HTML:', fullDocumentHtml);
      console.groupEnd();
    });
  }
}
