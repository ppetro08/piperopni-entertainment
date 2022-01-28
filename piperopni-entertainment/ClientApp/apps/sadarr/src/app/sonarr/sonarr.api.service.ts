import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { SeriesApi } from './model/series-api';

// TODO:P - Find out what takes so long when getting alot of results 'blacklis'
@Injectable()
export class SonarrApiService implements OnDestroy {
  private apiUrl = 'api/sonarr';

  private destroyed$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  loadAllSeries(): Observable<SeriesApi[]> {
    return this.http.get<SeriesApi[]>(`${this.apiUrl}/series`);
  }

  loadProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/qualityprofile`);
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.http.get<RootFolderApi[]>(`${this.apiUrl}/rootFolder`);
  }

  search(searchText: string): Observable<SeriesApi[]> {
    return this.http
      .get<SeriesApi[]>(`${this.apiUrl}/series/lookup?term=${searchText}`)
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
