import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Profile } from '../model/profile';
import { RootFolderApi, SeriesApi } from '../model/series-api';

import * as SonarrActions from './sonarr.actions';
import { SonarrEntity } from './sonarr.models';

export const SONARR_FEATURE_KEY = 'sonarr';

export interface State extends EntityState<SonarrEntity> {
  error?: string | null; // last known error (if any)
  loaded: boolean; // has the Sonarr list been loaded
  profiles: Profile[];
  rootFolders: RootFolderApi[];
  searchResults: SeriesApi[];
}

export interface SonarrPartialState {
  readonly [SONARR_FEATURE_KEY]: State;
}

export const sonarrAdapter: EntityAdapter<SonarrEntity> =
  createEntityAdapter<SonarrEntity>();

export const initialState: State = sonarrAdapter.getInitialState({
  loaded: false,
  profiles: [],
  rootFolders: [],
  searchResults: [],
});

const sonarrReducer = createReducer(
  initialState,

  // init
  on(SonarrActions.sonarrInit, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SonarrActions.sonarrInitSuccess,
    (state, { entities, profiles, rootFolders }) =>
      sonarrAdapter.setAll(entities, {
        ...state,
        loaded: true,
        profiles,
        rootFolders,
      })
  ),
  on(SonarrActions.sonarrInitFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  
  // search
  on(SonarrActions.search, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SonarrActions.searchSuccess, (state, action) => ({
    ...state,
    searchResults: action.series,
  })),
  on(SonarrActions.searchFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sonarrReducer(state, action);
}
