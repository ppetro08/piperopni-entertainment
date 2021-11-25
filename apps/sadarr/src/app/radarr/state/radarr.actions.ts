import { createAction, props } from '@ngrx/store';
import { RootFolderApi } from '../../shared/models/root-folder-api';
import { Profile } from '../../shared/profile-select/profile';
import { MovieApi } from '../models/radarr-api';
import { RadarrEntity } from './radarr.models';

export const radarrInit = createAction('[Radarr Page] Init');
export const radarrInitSuccess = createAction(
  '[Radarr/API] Radarr Init Success',
  props<{
    entities: RadarrEntity[];
    profiles: Profile[];
    rootFolders: RootFolderApi[];
  }>()
);
export const radarrInitFailure = createAction(
  '[Radarr/API] Radarr init Failure',
  props<{ error: any }>()
);

export const search = createAction(
  '[Radarr/API] Search',
  props<{ searchText: string }>()
);
export const searchSuccess = createAction(
  '[Radarr/API] Search Success',
  props<{ movies: MovieApi[] }>()
);
export const searchFailure = createAction(
  '[Radarr/API] Search Failure',
  props<{ error: any }>()
);
export const clearSearch = createAction('[Radarr/API] Clear Search');
