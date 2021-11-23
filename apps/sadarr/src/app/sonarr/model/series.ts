import { SeriesStatus } from './series-api';

export interface Season {
  seasonNumber: number;
  monitored: boolean;
}

export interface Image {
  coverType: string;
  url: string;
}

export interface Series {
  added: boolean;
  id?: number;
  images: Image[];
  monitored: boolean;
  network?: string;
  overview: string;
  profile: number;
  rating?: number;
  remotePoster?: string;
  seasonCount: number;
  seasons: Season[];
  status: SeriesStatus;
  title: string;
  titleSlug: string;
  tvdbId: number;
  year: number;
}

export interface AddEvent {
  all: boolean;
  images: Image[];
  profileId: number;
  seasons: number[];
  title: string;
  titleSlug: string;
  tvdbId: number;
}
