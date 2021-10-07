import { Series } from "./series";

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
    series: Series;
    episode: Episode;
    timeLeft: string;
    estimatedCompletionTime: Date;
  }
  