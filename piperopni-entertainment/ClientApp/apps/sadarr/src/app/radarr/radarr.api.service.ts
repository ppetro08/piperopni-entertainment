import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootFolderApi } from '../shared/models/root-folder-api';
import { Profile } from '../shared/profile-select/profile';
import { AddMovieResponseApi, MovieLookupApi } from './models/radarr-api';

@Injectable()
export class RadarrApiService implements OnDestroy {
  private apiUrl = 'api/radarr';

  private destroyed$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addMovie(movie: MovieLookupApi): Observable<AddMovieResponseApi> {
    return this.http.post<AddMovieResponseApi>(`${this.apiUrl}/movie`, movie);
  }

  getMovie(id: number): Observable<MovieLookupApi> {
    return this.http.get<MovieLookupApi>(`${this.apiUrl}/movie/${id}`);
  }

  loadAllMovies(): Observable<MovieLookupApi[]> {
    return this.http.get<MovieLookupApi[]>(`${this.apiUrl}/movie`);
  }

  loadProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/qualityprofile`);
  }

  loadRootFolder(): Observable<RootFolderApi[]> {
    return this.http.get<RootFolderApi[]>(`${this.apiUrl}/rootFolder`);
  }

  search(searchText: string): Observable<MovieLookupApi[]> {
    return this.http
      .get<MovieLookupApi[]>(`${this.apiUrl}/movie/lookup?term=${searchText}`)
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
