import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Profile } from '../shared/profile-select/profile';
import { AddEvent, Movie } from './models/radarr';
import { RadarrApiService } from './radarr.api.service';
import { clearSearch, radarrInit, search } from './state/radarr.actions';
import { RadarrPartialState } from './state/radarr.reducer';
import {
  getRadarrProfiles,
  getRadarrSearchLoading,
  getRadarrSearchResults,
  showNoResultsFound,
} from './state/radarr.selectors';

@Component({
  selector: 'pip-radarr',
  templateUrl: 'radarr.component.html',
  styleUrls: ['./radarr.component.scss'],
  providers: [RadarrApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarrComponent implements OnDestroy {
  data$: Observable<Movie[]>;

  profiles$: Observable<Profile[]>;

  searchLoading$: Observable<boolean | null>;

  showNoResultsFound$: Observable<boolean>;

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private radarrStore: Store<RadarrPartialState>
  ) {
    this.radarrStore.dispatch(radarrInit());
    this.data$ = this.radarrStore
      .select(getRadarrSearchResults)
      .pipe(tap(() => this.changeDetectorRef.markForCheck()));
    this.searchLoading$ = this.radarrStore.select(getRadarrSearchLoading);
    this.profiles$ = this.radarrStore.select(getRadarrProfiles);
    this.showNoResultsFound$ = this.radarrStore.select(showNoResultsFound);

    const searchControl: FormControl = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      search: searchControl,
    });
    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        if (searchText !== '' && searchText !== null) {
          this.radarrStore.dispatch(search({ searchText }));
        } else {
          this.radarrStore.dispatch(clearSearch());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    // TODO:P - Update to dispatch action
    // this.radarrApiService.addSeries(item);
  }
}
