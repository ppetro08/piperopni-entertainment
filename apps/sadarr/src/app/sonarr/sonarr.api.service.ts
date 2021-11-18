import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Profile } from './model/profile';
import { AddEvent, Series } from './model/series';
import {
  AddSeriesApi,
  RootFolderApi,
  SearchApi,
  SeriesApi,
} from './model/series-api';

// TODO:P - Add ngrx
// It's gonna store all information about existing shows, this means I can change the logic on if a series is added or not
// It will also store the search results so I don't need to pass the entire series back to the service and I can merge the addseries with what it is in the store when doing an update, this doesn't really apply to a post afaik
 
@Injectable()
export class SonarrApiService implements OnDestroy {
  profiles$: Observable<Profile[]>;

  private apiUrl = 'http://piperopni.ddns.net:38082/api/';

  private headers = new HttpHeaders({
    Accept: 'application/json',
    'X-API-Key': '2ae85b65c2104fd1a85e4781d274d899',
  });

  private destroyed$ = new Subject<void>();

  private rootFolder: string | null = null;

  private _profiles$ = new BehaviorSubject<Profile[]>([]);

  constructor(private http: HttpClient) {
    this.profiles$ = this._profiles$.asObservable();
    this.loadProfiles();
    this.loadRootFolder();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  add(addEvent: AddEvent): void {
    const addEventApi: AddSeriesApi =
      this.convertAddEventToAddEventApi(addEvent);
    this.http
      .post<RootFolderApi>(`${this.apiUrl}/series`, addEventApi, {
        headers: this.headers,
      })
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((rootFolder: RootFolderApi) => {
        this.rootFolder = rootFolder.path;
      });
  }

  // TODO:P - Check if seasonnumber = 0 ? why tho?
  lookUp(searchText: string): Observable<Series[]> {
    return this.http
      .get<SeriesApi[]>(`${this.apiUrl}series/lookup?term=${searchText}`, {
        headers: this.headers,
      })
      .pipe(
        map((seriesApi: SeriesApi[]) => {
          return seriesApi.map((sa: SeriesApi) => {
            return this.convertSeriesApiToSeries(sa);
          });
        })
      );
  }

  private convertSeriesApiToSeries(seriesApi: SeriesApi): Series {
    return {
      added: new Date(seriesApi.added).getTime() > 0,
      images: seriesApi.images,
      monitored: seriesApi.monitored,
      network: seriesApi.network,
      overview: seriesApi.overview,
      profile: seriesApi.qualityProfileId,
      rating: seriesApi.ratings ? seriesApi.ratings.value * 10 : undefined,
      remotePoster: seriesApi.remotePoster,
      seasonCount: seriesApi.seasonCount,
      seasons: seriesApi.seasons,
      status: seriesApi.status,
      title: seriesApi.title,
      titleSlug: seriesApi.titleSlug,
      tvdbId: seriesApi.tvdbId,
      year: seriesApi.year,
    };
  }

  private convertAddEventToAddEventApi(addEvent: AddEvent): AddSeriesApi {
    if (this.rootFolder === null) {
      throw Error('Somehow rootFolder is null');
    }
    return {
      images: addEvent.images,
      profileId: addEvent.profileId,
      rootFolderPath: this.rootFolder,
      seasons: addEvent.seasons
        ? addEvent.seasons.map((s: number) => {
            return {
              monitored: true,
              seasonNumber: s,
            };
          })
        : [],
      title: addEvent.title,
      titleSlug: addEvent.titleSlug,
      tvdbId: addEvent.tvdbId,
    };
  }

  private loadProfiles(): void {
    this.http
      .get<Profile[]>(`${this.apiUrl}/profile`, {
        headers: this.headers,
      })
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((profiles: Profile[]) => {
        this._profiles$.next(profiles);
      });
  }

  private loadRootFolder(): void {
    this.http
      .get<RootFolderApi>(`${this.apiUrl}/rootFolder`, {
        headers: this.headers,
      })
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((rootFolder: RootFolderApi) => {
        this.rootFolder = rootFolder.path;
      });
  }
}
