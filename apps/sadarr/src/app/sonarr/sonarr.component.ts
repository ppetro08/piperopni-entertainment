import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { Profile } from './model/profile';
import { Series, AddEvent } from './model/series';
import { SonarrApiService } from './sonarr.api.service';
import { search, sonarrInit } from './state/sonarr.actions';
import { SonarrPartialState } from './state/sonarr.reducer';
import {
  getSonarrLoading,
  getSonarrProfiles,
  getSonarrSearchLoading,
  getSonarrSearchResults,
  showNoResultsFound,
} from './state/sonarr.selectors';

// TODO:P - Don't search when searchbox is empty and don't show "no results found"

@Component({
  selector: 'pip-sonarr',
  templateUrl: './sonarr.component.html',
  styleUrls: ['./sonarr.component.scss'],
  providers: [SonarrApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonarrComponent implements OnDestroy {
  data$: Observable<Series[]>;

  profiles$: Observable<Profile[]>;

  searchLoading$: Observable<boolean | null>;

  showNoResultsFound$: Observable<boolean>;

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  // TODO:P - Maybe 2 search boxes, one for existing series and one for searching for new series
  // TODO:P - Two pages, one list with detail pages for existing and the other is search
  // TODO:P - Add way to change monitor status

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sonarrStore: Store<SonarrPartialState>
  ) {
    this.sonarrStore.dispatch(sonarrInit());
    this.data$ = this.sonarrStore
      .select(getSonarrSearchResults)
      .pipe(tap(() => this.changeDetectorRef.markForCheck()));
        this.searchLoading$ = this.sonarrStore
          .select(getSonarrSearchLoading);
    this.profiles$ = this.sonarrStore.select(getSonarrProfiles);
    this.showNoResultsFound$ = this.sonarrStore.select(showNoResultsFound);

    const searchControl: FormControl = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      search: searchControl,
    });
    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        this.sonarrStore.dispatch(search({ searchText }));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    // TODO:P - Update to dispatch action
    // this.sonarrApiService.addSeries(item);
  }

  // private search(searchText: string): void {
  //   // TODO:P - Update to dispatch action
  //   this.sonarrApiService
  //     .search(searchText)
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((value: Series[]) => {
  //       this.data$ = value;
  //       this.changeDetectorRef.markForCheck();
  //       console.log(this.data$);
  //     });
  // }
}
