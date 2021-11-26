// TODO:P - Update sonarr model to be more similar to the radarr interface
export interface Movie {
  hasFile: boolean;
  id: number;
  length: number;
  monitored: boolean;
  overview: string;
  profileId: number;
  rating?: number;
  remotePoster: string;
  status: string;
  studio: string;
  title: string;
  tmdbId: number;
  year: number;
}

export interface AddEvent {
  profileId: number;
  tmdbId: number;
}
