import { SeriesApi } from "./series-api";

export interface Quality {
    id: number;
    name: string;
  }
  
  export interface EpisodeQuality {
    quality: Quality;
  }
  
  export interface Episode {
    airDate: Date;
    episodeNumber: number;
    quality: EpisodeQuality;
    seasonNumber: number;
    title: string;
  }
  
  export interface Queue {
    series: SeriesApi;
    episode: Episode;
    timeLeft: string;
    estimatedCompletionTime: Date;
  }
  