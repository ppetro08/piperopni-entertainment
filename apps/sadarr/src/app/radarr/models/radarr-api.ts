export interface MovieApi {
  certification: string;
  cleanTitle: string;
  folderName: string;
  genres: string[]; // TODO:P - find all the types
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
  qualityProfileId: 0;
  ratings: RatingsApi;
  remotePoster: string;
  rootFolderPath: string;
  runtime: 0;
  sortTitle: string;
  status: MovieStatusApi;
  studio: string;
  title: string;
  titleSlug: string;
  tmdbId: 0;
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
