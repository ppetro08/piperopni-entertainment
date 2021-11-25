import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RadarrApiService } from '../radarr.api.service';
import * as RadarrActions from './radarr.actions';

@Injectable()
export class RadarrEffects {
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
    private radarrApiService: RadarrApiService
  ) {}
}
