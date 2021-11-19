import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResultsModule } from './results/results.module';
import { SonarrRoutingModule } from './sonarr-routing.module';
import { SonarrComponent } from './sonarr.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSonarr from './state/sonarr.reducer';
import { SonarrEffects } from './state/sonarr.effects';
import { SonarrApiService } from './sonarr.api.service';

@NgModule({
  declarations: [SonarrComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ResultsModule,
    SonarrRoutingModule,
    StoreModule.forFeature(fromSonarr.SONARR_FEATURE_KEY, fromSonarr.reducer),
    EffectsModule.forFeature([SonarrEffects]),
  ],
  providers: [SonarrApiService]
})
export class SonarrModule {}
