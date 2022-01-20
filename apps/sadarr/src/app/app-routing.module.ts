import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

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
    path: 'authentication',
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
