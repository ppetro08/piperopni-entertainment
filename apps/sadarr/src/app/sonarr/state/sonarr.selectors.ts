import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Series, AddEvent } from '../model/series';
import { SeriesApi, SeasonApi, AddSeriesApi } from '../model/series-api';
import { SonarrEntity } from './sonarr.models';
import { SONARR_FEATURE_KEY, State, sonarrAdapter } from './sonarr.reducer';

// Lookup the 'Sonarr' feature state managed by NgRx
export const getSonarrState = createFeatureSelector<State>(SONARR_FEATURE_KEY);

const { selectAll, selectEntities } = sonarrAdapter.getSelectors();

export const getSonarrLoaded = createSelector(
  getSonarrState,
  (state: State) => state.loaded
);

export const getSonarrError = createSelector(
  getSonarrState,
  (state: State) => state.error
);

export const getSonarrAllSeries = createSelector(getSonarrState, (state: State) =>
  selectAll(state)
);

export const getSonarrSeriesDictionary = createSelector(
  getSonarrState,
  (state: State) => selectEntities(state)
);

export const getSonarrSeries = (seriesId: number) =>
  createSelector(
    getSonarrSeriesDictionary,
    (seriesDictionary: Dictionary<SonarrEntity>) => seriesDictionary[seriesId]
  );

export const getSonarrRootFolders = createSelector(
  getSonarrState,
  (state: State) => state.rootFolders
);

export const getSonarrDefaultRootFolderPath = createSelector(
  getSonarrRootFolders,
  (rootFolders) => (rootFolders ? rootFolders[0].path : null)
);

export const getSonarrProfiles = createSelector(
  getSonarrState,
  (state: State) => state.profiles
);

export const getSonarrSearchResults = createSelector(getSonarrState, (state: State) =>
  state.searchResults
    ? state.searchResults.map((sa) => convertSeriesApiToSeries(sa))
    : []
);

function convertSeriesApiToSeries(seriesApi: SeriesApi): Series {
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
    seasons: seriesApi.seasons.filter((s: SeasonApi) => s.seasonNumber > 0),
    status: seriesApi.status,
    title: seriesApi.title,
    titleSlug: seriesApi.titleSlug,
    tvdbId: seriesApi.tvdbId,
    year: seriesApi.year,
  };
}

function convertAddEventToAddEventApi(
  addEvent: AddEvent,
  rootFolder: string
): AddSeriesApi {
  if (rootFolder === null) {
    throw Error('Somehow rootFolder is null');
  }

  let seasons: SeasonApi[] = [];
  if (addEvent.all) {
    // TODO:P - Go find all seasons from the store and send it
  } else if (addEvent.seasons.length > 0) {
    seasons = addEvent.seasons.map((s: number) => {
      return {
        monitored: true,
        seasonNumber: s,
      };
    });
  } else {
    throw Error('Seasons must be supplied');
  }

  // TODO:P - If there is already a series with the same folder name add year to folder as well?
  return {
    addOptions: {
      monitor: 'None',
      searchForMissingEpisodes: false, // TODO:P - These need to be thought about more
      searchForCutoffUnmetEpisodes: false, // TODO:P - These need to be thought about more
    },
    folder: addEvent.title,
    images: addEvent.images,
    profileId: addEvent.profileId,
    rootFolderPath: rootFolder,
    seasons,
    title: addEvent.title,
    titleSlug: addEvent.titleSlug,
    tvdbId: addEvent.tvdbId,
  };
}
