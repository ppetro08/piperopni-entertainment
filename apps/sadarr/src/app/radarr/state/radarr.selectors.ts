import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { capitalizeFirstLetter } from '../../shared/utils/uppercase';
import { Movie } from '../models/radarr';
import { MovieApi, MovieStatusApi } from '../models/radarr-api';
import { RadarrEntity } from './radarr.models';
import { radarrAdapter, RADARR_FEATURE_KEY, State } from './radarr.reducer';

// Lookup the 'Radarr' feature state managed by NgRx
export const getRadarrState = createFeatureSelector<State>(RADARR_FEATURE_KEY);

const { selectAll, selectEntities } = radarrAdapter.getSelectors();

export const getRadarrLoading = createSelector(
  getRadarrState,
  (state: State) => state.loading
);

export const getRadarrError = createSelector(
  getRadarrState,
  (state: State) => state.error
);

export const getRadarrAllMovies = createSelector(
  getRadarrState,
  (state: State) => selectAll(state)
);

export const getRadarrMoviesDictionary = createSelector(
  getRadarrState,
  (state: State) => selectEntities(state)
);

export const getRadarrMovies = (seriesId: number) =>
  createSelector(
    getRadarrMoviesDictionary,
    (seriesDictionary: Dictionary<RadarrEntity>) => seriesDictionary[seriesId]
  );

export const getRadarrRootFolders = createSelector(
  getRadarrState,
  (state: State) => state.rootFolders
);

export const getRadarrDefaultRootFolderPath = createSelector(
  getRadarrRootFolders,
  (rootFolders) => (rootFolders ? rootFolders[0].path : null)
);

export const getRadarrProfiles = createSelector(
  getRadarrState,
  (state: State) => state.profiles
);

export const getRadarrSearchResults = createSelector(
  getRadarrState,
  (state: State) =>
    state.searchResults
      ? state.searchResults.map((sa) => convertRadarrApiToRadarr(sa))
      : []
);

export const showNoResultsFound = createSelector(
  getRadarrState,
  (state: State) =>
    state.searchLoading === false &&
    state.searchResults.length === 0 &&
    state.searchText !== null &&
    state.searchText !== ''
);

export const getRadarrSearchLoading = createSelector(
  getRadarrState,
  (state: State) => state.searchLoading
);

function convertStatusStringToReadable(status: MovieStatusApi): string {
  if (status === 'incinemas') {
    return 'In Cinemas';
  } else if (status === 'predb') {
    return '';
  }

  return capitalizeFirstLetter(status);
}

function convertRadarrApiToRadarr(radarrApi: MovieApi): Movie {
  return {
    id: radarrApi.id,
    monitored: radarrApi.monitored,
    studio: radarrApi.studio,
    overview: radarrApi.overview,
    profileId: radarrApi.qualityProfileId,
    rating: radarrApi.ratings ? radarrApi.ratings.value * 10 : undefined,
    remotePoster: radarrApi.remotePoster
      ? radarrApi.remotePoster
      : radarrApi?.images[0]?.remoteUrl,
    status: convertStatusStringToReadable(radarrApi.status),
    title: radarrApi.title,
    tmdbId: radarrApi.tmdbId,
    hasFile: radarrApi.hasFile,
    length: radarrApi.runtime,
    year: radarrApi.year,
  };
}
