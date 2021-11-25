import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { Profile } from '../../shared/profile-select/profile';
import { MovieApi } from '../models/radarr-api';
import * as RadarrActions from './radarr.actions';
import { RadarrEntity } from './radarr.models';

export const RADARR_FEATURE_KEY = 'radarr';

export interface State extends EntityState<RadarrEntity> {
  error?: string | null; // last known error (if any)
  loading: boolean;
  profiles: Profile[];
  rootFolders: RootFolderApi[];
  searchLoading: boolean | null;
  searchResults: MovieApi[];
  searchText: string | null;
}

export interface RadarrPartialState {
  readonly [RADARR_FEATURE_KEY]: State;
}

export const radarrAdapter: EntityAdapter<RadarrEntity> =
  createEntityAdapter<RadarrEntity>();

export const initialState: State = radarrAdapter.getInitialState({
  loading: false,
  profiles: [],
  rootFolders: [],
  searchLoading: null,
  searchResults: [],
  searchText: null,
});

const radarrReducer = createReducer(
  initialState,

  // init
  on(RadarrActions.radarrInit, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(
    RadarrActions.radarrInitSuccess,
    (state, { entities, profiles, rootFolders }) =>
      radarrAdapter.setAll(entities, {
        ...state,
        loaded: true,
        profiles,
        rootFolders,
      })
  ),
  on(RadarrActions.radarrInitFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // search
  on(RadarrActions.search, (state, action) => ({
    ...state,
    error: null,
    searchLoading: true,
    searched: true,
    searchText: action.searchText,
  })),
  on(RadarrActions.searchSuccess, (state, action) => ({
    ...state,
    loading: true,
    searchLoading: false,
    searchResults: action.movies,
  })),
  on(RadarrActions.searchFailure, (state, { error }) => ({
    ...state,
    error,
    searchLoading: false,
  })),
  on(RadarrActions.clearSearch, (state) => ({
    ...state,
    searchLoading: false,
    searchText: '',
    searchResults: [],
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return radarrReducer(state, action);
}
