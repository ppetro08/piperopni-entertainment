export interface MovieApi {
  certification: string;
  cleanTitle: string;
  folderName: string;
  genres: string[];
  hasFile: boolean;
  id: number;
  images: ImageApi[];
  imdbId: string;
  inCinemas: string;
  isAvailable: true;
  minimumAvailability: MovieStatusApi;
  monitored: true;
  overview: string;
  path: string;
  physicalRelease: string;
  qualityProfileId: number;
  ratings: RatingsApi;
  remotePoster: string;
  rootFolderPath: string;
  runtime: number;
  sortTitle: string;
  status: MovieStatusApi;
  studio: string;
  title: string;
  titleSlug: string;
  tmdbId: number;
  year: number;
  youtubeTrailerId: string;
}

export interface ImageApi {
  coverType: string;
  remoteUrl: string;
  url: string;
}

export interface RatingsApi {
  value: number;
  votes: number;
}

export interface CollectionApi {
  name: string;
  tmdbid: number;
  images: ImageApi[];
}

export type MovieStatusApi =
  | 'deleted'
  | 'tba'
  | 'announced'
  | 'incinemas'
  | 'released'
  | 'predb';
