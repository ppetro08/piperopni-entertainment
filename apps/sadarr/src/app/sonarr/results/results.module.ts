import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ProfileSelectModule } from '../profile-select/profile-select.module';
import { ResultsContainerComponent } from './container/results-container.component';
import { ResultsItemComponent } from './item/results-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ProfileSelectModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  exports: [ResultsContainerComponent],
  declarations: [ResultsContainerComponent, ResultsItemComponent],
})
export class ResultsModule {}
