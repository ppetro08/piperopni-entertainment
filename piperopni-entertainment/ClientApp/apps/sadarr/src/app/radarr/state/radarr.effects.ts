import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { AddMovieResponseApi, MovieLookupApi } from '../models/radarr-api';
import { RadarrApiService } from '../radarr.api.service';
import * as RadarrActions from './radarr.actions';
import { State } from './radarr.reducer';
import {
  getRadarrDefaultFolderFromRootFolders,
  getRadarrState,
} from './radarr.selectors';

@Injectable()
export class RadarrEffects {
  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RadarrActions.addMovie),
      withLatestFrom(this.store.select(getRadarrState)),
      pessimisticUpdate({
        run: (action, state: State) => {
          if (!state.searchResults) {
            throw Error('Cannot add movie without searching first.');
          }
          const movieToAdd = state.searchResults.find(
            (sr) =>
              sr.id === action.addMovie.id ||
              sr.tmdbId === action.addMovie.tmdbId
          );

          if (!movieToAdd) {
            throw Error('Cannot find movie in search results.');
          }

          const rootFolderPath: string | null =
            getRadarrDefaultFolderFromRootFolders(state.rootFolders);

          if (!rootFolderPath) {
            throw Error('Root folder unknown.');
          }

          return this.radarrApiService
            .addMovie({
              ...movieToAdd,
              addOptions: {
                searchForMovie: true,
              },
              monitored: true,
              qualityProfileId: action.addMovie.profileId,
              rootFolderPath,
            })
            .pipe(
              map((addMovieResponseApi: AddMovieResponseApi) => {
                // TODO:P - show toast that says the movie was successfully added, same thing for tv shows
                return RadarrActions.addMovieSuccess({
                  addMovieResponse: addMovieResponseApi,
                });
              })
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RadarrActions.addMovieFailure({ error });
          // TODO error handling in front end, maybe a toast?
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
    private store: Store<State>
  ) {}
}
