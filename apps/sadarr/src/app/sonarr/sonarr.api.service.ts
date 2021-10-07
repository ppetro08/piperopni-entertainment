import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Profile } from './model/profile';
import { AddEvent, Search, Series } from './model/series';

@Injectable()
export class SonarrApiService implements OnDestroy {
  private apiUrl = 'http://piperopni.ddns.net:38082/api/';

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'X-API-Key': '2ae85b65c2104fd1a85e4781d274d899',
  });

  private destroyed$ = new Subject<void>();

  private profiles$ = new BehaviorSubject<Profile[]>([]);

  constructor(private http: HttpClient) {
    this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  add(series: AddEvent): void {
    console.log('add');
  }

  // TODO:P - Check if seasonnumber = 0
  lookUp(searchText: string): Observable<Series[]> {
    return this.http.get<Series[]>(
      `${this.apiUrl}series/lookup?term=${searchText}`,
      {
        headers: this.headers,
      }
    );
  }

  getProfiles(): Observable<Profile[]> {
    return this.profiles$;
  }

  search(search: Search): void {
    console.log('search');
  }

  private loadProfiles(): void {
    this.http
      .get<Profile[]>(`${this.apiUrl}/profile`, {
        headers: {
          Accept: 'application/json',
          'X-API-Key': '2ae85b65c2104fd1a85e4781d274d899',
        },
      })
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((profiles: Profile[]) => {
        this.profiles$.next(profiles);
      });
  }
}
