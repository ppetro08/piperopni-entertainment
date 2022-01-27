import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { LoadingOverlayModule } from '../shared/loading-overlay/loading-overlay.module';
import { RadarrRoutingModule } from './radarr-routing.module';
import { RadarrApiService } from './radarr.api.service';
import { RadarrComponent } from './radarr.component';
import { ResultsModule } from './results/results.module';
import { RadarrEffects } from './state/radarr.effects';
import * as fromRadarr from './state/radarr.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingOverlayModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ResultsModule,
    RadarrRoutingModule,
    StoreModule.forFeature(fromRadarr.RADARR_FEATURE_KEY, fromRadarr.reducer),
    EffectsModule.forFeature([RadarrEffects]),
  ],
  declarations: [RadarrComponent],
  providers: [RadarrApiService, DataPersistence],
})
export class RadarrModule {}
