import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence, fetch, pessimisticUpdate } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddMovieResponseApi, MovieLookupApi } from '../models/radarr-api';
import { RadarrApiService } from '../radarr.api.service';
import * as RadarrActions from './radarr.actions';
import { State } from './radarr.reducer';
import { getRadarrDefaultFolderFromRootFolders } from './radarr.selectors';

@Injectable()
export class RadarrEffects {
  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.addMovie),
      pessimisticUpdate({
        run: (action, state: State) => {
          if (!state.searchResults) {
            throw Error(
              'TODO Figure out how to properly go into the on error block'
            );
          }
          const movieToAdd = state.searchResults.find(
            (sr) =>
              sr.id === action.addMovie.id ||
              sr.tmdbId === action.addMovie.tmdbId
          );

          if (!movieToAdd) {
            throw Error(
              'TODO Figure out how to properly go into the on error block'
            );
          }

          const rootFolderPath: string | null =
            getRadarrDefaultFolderFromRootFolders(state.rootFolders);

          if (!rootFolderPath) {
            throw Error(
              'TODO Figure out how to properly go into the on error block'
            );
          }

          return this.radarrApiService
            .addMovie({
              ...movieToAdd,
              qualityProfileId: action.addMovie.profileId,
              rootFolderPath,
            })
            .pipe(
              map((addMovieResponseApi: AddMovieResponseApi) => {
                return RadarrActions.addMovieSuccess({
                  addMovieResponse: addMovieResponseApi,
                });
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
          // TODO - Don't need to go get the movie again,
          //        can merge the post response to the lookup model in the store
          return this.radarrApiService
            .getMovie(action.addMovieResponse.id)
            .pipe(
              map((addedMovie: MovieLookupApi) => {
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
    private dataPersistence: DataPersistence<State>
  ) {}
}
