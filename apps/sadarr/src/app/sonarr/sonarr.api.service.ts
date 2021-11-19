import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Profile } from './model/profile';
import { AddEvent, Series } from './model/series';
import {
  AddSeriesApi,
  AddSeriesResponseApi,
  RootFolderApi,
  SearchApi,
  SeasonApi,
  SeriesApi,
} from './model/series-api';

// TODO:P - Add ngrx
// It's gonna store all information about existing shows, this means I can change the logic on if a series is added or not
// It will also store the search results so I don't need to pass the entire series back to the service and I can merge the addseries with what it is in the store when doing an update, this doesn't really apply to a post afaik

@Injectable()
export class SonarrApiService implements OnDestroy {
  profiles$: Observable<Profile[]>;

  private apiUrl = 'http://piperopni.ddns.net:38082/api';

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'X-API-Key': '2ae85b65c2104fd1a85e4781d274d899',
    'X-Requested-With': 'XMLHttpRequest'
  });

  private destroyed$ = new Subject<void>();

  private rootFolder: string | null = null;

  private _profiles$ = new BehaviorSubject<Profile[]>([]);

  constructor(private http: HttpClient) {
    // TODO:P - profiles should be retrieved from the store
    this.profiles$ = this._profiles$.asObservable();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

// TODO:p Move some to effects 
  // addSeries(addEvent: AddEvent): void {
  //   const addEventApi: AddSeriesApi =
  //     this.convertAddEventToAddEventApi(addEvent);
  //   this.http
  //     .post<AddSeriesResponseApi>(`${this.apiUrl}/series`, addEventApi, {
  //       headers: this.headers,
  //     })
  //     .pipe(take(1), takeUntil(this.destroyed$))
  //     .subscribe((addSeriesResponseApi: AddSeriesResponseApi) => {
  //       // TODO:P - dunno what to do here? update the series inline?
  //     });
  // }

  loadAllSeries(): Observable<SeriesApi[]>{
   return this.http
     .get<SeriesApi[]>(`${this.apiUrl}/series`, {
       headers: this.headers,
     });
     // .pipe(take(1), takeUntil(this.destroyed$))
     // .subscribe((profiles: Profile[]) => {
     //   this._profiles$.next(profiles);
     // });
 }

   loadProfiles(): Observable<Profile[]>{
    return this.http
      .get<Profile[]>(`${this.apiUrl}/profile`, {
        headers: this.headers,
      });
  }

   loadRootFolder(): Observable<RootFolderApi[]> {
    return this.http
      .get<RootFolderApi[]>(`${this.apiUrl}/rootFolder`, {
        headers: this.headers,
      });
  }

  search(searchText: string): Observable<SeriesApi[]> {
    return this.http
      .get<SeriesApi[]>(`${this.apiUrl}/series/lookup?term=${searchText}`, {
        headers: this.headers,
      });
  }
}
