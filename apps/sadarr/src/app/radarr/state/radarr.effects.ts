import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { MovieApi } from '../models/radarr-api';
import { RadarrApiService } from '../radarr.api.service';
import * as RadarrActions from './radarr.actions';
import { RadarrPartialState } from './radarr.reducer';
import { getRadarrSearchResults } from './radarr.selectors';

@Injectable()
export class RadarrEffects {
  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.addMovie),
      withLatestFrom(this.radarrStore.select(getRadarrSearchResults)),
      fetch({
        run: (action, searchResults) => {
          if (!searchResults) {
            throw Error(
              'TODO Figure out how to property go into the on error block'
            );
          }
          const movieToAdd = searchResults.find(
            (sr) =>
              sr.id === action.addMovie.id ||
              sr.tmdbId === action.addMovie.tmdbId
          );

          if (!movieToAdd) {
            throw Error(
              'TODO Figure out how to property go into the on error block'
            );
          }

          // TODO - need to set path and rootfolderpath, look at sonarr I think it already does it

          return this.radarrApiService
            .addMovie({
              ...movieToAdd,
              qualityProfileId: action.addMovie.profileId,
            })
            .pipe(
              map((id: number) => {
                return RadarrActions.addMovieSuccess({ id });
              })
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.addMovieFailure({ error });
        },
      })
    )
  );

  addMovieSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.addMovieSuccess),
      fetch({
        run: (action) => {
          return this.radarrApiService.getMovie(action.id).pipe(
            map((addedMovie: MovieApi) => {
              return RadarrActions.getAddedMovieSuccess({ addedMovie });
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.getAddedMovieFailure({ error });
        },
      })
    )
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.radarrInit),
      fetch({
        run: (action) => {
          return forkJoin([
            this.radarrApiService.loadAllMovies(),
            this.radarrApiService.loadProfiles(),
            this.radarrApiService.loadRootFolder(),
          ]).pipe(
            map(([movies, profiles, rootFolders]) => {
              return RadarrActions.radarrInitSuccess({
                entities: movies,
                profiles,
                rootFolders,
              });
            }),
            take(1)
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.radarrInitFailure({ error });
        },
      })
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.search),
      fetch({
        run: (action) => {
          return this.radarrApiService.search(action.searchText).pipe(
            map((movies) => {
              // TOOD:P - Sort by most recent or rating or something, add in full fledge sorting?
              return RadarrActions.searchSuccess({ movies: movies });
            }),

            take(1)
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.searchFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private radarrApiService: RadarrApiService,
    private radarrStore: Store<RadarrPartialState>
  ) {}
}
