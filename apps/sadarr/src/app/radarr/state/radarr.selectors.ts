import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
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

// export const getRadarrSearchResults = createSelector(
//   getRadarrState,
//   (state: State) =>
//     state.searchResults
//       ? state.searchResults.map((sa) => convertRadarrApiToRadarr(sa))
//       : []
// );

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

// function convertSeriesApiToSeries(seriesApi: SeriesApi): Series {
//   return {
//     added: new Date(seriesApi.added).getTime() > 0,
//     id: seriesApi.id,
//     images: seriesApi.images,
//     monitored: seriesApi.monitored,
//     network: seriesApi.network,
//     overview: seriesApi.overview,
//     profile: seriesApi.qualityProfileId,
//     rating: seriesApi.ratings ? seriesApi.ratings.value * 10 : undefined,
//     remotePoster: seriesApi.remotePoster,
//     seasonCount: seriesApi.seasonCount,
//     seasons: seriesApi.seasons.filter((s: SeasonApi) => s.seasonNumber > 0),
//     status: seriesApi.status,
//     title: seriesApi.title,
//     titleSlug: seriesApi.titleSlug,
//     tvdbId: seriesApi.tvdbId,
//     year: seriesApi.year,
//   };
// }

// function convertAddEventToAddEventApi(
//   addEvent: AddEvent,
//   rootFolder: string
// ): AddSeriesApi {
//   if (rootFolder === null) {
//     throw Error('Somehow rootFolder is null');
//   }

//   let seasons: SeasonApi[] = [];
//   if (addEvent.all) {
//     // TODO:P - Go find all seasons from the store and send it
//   } else if (addEvent.seasons.length > 0) {
//     seasons = addEvent.seasons.map((s: number) => {
//       return {
//         monitored: true,
//         seasonNumber: s,
//       };
//     });
//   } else {
//     throw Error('Seasons must be supplied');
//   }

//   // TODO:P - If there is already a series with the same folder name add year to folder as well?
//   return {
//     addOptions: {
//       monitor: 'None',
//       searchForMissingEpisodes: false, // TODO:P - These need to be thought about more
//       searchForCutoffUnmetEpisodes: false, // TODO:P - These need to be thought about more
//     },
//     folder: addEvent.title,
//     images: addEvent.images,
//     profileId: addEvent.profileId,
//     rootFolderPath: rootFolder,
//     seasons,
//     title: addEvent.title,
//     titleSlug: addEvent.titleSlug,
//     tvdbId: addEvent.tvdbId,
//   };
// }
