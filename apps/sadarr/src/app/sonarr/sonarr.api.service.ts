import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from './model/profile';
import {
  RootFolderApi,
  SeriesApi,
} from './model/series-api';

// TODO:P - Find out what takes so long when getting alot of results 'blacklis'
@Injectable()
export class SonarrApiService implements OnDestroy {
  private apiUrl = 'http://piperopni.ddns.net:38082/api';

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'X-API-Key': '2ae85b65c2104fd1a85e4781d274d899',
    'X-Requested-With': 'XMLHttpRequest',
  });

  private destroyed$ = new Subject<void>();

  constructor(private http: HttpClient) {}

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

  loadAllSeries(): Observable<SeriesApi[]> {
    return this.http.get<SeriesApi[]>(`${this.apiUrl}/series`, {
      headers: this.headers,
    });
  }

  loadProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profile`, {
      headers: this.headers,
    });
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.http.get<RootFolderApi[]>(`${this.apiUrl}/rootFolder`, {
      headers: this.headers,
    });
  }

  search(searchText: string): Observable<SeriesApi[]> {
    return this.http
      .get<SeriesApi[]>(`${this.apiUrl}/series/lookup?term=${searchText}`, {
        headers: this.headers,
      })
      .pipe(
        map((results) => {
          if (results.length > 20) {
            return results.slice(0, 20);
          }
          return results;
        })
      );
  }
}