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
  minimumAvailability: 'announced' | ''; // TODO:P - find all the types
  monitored: true;
  overview: string;
  path: string;
  physicalRelease: string;
  qualityProfileId: 0;
  ratings: RatingsApi;
  rootFolderPath: string;
  runtime: 0;
  sortTitle: string;
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
  status: 'deleted'; // TODO:P - find all the types
}
