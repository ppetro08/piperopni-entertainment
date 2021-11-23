import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from '../../model/profile';
import { Series, AddEvent } from '../../model/series';
import { ResultItemFormValue } from './result-item';

@Component({
  selector: 'pip-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'results-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsItemComponent implements OnDestroy {
  @Input() item?: Series;
  
  @Input() profiles: Profile[]  = [];

  @Output() addClick = new EventEmitter<AddEvent>();

  formGroup: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor() {
    const allControl = new FormControl(true);
    const seasonsControl = new FormControl({ value: [], disabled: true });
    this.formGroup = new FormGroup({
      all: allControl,
      profile: new FormControl(7),
      seasons: seasonsControl,
    });

    allControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        value ? seasonsControl.disable() : seasonsControl.enable();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onSubmit(item: Series): void {
    this.addClick.emit(this.convertSeriesToAddEvent(item));
  }

  private convertSeriesToAddEvent(series: Series): AddEvent {
    const resultItemFormValue: ResultItemFormValue = this.formGroup.value;
    return {
      all: resultItemFormValue.all,
      images: series.images,
      profileId: resultItemFormValue.profile,
      seasons: resultItemFormValue.seasons,
      title: series.title,
      titleSlug: series.titleSlug,
      tvdbId: series.tvdbId,
    };
  }
}
