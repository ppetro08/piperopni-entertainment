import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Series, AddEvent } from './model/series';
import { AddSeriesApi, SeriesApi } from './model/series-api';
import { SonarrApiService } from './sonarr.api.service';

@Component({
  selector: 'pip-sonarr',
  templateUrl: './sonarr.component.html',
  styleUrls: ['./sonarr.component.scss'],
  providers: [SonarrApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonarrComponent implements OnDestroy {
  data: Series[] =[];

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  // TODO:P - Maybe 2 search boxes, one for existing series and one for searching for new series
  // TODO:P - Two pages, one list with detail pages for existing and the other is search
  // TODO:P - Add way to change monitor status

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sonarrApiService: SonarrApiService
  ) {
    const searchControl: FormControl = this.formBuilder.control(null);

    this.form = this.formBuilder.group({
      search: searchControl,
    });

    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        this.search(searchText);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    this.sonarrApiService.add(item);
  }

  private search(searchText: string): void {
    this.sonarrApiService
      .lookUp(searchText)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value: Series[]) => {
        this.data = value;
        this.changeDetectorRef.markForCheck();
        console.log(this.data);
      });
  }
}
