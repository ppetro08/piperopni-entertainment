import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

export const authenticationPath = 'authentication';

const routes: Routes = [
  {
    path: 'sonarr',
    loadChildren: () =>
      import('./sonarr/sonarr.module').then((m) => m.SonarrModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'radarr',
    loadChildren: () =>
      import('./radarr/radarr.module').then((m) => m.RadarrModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: authenticationPath,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
