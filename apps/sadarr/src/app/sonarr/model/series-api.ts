export type SeriesStatus = 'deleted' | 'continuing' | 'ended' | 'upcoming';

export interface RootFolderApi {
  accessible: boolean;
  freeSpace: number; // in bytes
  path: string;
}

export interface RatingApi {
  value: number;
  votes: number;
}

export interface ImageApi {
  coverType: string;
  url: string;
}

export interface SeasonApi {
  monitored: boolean;
  seasonNumber: number;
}

export interface AlternateTitleApi {
  title: string;
  seasonNumber: number;
}

export interface SeriesApi {
  added: Date;
  airTime: string;
  alternateTitles: AlternateTitleApi[];
  certification: string; 
  cleanTitle: string; 
  episodeCount: number;
  episodeFileCount: number;
  firstAired: Date; 
  genres: string[]; 
  id:number;
  images: ImageApi[];
  imdbId: string; 
  languageProfileId: number;
  lastInfoSync: Date;
  monitored: boolean;
  network: string;
  overview: string;
  path:string;
  previousAiring: Date;
  profileId: number;
  qualityProfileId: number;
  ratings: RatingApi;
  remotePoster: string;
  runtime: number; 
  seasonCount: number;
  seasonFolder: boolean;
  seasons: SeasonApi[];
  seriesType: string; 
  sizeOnDisk: number;
  sortTitle: string; 
  status: SeriesStatus;
  tags: string[]; 
  title: string;
  titleSlug: string;
  totalEpisodeCount: number;
  tvdbId: number;
  tvMazeId: number; 
  tvRageId: number; 
  useSceneNumbering: boolean; 
  year: number;
}

export interface AddOptionsApi {
  ignoreEpisodesWithFiles: boolean;
  ignoreEpisodesWithoutFiles: boolean;
  searchForMissingEpisodes: boolean;
}

export interface AddSeriesApi {
  addOptions?: AddOptionsApi;
  images: ImageApi[];
  profileId: number;
  rootFolderPath: string;
  seasons: SeasonApi[];
  title: string;
  titleSlug: string;
  tvdbId: number;
}

export interface AddSeriesResponseApi {
  id: number;
  monitored: boolean;
  path: string;
  profileId: number;
  seasons: SeasonApi[];
  title: string;
  titleSlug: string;
  tvdbid: number;
}

export interface UpdateSeriesApi {}

export interface SearchApi {
  name: string;
  seasonNumber: number;
  seriesId: number;
}
