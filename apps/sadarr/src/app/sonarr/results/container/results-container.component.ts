import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEvent, Series } from '../../model/series';

@Component({
  selector: 'pip-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {class: 'results-container'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsContainerComponent  {
  @Input() data: Series[] = [];

  @Output() addClick = new EventEmitter<AddEvent>();

  addClicked(item: AddEvent): void {
    this.addClick.emit(item);
  }

}
