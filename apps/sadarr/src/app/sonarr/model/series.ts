export interface Rating {
  value: number;
  votes: number;
}

export interface Image {
  coverType: string;
  url: string;
}

export interface Season {
  seasonNumber: number;
  monitored: boolean;
}

export interface Series {
  images: Image[];
  monitored: boolean;
  network?: string;
  overview: string;
  profileId: number;
  ratings: Rating;
  remotePoster?: string;
  seasonCount: number;
  seasons: Season[];
  status: string;
  title: string;
  titleSlug: string;
  tvdbId: number;
  year: number;

  qualityProfileId: number; // TODO:P - Is this needed?
  seasonFolder: boolean; // TODO:P - What is this?

  airTime?: string; // TODO:P - Do I need this?
  sortTitle?: string; // TODO:P - Do I need this?
  useSceneNumbering?: boolean; // TODO:P - Do I need this?
  runtime?: number; // TODO:P - Do I need this?
  tvRageId?: number; // TODO:P - Do I need this?
  tvMazeId?: number; // TODO:P - Do I need this?
  firstAired?: string; // TODO:P - Do I need this?
  seriesType?: string; // TODO:P - Do I need this?
  cleanTitle?: string; // TODO:P - Do I need this?
  genres?: string[]; // TODO:P - Do I need this?
  tags?: string[]; // TODO:P - Do I need this?
  added?: string; // TODO:P - Do I need this?
  imdbId?: string; // TODO:P - Do I need this?
  certification?: string; // TODO:P - Do I need this?
}

export interface AddOptions {
  ignoreEpisodesWithFiles: boolean;
  ignoreEpisodesWithoutFiles: boolean;
  searchForMissingEpisodes: boolean;
}

export interface AddEvent {
  all: boolean;
  profileId: number;
  seasons: Season[];
  series: Series;
}

export interface AddEvent2 {
  addOptions?: AddOptions;
  images: Image[];
  monitored?: boolean;
  profileId: number;
  seasonFolder?: boolean;
  seasons: Season[];
  title: string;
  titleSlug: string;
  tvdbId: number;
  tvRageId?: number;
  series: Series;
}

export interface Search {
  name: string;
  seasonNumber: number;
  seriesId: number;
}
