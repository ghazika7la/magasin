import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css'
})
export class AppComponent {
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  constructor() {
    // Capture the rendered DOM after Angular has finished the first browser render.
    afterNextRender(() => {
      if (!isDevMode()) {
        return;
      }

      const renderedHtml = this.hostElement.nativeElement.innerHTML.trim();

      console.log('[App] <app-root> rendered HTML:', renderedHtml);
    });
  }
}
