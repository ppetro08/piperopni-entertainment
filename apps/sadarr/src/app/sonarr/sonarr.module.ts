import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ResultsModule } from './results/results.module';
import { SonarrRoutingModule } from './sonarr-routing.module';
import { SonarrComponent } from './sonarr.component';

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
  ],
})
export class SonarrModule {}
