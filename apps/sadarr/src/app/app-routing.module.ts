import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sonarr',
    loadChildren: () =>
      import('./sonarr/sonarr.module').then((m) => m.SonarrModule),
  },
  {
    path: 'radarr',
    loadChildren: () =>
      import('./radarr/radarr.module').then((m) => m.RadarrModule),
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
