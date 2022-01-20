import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { AddMovieResponseApi, MovieLookupApi } from './models/radarr-api';

@Injectable()
export class RadarrApiService implements OnDestroy {
  // TODO:P - Create proxy def for this and sonarr as well
  private apiUrl = 'http://piperopni.ddns.net:38084/api/v3';

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'X-API-Key': '4020ff99a9774d62b03e519964cf8497',
    'X-Requested-With': 'XMLHttpRequest',
  });

  private destroyed$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addMovie(movie: MovieLookupApi): Observable<AddMovieResponseApi> {
    // TODO - Do I need to jsonify movie?
    return this.http.post<AddMovieResponseApi>(`${this.apiUrl}/movie`, movie, {
      headers: this.headers,
    });
  }

  getMovie(id: number): Observable<MovieLookupApi> {
    return this.http.get<MovieLookupApi>(`${this.apiUrl}/movie/${id}`, {
      headers: this.headers,
    });
  }

  loadAllMovies(): Observable<MovieLookupApi[]> {
    return this.http.get<MovieLookupApi[]>(`${this.apiUrl}/movie`, {
      headers: this.headers,
    });
  }

  loadProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/qualityprofile`, {
      headers: this.headers,
    });
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.http.get<RootFolderApi[]>(`${this.apiUrl}/rootFolder`, {
      headers: this.headers,
    });
  }

  search(searchText: string): Observable<MovieLookupApi[]> {
    return this.http
      .get<MovieLookupApi[]>(`${this.apiUrl}/movie/lookup?term=${searchText}`, {
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
