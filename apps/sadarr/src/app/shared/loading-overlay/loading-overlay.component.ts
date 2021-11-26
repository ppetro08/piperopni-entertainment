import { Component, Input } from '@angular/core';
// TODO:P - Move this to shared library instead of just folder in app?
@Component({
  selector: 'pip-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  host: { class: 'loading-overlay' },
})
export class LoadingOverlayComponent {
  @Input() diameter: number = 35;

  @Input() show: boolean | null = false;

  @Input() strokeWidth: number = 4;
}
